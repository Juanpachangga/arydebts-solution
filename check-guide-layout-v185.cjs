const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium,webkit}=require('playwright');
const root=__dirname;
const server=http.createServer(async(req,res)=>{try{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname.replace(/^\/$/,'/index.html'));if(!file.startsWith(root+path.sep))return res.writeHead(403).end();res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(await fs.readFile(file))}catch{res.writeHead(404).end()}});
(async()=>{let browser;try{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 for(const [name,engine] of [['chromium',chromium],['webkit',webkit]].filter(([n])=>!process.env.ARY_TEST_ENGINE||process.env.ARY_TEST_ENGINE===n)){
  for(const viewport of [{width:320,height:568},{width:390,height:844},{width:1280,height:800}])for(const theme of ['light','dark']){
   browser=await engine.launch();
   const page=await browser.newPage({viewport}),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:'+server.address().port);
   await page.waitForFunction(()=>!!window.aryGuideInteractionSafety180);
   await page.evaluate(theme=>{
    profile={name:'Test',email:'layout@example.test'};s.name='Test';s.locale='es-US';s.theme=theme;s.onboarded=true;s.income=2500;s.incomeFrequency='monthly';
    s.debts=[{id:1,name:'Carro',balance:250,min:50,apr:12}];s.expenses=[{id:2,name:'Mercado',amount:80,cat:'Esencial',date:localDate()}];
    localStorage.setItem('ary-theme-v46',theme);render();aryStartFullGuide125();
   },theme);
   for(let index=0;index<28;index++){
    if(index)await page.evaluate(()=>aryFullGuideNext125());
    await page.waitForFunction(i=>aryFullGuideStatus125().index===i&&document.querySelectorAll('.ary125cloud').length===1,index);
    await page.waitForTimeout(180);
    const state=await page.evaluate(()=>{
     const card=document.querySelector('.ary125cloud'),focus=document.querySelector('.ary125focus'),nav=document.querySelector('#nav');
     const rect=n=>{if(!n)return null;const r=n.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width,height:r.height}};
     const primary=card.querySelector('.primary'),bg=getComputedStyle(card).backgroundColor,foreground=getComputedStyle(card).color;
     return {card:rect(card),focus:rect(focus),nav:rect(nav),bg,foreground,scrollHeight:card.scrollHeight,clientHeight:card.clientHeight,primary:rect(primary),cancel:rect(card.querySelector('.ary140cancelTop')),text:card.querySelector('p')?.textContent,robot:card.querySelector('.aryGuideCompanion')?.getAttribute('aria-label'),automatic:aryFullGuideStatus125().automatic,extras:document.querySelectorAll('.ary126node,.aryGuide94').length};
    });
    const label=`${name} ${viewport.width} ${theme} step ${index}`;
    assert.equal(state.automatic,false,label+': manual reading pace');assert.equal(state.extras,0,label+': one guide');
    assert.ok(state.card.left>=7&&state.card.right<=viewport.width-7,label+': horizontal bounds');
    assert.ok(state.card.top>=7&&state.card.bottom<=viewport.height-7,label+': vertical bounds');
    assert.ok(state.primary.top>=state.card.top&&state.primary.bottom<=state.card.bottom+1,label+': readable primary action');
    assert.ok(state.primary.height>=44,label+': touch target');assert.ok(state.scrollHeight<=state.clientHeight+1,label+': no clipped text');
    assert.notEqual(state.bg,state.foreground,label+': theme contrast');
    if(index<27){assert.ok(state.cancel?.height>=44,label+': accessible cancel action '+JSON.stringify(state.cancel));assert.match(state.robot,/ARY.*🤖/,label+': companion');assert.ok(state.text.length<130,label+': concise explanation')}
    if(index===8)assert.equal(await page.locator('.debtExpenses66').isVisible(),false,'Expense guide excludes debt panels');
    if(state.focus){const a=state.card,b=state.focus;assert.ok(a.bottom<=b.top||a.top>=b.bottom||a.right<=b.left||a.left>=b.right,label+': card never covers its spotlight');if(index!==3&&state.nav?.height)assert.ok(b.bottom<=state.nav.top,label+': spotlight excludes navigation')}
    if(viewport.width===390&&[6,8,13].includes(index)){await fs.mkdir('browser-results',{recursive:true});await page.screenshot({path:`browser-results/guide-${theme}-${index}-${name}.png`})}
   }
   await page.evaluate(()=>aryFullGuideFinish125());await page.waitForFunction(()=>!aryFullGuideStatus125().active);
   await page.evaluate(()=>{aryStartFullGuide125();go('expenses')});
   await page.waitForTimeout(250);assert.equal(await page.evaluate(()=>aryFullGuideStatus125().active),false,'Choosing another tab closes the previous guide');
   assert.equal(await page.locator('.ary125cloud,.ary125focus,.ary125shade').count(),0,'No stale overlays after user navigation');
   assert.deepEqual(errors,[],name+': no page errors');await browser.close();browser=null;
   console.log(`PASS ${name} ${viewport.width} ${theme}: all 28 steps, ARY, concise copy, no clipping/overlap, manual pace and clean navigation`);
  }
 }
 }finally{await browser?.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
