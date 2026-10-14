const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'..');
let html=fs.readFileSync(path.join(root,'index.html'),'utf8'),scripts=[];
html=html.replace(/<script src="([^"]+)"><\/script>/g,(_,src)=>{scripts.push(src);return ''});
scripts.push('preview-demo-v216.js?v=217.4');
html=html.replace('<title>Arydebts</title>','<title>Premium · ejemplo — Arydebts</title>').replace('</body>',`<script type="application/json" id="aryPreviewScripts216">${JSON.stringify(scripts)}</script><script src="preview-isolation-v216.js?v=217.4"></script></body>`);
fs.writeFileSync(path.join(root,'premium-preview.html'),html);
