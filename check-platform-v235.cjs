const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path'),{chromium,webkit}=require('playwright');
const root=__dirname,server=http.createServer(async(req,res)=>{try{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname.replace(/^\/$/,'/index.html'));if(!file.startsWith(root+path.sep))return res.writeHead(403).end();res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.svg')?'image/svg+xml':file.endsWith('.png')?'image/png':file.endsWith('.webmanifest')?'application/manifest+json':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(await fs.readFile(file))}catch{res.writeHead(404).end()}});
(async()=>{let browser;try{
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
for(const[name,engine]of[['chromium',chromium],['webkit',webkit]].filter(([n])=>!process.env.ARY_TEST_ENGINE||n===process.env.ARY_TEST_ENGINE)){
browser=await engine.launch(name==='chromium'&&process.env.ARY_BROWSER_PATH?{executablePath:process.env.ARY_BROWSER_PATH,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']}:{});
const context=await browser.newContext({timezoneId:'America/Chicago',viewport:{width:1366,height:900}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://**/*',r=>r.abort());await page.goto(base);await page.waitForFunction(()=>window.aryPlatformReady235);
await page.evaluate(()=>{window.fixture235={owner:'',plan:'free',status:'inactive',amount:999,currency:'USD',interval:'month',validUntil:new Date(Date.now()+86400000*5).toISOString()};profile={name:'Prueba de escritorio',email:'platform235@example.test',localDemo:true};localStorage.setItem('arydebts-profile',JSON.stringify(profile));Object.assign(s,{onboarded:true,experience214:'simple',simpleDefaults215:true,mode:'lite',completeAppearance215:{theme:'light',mode:'immersive'},theme:'light',locale:'es-US',currency:'USD',income:3200,calendarEvents:[],payments:[],expenses:[{id:2351,name:'Compra para la casa y gastos esenciales',amount:120,frequency:'once',date:localDate(),cat:'Casa'}],debts:[{id:2352,name:'Tarjeta de crédito de la familia',balance:450,min:45,apr:18}],guide94:{version:203,active:false,completed:true,seen:['home','expenses','plan','debts','investments','more']},simpleGuide216:{owner:'platform235@example.test',seen:['home','expenses','debts','more']}});window.aryBackdropSeason71=()=>'halloween';aryPremiumService214={ready:true,readStatus:async()=>({...fixture235,owner:aryGuideLifecycle128.currentUser()})};save();go('home')});
assert.equal(await page.evaluate(()=>s.mode),'immersive','Repair old Simple-enforced Lite');
const finances=await page.evaluate(()=>JSON.stringify([s.income,s.expenses,s.debts,s.payments]));
for(const tier of ['simple','complete','premium']){
await page.evaluate(async tier=>{fixture235.plan=tier==='premium'?'premium':'free';fixture235.status=tier==='premium'?'active':'inactive';await aryRefreshPremium214();if(tier!=='premium')arySetExperience214(tier);s.mode='immersive';go('home')},tier);
for(const width of [320,390,768,1024,1366,1920,2560,3840]){
await page.setViewportSize({width,height:width===3840?2160:900});
for(const route of tier==='simple'?['home','expenses','debts','calendar','more']:['home','expenses','plan','debts','investments','calendar','more','profile']){
await page.evaluate(route=>go(route),route);
assert.equal(await page.evaluate(()=>screen),route);
assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),[name,tier,width,route,'page overflow'].join(' '));
assert.equal(await page.locator('.seasonArt71').first().evaluate(el=>getComputedStyle(el).animationName),'aryFloat235',[tier,route,'motion'].join(' '));
assert.equal(await page.locator('.seasonBackdrop71').evaluate(el=>getComputedStyle(el).pointerEvents),'none');
if(width>=1024){
const boxes=await page.evaluate(()=>({app:document.getElementById('app').getBoundingClientRect().left,rail:document.getElementById('nav').getBoundingClientRect().right}));
assert.ok(boxes.app>=boxes.rail+10,[tier,width,route,'desktop rail overlap',JSON.stringify(boxes)].join(' '));
}
}
if(process.env.ARY_CAPTURE235&&[390,1366,1920].includes(width)){await page.evaluate(()=>go('home'));await page.screenshot({path:path.join(root,'..','platform-'+name+'-'+tier+'-'+width+'.png'),fullPage:false})}
}
await page.evaluate(()=>{go('home');s.mode='lite';render()});assert.equal(await page.locator('.seasonArt71').first().evaluate(el=>getComputedStyle(el).animationName),'none','Lite still pauses motion');
await page.evaluate(()=>{s.mode='immersive';render()});await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.seasonArt71').first().evaluate(el=>getComputedStyle(el).animationName),'none','System motion preference is respected');await page.emulateMedia({reducedMotion:'no-preference'});
await page.evaluate(()=>go('more'));await page.locator('.installEntry235').click();assert.ok(await page.locator('.installGuide235').isVisible());assert.equal(await page.locator('.installBrand235 img').evaluate(el=>el.complete&&el.naturalWidth===192),true);await page.evaluate(()=>closeM());
}
await page.setViewportSize({width:1366,height:900});await page.evaluate(()=>go('home'));
await page.waitForFunction(()=>document.querySelector('.seasonArt71')?.getAnimations().some(a=>a.playState==='running'&&a.currentTime>100));
const one=await page.locator('.seasonArt71').first().evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(350);const two=await page.locator('.seasonArt71').first().evaluate(el=>getComputedStyle(el).transform);assert.notEqual(one,two,'Decorative art actually moves between frames');
for(const locale of ['es-US','en-US','pt-BR']){
await page.evaluate(locale=>{s.locale=locale;go('investingGuide216')},locale);
assert.equal(await page.locator('.learningPath235').count(),7);
for(const link of await page.locator('.learningPath235>a').evaluateAll(els=>els.map(a=>({href:a.href,rel:a.rel,target:a.target})))){assert.ok(link.href.startsWith('https://'));assert.match(link.rel,/noopener/);assert.equal(link.target,'_blank')}
await page.locator('#learningCountry216').selectOption('co');assert.equal(await page.locator('.learningPath235').count(),1);assert.equal(await page.locator('.learningPath235>a').getAttribute('href'),'https://www.bancolombia.com/personas/productos/inversiones');
await page.locator('#learningCountry216').selectOption('us');assert.equal(await page.locator('.learningPath235').count(),6);await page.locator('#learningCountry216').selectOption('all');
for(const width of [320,1366]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));}
}
if(process.env.ARY_CAPTURE235){await page.setViewportSize({width:1366,height:900});await page.evaluate(()=>{s.locale='es-US';render()});await page.screenshot({path:path.join(root,'..','platform-'+name+'-investing.png'),fullPage:false})}
await page.evaluate(()=>{go('more');window.nativePromptCalls235=0;const e=new Event('beforeinstallprompt',{cancelable:true});e.prompt=async()=>{nativePromptCalls235++};e.userChoice=Promise.resolve({outcome:'dismissed'});dispatchEvent(e);aryInstall235()});await page.locator('[onclick="aryPromptInstall235()"]').click();assert.equal(await page.evaluate(()=>nativePromptCalls235),1);await page.evaluate(()=>closeM());
assert.equal(await page.evaluate(()=>JSON.stringify([s.income,s.expenses,s.debts,s.payments])),finances);
const manifest=await (await page.request.get(base+'/manifest.webmanifest')).json();assert.equal(manifest.name,'Arydebts');assert.equal(manifest.display,'standalone');assert.equal(manifest.icons.length,3);
for(const icon of manifest.icons){const img=await page.evaluate(async src=>{const i=new Image;i.src=src;await i.decode();return {w:i.naturalWidth,h:i.naturalHeight}},icon.src);assert.equal(img.w+'x'+img.h,icon.sizes)}
if(name==='chromium'){
await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
await context.setOffline(true);await page.goto(base+'/');assert.match(await page.locator('h2').innerText(),/Sin conexión/);await context.setOffline(false);await page.goto(base);await page.waitForFunction(()=>window.aryPlatformReady235);
const cache=await page.evaluate(async()=>{const names=await caches.keys();return Promise.all(names.filter(n=>n.startsWith('arydebts-install')).map(async n=>(await(await caches.open(n)).keys()).map(r=>new URL(r.url).pathname)))});
assert.ok(cache.flat().every(p=>/offline.html|app-icon-192.png/.test(p)),'Cache holds no account pages, API responses or financial records');
}
assert.deepEqual(errors,[]);await context.close();await browser.close();browser=null;console.log('PASS '+name+': Simple migration, all-tier real animation, Lite/reduced-motion, routes through 4K, desktop rail, install guide and icons, official country-filtered investment paths, no ledger changes'+(name==='chromium'?', service worker offline fallback and limited cache':''));
}
}finally{await browser?.close();server.close()}})().catch(e=>{console.error(e);process.exitCode=1});
