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

  // V166 regression: Home must always retain its circular progress visualization.
  await page.waitForSelector('.homeTruth29 .ring');
  assert.ok(await page.locator('.homeTruth29 .ring').isVisible(),`${label}: home progress ring remains visible with empty debt history`);
  assert.equal((await page.locator('.homeTruth29 .ring b').innerText()).trim(),'0%',`${label}: empty real progress renders as 0%, never a dash`);
  await page.evaluate(()=>{
   s.debts=[{id:'ring-debt',name:'Ring debt',balance:800,min:50,apr:0}];
   s.payments=[{id:'ring-payment',debtId:'ring-debt',debtName:'Ring debt',amount:200,date:'2026-10-01'}];
   render();
  });
  await page.waitForFunction(()=>document.querySelector('.homeTruth29 .ring b')?.textContent.trim()==='20%');
  assert.equal((await page.locator('.homeTruth29 .ring b').innerText()).trim(),'20%',`${label}: home progress ring uses the real debt/payment ledger`);

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

  // V166 regression: an existing completed account gets the repaired guide exactly once.
  await page.evaluate(()=>{
   const id=window.aryGuideLifecycle128?.currentUser?.();
   localStorage.setItem('arydebts-guide-v125','done');
   if(id){
    localStorage.setItem('arydebts-guide-user-v128:'+id,'done');
    localStorage.removeItem('arydebts-guide-repair-v166:'+id);
   }
  });
  await page.reload({waitUntil:'load'});
  await page.waitForFunction(()=>window.aryFullGuideStatus125?.()?.active===true,null,{timeout:5000});
  assert.ok(await page.locator('.ary125cloud').isVisible(),`${label}: repaired first-run guide becomes visible again`);
  const repairState=await page.evaluate(()=>{
   const id=window.aryGuideLifecycle128?.currentUser?.();
   return id?localStorage.getItem('arydebts-guide-repair-v166:'+id):null;
  });
  assert.equal(repairState,'done',`${label}: repaired guide replay is marked so it only happens once`);

  assert.deepEqual(errors,[],`${label}: no page errors during click/progress/guide flow`);
 }finally{await browser.close()}
}

server.listen(0,'127.0.0.1',async()=>{
 try{
  await run(chromium,'chromium');
  await run(webkit,'webkit');
  console.log('Click, progress and guide regression browser checks passed.');
 }catch(err){console.error(err);process.exitCode=1}
 finally{server.close()}
});
