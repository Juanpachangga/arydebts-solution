const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium,webkit}=require('playwright'),root=__dirname;
const server=http.createServer(async(req,res)=>{try{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname.replace(/^\/$/,'/index.html'));if(!file.startsWith(root+path.sep))return res.writeHead(403).end();res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(await fs.readFile(file))}catch{res.writeHead(404).end()}});
const rect=async(page,selector)=>page.locator(selector).first().boundingBox();
(async()=>{let browser;try{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));await fs.mkdir('browser-results',{recursive:true});
 for(const [name,engine] of [['chromium',chromium],['webkit',webkit]].filter(([n])=>!process.env.ARY_TEST_ENGINE||process.env.ARY_TEST_ENGINE===n)){
  browser=await engine.launch();const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>!!window.aryGuideInteractionSafety180);
  await page.evaluate(()=>{profile={name:'Ana',email:'desktop@example.test'};s.name='Ana';s.onboarded=true;s.locale='es-US';s.income=3000;s.incomeFrequency='monthly';localStorage.setItem('arydebts-guide-v125','done');const id=aryGuideLifecycle128.currentUser();localStorage.setItem('arydebts-guide-user-v128:'+id,'done');localStorage.setItem('arydebts-guide-repair-v166:'+id,'done');s.guide94={active:false,completed:true};s.debts=[1,2,3,4].map(id=>({id,name:'Cuenta de ejemplo '+id,balance:500*id,min:40,apr:12,due:localDate()}));s.expenses=[1,2,3,4].map(id=>({id,name:'Gasto de ejemplo '+id,amount:70*id,cat:'Esencial',date:localDate()}));s.calendarEvents=[];s.payments=[];go('home')});
  for(const viewport of [{width:390,height:844},{width:768,height:1024},{width:1024,height:600},{width:1366,height:768},{width:1920,height:1080},{width:2560,height:1440}])for(const theme of ['light','dark']){
   await page.setViewportSize(viewport);await page.evaluate(theme=>{s.theme=theme;arySetUI72('size',1);go('home')},theme);const pc=viewport.width>=1000,label=`${name} ${viewport.width} ${theme}`;
   assert.equal(await page.locator('.top .headerActions64').count(),1,label+': reminder buttons preserve header structure');const nav=await rect(page,'#nav'),app=await rect(page,'#app'),ring=await rect(page,'.homeTruth29 .ring');assert.ok(Math.abs(ring.width-ring.height)<.5,label+': progress is perfectly circular');assert.equal(ring.width,pc?132:112,label+': larger progress circle');
   if(pc){assert.ok(nav.x+nav.width+16<=app.x,label+': navigation beside content');assert.ok(nav.y>=0&&nav.y+nav.height<=viewport.height,label+': navigation fits');assert.ok(app.width>=Math.min(1480,viewport.width*.66)&&app.width<=1500,label+': workspace uses width without overlong reading lines');
    const margin=await rect(page,'.homeMargin81'),actions=await rect(page,'.homeActions81');assert.ok(Math.abs(margin.y-actions.y)<2,label+': home actions beside monthly margin');
    if(viewport.width>=1200){const upcoming=await rect(page,'.homeUpcoming81'),income=await rect(page,'.homeDaily81>.third');assert.ok(Math.abs(upcoming.y-income.y)<2,label+': upcoming events and summaries share a row')}
   }else assert.ok(nav.y>viewport.height/2,label+': mobile retains bottom navigation');
   for(const route of ['home','debts','expenses','calendar','analysis','assistant','more']){
    await page.evaluate(route=>go(route),route);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),label+' '+route+': no horizontal overflow');
    if(pc&&route==='calendar'){const calendar=await rect(page,'.cal35'),detail=await rect(page,'.calDetail35,.calHint35');assert.ok(calendar.x+calendar.width<=detail.x,label+': calendar and details side by side');assert.ok(Math.abs(calendar.y-detail.y)<2,label+': calendar panels align')}
    if(pc&&viewport.width>=1200&&['debts','expenses'].includes(route)){const sel=route==='debts'?'.debtRecords186>.row':'.expenseRecords185>.row';const boxes=await page.locator(sel).evaluateAll(ns=>ns.map(n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y}}));assert.ok(boxes[1].x>boxes[0].x&&Math.abs(boxes[1].y-boxes[0].y)<2,label+': record columns')}
    if(viewport.width===1366&&['home','calendar','expenses'].includes(route))await page.screenshot({path:`browser-results/desktop186-${route}-${theme}-${name}.png`});
   }
   await page.evaluate(()=>go('expenses'));await page.locator('.addExpense67').click();const sheet=await rect(page,'#modal .sheet');assert.ok(sheet.x>=0&&sheet.x+sheet.width<=viewport.width&&sheet.y>=0&&sheet.y+sheet.height<=viewport.height,label+': dialog fits');if(pc)assert.ok(sheet.width>=560,label+': desktop form has useful width');await page.evaluate(()=>closeM());
   await page.evaluate(()=>{arySetUI72('size',1.5);go('home')});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),label+': large text home fits');await page.evaluate(()=>go('calendar'));assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),label+': large text calendar fits');
   console.log('PASS '+label+': responsive navigation, useful columns, calendar, dialogs and large text');
  }
  for(const width of [320,1366])for(const theme of ['light','dark'])for(const locale of ['es-US','en-US','pt-BR']){
   await page.setViewportSize({width,height:768});await page.evaluate(({theme,locale})=>{s.onboarded=false;s.theme=theme;s.locale=locale;arySetUI72('size',1);go('intro')},{theme,locale});
   assert.equal(await page.locator('.introAry186 svg').count(),1,'First step includes ARY');assert.ok((await page.locator('.introPanel186').innerText()).length<300,'Brief first-step copy');
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'First-step card fits');const panel=await rect(page,'.introPanel186');assert.ok(panel.width<=620,'First-step text keeps a readable width');
   if(locale==='es-US')await page.screenshot({path:`browser-results/desktop186-intro-${width}-${theme}-${name}.png`});
   await page.locator('.introPanel186 button').click();assert.equal(await page.evaluate(()=>screen),'setupIncome','First-step button opens income setup');
  }
  console.log('PASS '+name+': simple first-step card, ARY, both themes and three languages');
  assert.deepEqual(errors,[],name+': no page errors');await browser.close();browser=null;
 }
 }finally{await browser?.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
