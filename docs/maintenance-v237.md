# Maintenance 217.21

## Repaired

- The exported planet icons contained an opaque navy rectangle. PNG assets are now exported from the original SVG with transparent backgrounds. The favicon retains the same planet.
- The install manifest now uses only transparent any-purpose icons. The old maskable asset is retained with transparent pixels for older references, but is not offered as a maskable icon in new installations.
- Icon URLs in the manifest, Apple touch metadata, installation guide and offline fallback have a new revision. The service-worker shell cache revision changes too. No financial responses or records are cached.
- Release checks now run every five minutes while the page is visible, in addition to startup/return-to-page checks.
- Automatic and manual release reloads distinguish unchanged form defaults from unsaved drafts. Text, textarea, select, checkbox, radio and file changes block reload until saved, reset or closed. Open dialogs, focused inputs and busy operations still block reload.
- An empty select and a disabled first option are treated according to browser default selection rules.

## Verification

- Transparent corner pixels and visible planet center verified for 192, 512, Apple touch and legacy icon assets.
- Chromium and WebKit: periodic version detection, unchanged defaults, all six draft types after leaving the field, safe reset followed by updating.
- Existing feedback draft/reload-loop checks, integration tests, click regression tests, and the mobile/desktop/installation/animation matrix retained.
- The Home-only calendar and grouped experience controls remain unchanged.

Installed launchers may retain older icons. Updating the manifest does not guarantee an immediate icon replacement by every operating system. Do not recommend uninstalling a locally stored finance app without first preserving its data.
