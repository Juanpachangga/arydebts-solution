// Click-regression browser checks. Synthetic local data only; never production.
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const http=require('node:http');
const {chromium,webkit}=require('playwright');

const root=__dirname;
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.jpeg':'image/jpeg','.webp':'image/webp','.webmanifest':'application/manifest+json'};
const server=http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
  const body=await fs.readFile(file);
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(body);
 }catch{res.writeHead(404).end()}
});

async function run(engine,label){
 const browser=await engine.launch();
 const context=await browser.newContext({viewport:{width:390,height:844}});
 const page=await context.newPage();
 page.setDefaultTimeout(12000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.addInitScript(()=>{
   if(sessionStorage.getItem('ary-click-v166-seeded')==='1')return;
   sessionStorage.setItem('ary-click-v166-seeded','1');
   const id='1f5iir3';
   localStorage.setItem('arydebts-profile',JSON.stringify({name:'Click Test',email:'click-test@example.com',localDemo:true}));
   localStorage.setItem('arydebts-v3',JSON.stringify({currency:'USD',locale:'es-US',mode:'immersive',name:'Click Test',income:2500,incomeFrequency:'monthly',goal:'',goals:[],greeting:'',theme:'dark',navOrder:['home','debts','expenses','plan','more'],savings:0,onboarded:true,debts:[],expenses:[],calendarEvents:[],payments:[]}));
   localStorage.setItem('arydebts-guide-owner-v128',id);
   localStorage.setItem('arydebts-guide-user-v128:'+id,'done');
   localStorage.setItem('arydebts-guide-v125','done');
   // Keep the guide quiet during click tests; a dedicated assertion below resets this marker.
   localStorage.setItem('arydebts-guide-repair-v166:'+id,'done');
  });
  const origin=`http://127.0.0.1:${server.address().port}`;
  await page.goto(origin,{waitUntil:'load'});

  // Old completion/repair keys must never replay the removed cross-page tour.
  await page.evaluate(()=>{
   const id=window.aryGuideLifecycle128?.currentUser?.();
   s.guide94={version:195,active:false,completed:true,seen:['home','expenses','debts','plan','more']};save();
   localStorage.setItem('arydebts-guide-v125','done');
   if(id){localStorage.setItem('arydebts-guide-user-v128:'+id,'done');localStorage.removeItem('arydebts-guide-repair-v166:'+id)}
  });
  await page.reload({waitUntil:'load'});
  await page.waitForFunction(()=>!!window.arySaveHomeExpense193);
  await page.waitForTimeout(650);
  assert.equal(await page.locator('.ary125cloud,.ary125shade,.ary125focus,.aryGuide94').count(),0,`${label}: existing account is never forced through the removed tour`);

  assert.deepEqual(errors,[],`${label}: no page errors during click/progress/guide flow`);
 }finally{await browser.close()}
}

server.listen(0,'127.0.0.1',async()=>{
 try{
  if(!process.env.ARY_TEST_ENGINE||process.env.ARY_TEST_ENGINE==='chromium')await run(chromium,'chromium');
  if(!process.env.ARY_TEST_ENGINE||process.env.ARY_TEST_ENGINE==='webkit')await run(webkit,'webkit');
  console.log('Click, progress and guide regression browser checks passed.');
 }catch(err){console.error(err);process.exitCode=1}
 finally{server.close()}
});
