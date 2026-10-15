// Export the existing vector planet with transparent corners; no generated replacement artwork.
const fs=require('node:fs/promises'),path=require('node:path'),{chromium}=require('playwright');
(async()=>{const root=path.resolve(__dirname,'..'),svg=await fs.readFile(path.join(root,'assets/arydebts-logo.svg'),'utf8'),browser=await chromium.launch(process.env.ARY_BROWSER_PATH?{executablePath:process.env.ARY_BROWSER_PATH}:{});
try{const page=await browser.newPage({deviceScaleFactor:1});for(const[size,file,padding]of[[192,'app-icon-192.png',10],[512,'app-icon-512.png',28],[180,'apple-touch-icon.png',12],[512,'app-icon-maskable-512.png',62]]){
await page.setViewportSize({width:size,height:size});await page.setContent('<style>*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;background:transparent}body{display:grid;place-items:center;padding:'+padding+'px}svg{width:100%;height:100%;display:block}</style>'+svg);await page.screenshot({path:path.join(root,'assets',file),omitBackground:true});}
}finally{await browser.close()}})().catch(error=>{console.error(error);process.exitCode=1});
