const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path'),{chromium}=require('playwright');
const root=__dirname,server=http.createServer(async(req,res)=>{try{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname.replace(/^\/$/,'/index.html'));if(!file.startsWith(root+path.sep))return res.writeHead(403).end();res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(await fs.readFile(file))}catch{res.writeHead(404).end()}});
(async()=>{let browser;try{
await new Promise(r=>server.listen(0,'127.0.0.1',r));
browser=await chromium.launch(process.env.ARY_BROWSER_PATH?{executablePath:process.env.ARY_BROWSER_PATH,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']}:{});
for(const timezone of ['America/Chicago','Asia/Tokyo']){
const context=await browser.newContext({timezoneId:timezone,viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://**/*',r=>r.abort());
await page.clock.install({time:new Date('2026-10-15T15:00:00Z')});await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>window.aryWorkspaceReady227);
assert.equal(await page.locator('#todayCalendar234').count(),0,'Date shortcut is for signed-in users');
for(const tier of ['simple','complete','premium']){
await page.evaluate(async tier=>{profile={name:'Calendar test',email:'calendar234@example.test',localDemo:true};localStorage.setItem('arydebts-profile',JSON.stringify(profile));Object.assign(s,{onboarded:true,experience214:tier==='simple'?'simple':'complete',locale:'es-US',currency:'USD',income:1200,calendarEvents:[],expenses:[],debts:[],payments:[],guide94:{version:203,active:false,completed:true,seen:['home','expenses','plan','debts','investments','more']}});window.aryPremiumService214={ready:true,readStatus:async()=>({owner:aryGuideLifecycle128.currentUser(),plan:tier==='premium'?'premium':'free',status:tier==='premium'?'active':'inactive',amount:999,currency:'USD',interval:'month',validUntil:new Date(Date.now()+86400000*5).toISOString()})};save();await aryRefreshPremium214();go('home')},tier);
for(const width of [320,390,760,1366])for(const locale of ['es-US','en-US','pt-BR']){
await page.setViewportSize({width,height:900});await page.evaluate(locale=>{s.locale=locale;render()},locale);
assert.equal(await page.locator('#todayCalendar234').count(),1);
assert.equal(await page.locator('#homeExperience214 #todayCalendar234').isVisible(),true);
assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),tier+' '+width+' '+locale);
}
if(tier==='premium')assert.equal(await page.locator('#homeExperience214 .premiumBadge219').count(),1);
const before=await page.evaluate(()=>JSON.stringify({income:s.income,expenses:s.expenses,debts:s.debts,payments:s.payments}));
await page.evaluate(()=>aryCalendarDate60('2025-01-01'));await page.evaluate(()=>go('home'));await page.locator('#todayCalendar234').click();
assert.equal(await page.evaluate(()=>screen),'calendar');assert.equal(await page.evaluate(()=>aryCalendarSelection227()),timezone==='Asia/Tokyo'?'2026-10-16':'2026-10-15');
assert.equal(await page.evaluate(()=>JSON.stringify({income:s.income,expenses:s.expenses,debts:s.debts,payments:s.payments})),before);
await page.evaluate(()=>{s.locale='es-US';go('home')});
await page.clock.setSystemTime(new Date(timezone==='America/Chicago'?'2026-10-16T04:59:59Z':'2026-10-16T14:59:59Z'));await page.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));
assert.equal(await page.locator('#todayCalendar234 time').getAttribute('datetime'),timezone==='Asia/Tokyo'?'2026-10-16':'2026-10-15');
await page.clock.runFor(1500);
const expected=timezone==='America/Chicago'?'2026-10-16':'2026-10-17';
assert.equal(await page.locator('#todayCalendar234 time').getAttribute('datetime'),expected);
await page.locator('#todayCalendar234').click();assert.equal(await page.evaluate(()=>aryCalendarSelection227()),expected);
await page.clock.setSystemTime(new Date('2026-10-15T15:00:00Z'));
}
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{s.locale='es-US';go('home')});await page.screenshot({path:path.join(root,'..','date-'+timezone.replace('/','-')+'.png')});
const review=await context.newPage();await review.route('https://**/*',r=>r.abort());review.on('pageerror',e=>errors.push(e.message));await review.goto('http://127.0.0.1:'+server.address().port+'/review/creator-f413120183a47717019fe88e/index.html');await review.waitForFunction(()=>window.aryPreviewReady216);assert.equal(await review.locator('#todayCalendar234').isVisible(),true);await review.locator('#todayCalendar234').click();assert.equal(await review.evaluate(()=>screen),'calendar');await review.close();
assert.deepEqual(errors,[]);await context.close();console.log('PASS '+timezone+': three tiers, local date, midnight rollover, calendar selection, three languages, four viewport sizes, no ledger changes, creator preview.');
}
}finally{await browser?.close();server.close()}})().catch(e=>{console.error(e);process.exitCode=1});
