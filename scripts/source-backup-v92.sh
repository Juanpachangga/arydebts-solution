#!/usr/bin/env bash
set -euo pipefail
backup_dir="${1:?Absolute output directory required}"
[[ "$backup_dir" = /* ]] || exit 2
mkdir -p "$backup_dir"
backup_sha="$(git rev-parse HEAD)"
backup_version="$(git log -1 --format=%s | sed -nE 's/^.*(V[0-9]+):.*/\1/p')"
backup_version="${backup_version:-commit}"
git archive --format=zip --output="$backup_dir/source.zip" HEAD
git bundle create "$backup_dir/history.bundle" HEAD
git bundle verify "$backup_dir/history.bundle"
python3 - "$backup_dir" "$backup_sha" "$backup_version" <<'PY'
import sys, pathlib, zipfile, hashlib, json, subprocess
out=pathlib.Path(sys.argv[1]); sha=sys.argv[2]
with zipfile.ZipFile(out/'source.zip') as archive:
    assert archive.testzip() is None
    files={n:hashlib.sha256(archive.read(n)).hexdigest() for n in archive.namelist() if not n.endswith('/')}
    for name,digest in files.items():
        expected=subprocess.check_output(['git','show',sha+':'+name])
        assert hashlib.sha256(expected).hexdigest()==digest, name
manifest={'commit':sha,'versionLabel':sys.argv[3],'scope':'tracked source and reachable Git history only; no user database','files':files}
(out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
with (out/'SHA256SUMS').open('w') as sums:
    for name in ['source.zip','history.bundle','manifest.json']:
        sums.write(hashlib.sha256((out/name).read_bytes()).hexdigest()+'  '+name+'\n')
print('Verified source archive, manifest and Git history for '+sha)
PY
