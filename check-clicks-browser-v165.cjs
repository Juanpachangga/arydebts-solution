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
   localStorage.setItem('arydebts-profile',JSON.stringify({name:'Click Test',email:'click-test@example.com',localDemo:true}));
   localStorage.setItem('arydebts-v3',JSON.stringify({currency:'USD',locale:'es-US',mode:'immersive',name:'Click Test',income:2500,incomeFrequency:'monthly',goal:'',goals:[],greeting:'',theme:'dark',navOrder:['home','debts','expenses','plan','more'],savings:0,onboarded:true,debts:[],expenses:[],calendarEvents:[],payments:[]}));
   localStorage.setItem('arydebts-guide-v125','done');
  });
  const origin=`http://127.0.0.1:${server.address().port}`;
  await page.goto(origin,{waitUntil:'load'});
  await page.waitForSelector('#aryQuickFab133');

  const fab=page.locator('#aryQuickFab133');
  assert.ok(await fab.isVisible(),`${label}: quick action button is visible`);
  await fab.click();
  await page.waitForSelector('#modal:not(.hidden)');
  await page.waitForFunction(()=>!document.getElementById('aryQuickFab133'));
  assert.equal(await page.locator('#aryQuickFab133').count(),0,`${label}: FAB is removed while modal is open`);
  assert.equal(await page.locator('#modal').evaluate(el=>getComputedStyle(el).pointerEvents),'auto',`${label}: open modal receives taps`);

  await page.locator("button[onclick=\"aryQuickAction133('expense')\"]").click();
  await page.waitForFunction(()=>document.querySelector('#modal:not(.hidden) #n')&&document.querySelector('#modal:not(.hidden) #b'));
  await page.locator('#n').fill('Click-safe expense');
  await page.locator('#b').fill('12.50');
  await page.locator('#modal button[onclick*="saveExpense"]').click();
  await page.waitForFunction(()=>document.getElementById('modal').classList.contains('hidden'));
  assert.equal(await page.evaluate(()=>s.expenses.some(e=>e.name==='Click-safe expense')),true,`${label}: expense save click works`);
  await page.waitForSelector('#aryQuickFab133');

  await page.evaluate(()=>expenseForm());
  await page.waitForSelector('#modal:not(.hidden)');
  assert.equal(await page.locator('#aryQuickFab133').count(),0,`${label}: direct forms also hide FAB`);
  await page.locator('#modal button[onclick="closeM()"]').click();
  await page.waitForFunction(()=>document.getElementById('modal').classList.contains('hidden'));
  await page.waitForSelector('#aryQuickFab133');

  assert.deepEqual(errors,[],`${label}: no page errors during click flow`);
 }finally{await browser.close()}
}

server.listen(0,'127.0.0.1',async()=>{
 try{
  await run(chromium,'chromium');
  await run(webkit,'webkit');
  console.log('Click regression browser checks passed.');
 }catch(err){console.error(err);process.exitCode=1}
 finally{server.close()}
});
