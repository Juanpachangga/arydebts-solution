const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium,webkit}=require('playwright'),root=__dirname;
const server=http.createServer(async(req,res)=>{try{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname.replace(/^\/$/,'/index.html'));if(!file.startsWith(root+path.sep))return res.writeHead(403).end();res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');res.end(await fs.readFile(file))}catch{res.writeHead(404).end()}});
(async()=>{let browser;try{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 for(const [name,engine] of [['chromium',chromium],['webkit',webkit]].filter(([n])=>!process.env.ARY_TEST_ENGINE||process.env.ARY_TEST_ENGINE===n)){
  browser=await engine.launch();const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>!!window.aryGuideInteractionSafety180);
  await page.evaluate(()=>{
   profile={name:'Test',email:'test@example.test'};s.onboarded=true;s.income=1000;s.incomeFrequency='monthly';localStorage.setItem('arydebts-guide-v125','done');
   aryAssistantConfig58.endpoint='https://synthetic.example.test/assistant';window.pendingRequests=[];
   window.fetch=(url,init)=>new Promise((resolve,reject)=>{pendingRequests.push({body:JSON.parse(init.body),signal:init.signal,resolve});init.signal.addEventListener('abort',()=>reject(new DOMException('Cancelled','AbortError')),{once:true})});
   go('assistant');
  });
  await page.locator('#shareBudget58').check();await page.locator('#chatinput58').fill('Ayuda con mis gastos');await page.locator('.chatForm58 button').click();
  await page.waitForFunction(()=>pendingRequests.length===1);assert.equal(await page.locator('#shareBudget58').isChecked(),true,'Consent survives the busy repaint');
  assert.equal(await page.evaluate(()=>pendingRequests[0].body.budget.income),1000,'Only consented summary is included');
  await page.evaluate(()=>pendingRequests[0].resolve(Response.json({reply:'Respuesta de prueba'})));await page.waitForFunction(()=>document.querySelector('#chatlog58')?.textContent.includes('Respuesta de prueba'));
  assert.equal(await page.locator('#shareBudget58').isChecked(),true,'Consent survives the answer repaint');
  await page.locator('#shareBudget58').uncheck();await page.locator('#chatinput58').fill('Otra pregunta');await page.locator('.chatForm58 button').click();
  await page.waitForFunction(()=>pendingRequests.length===2);assert.equal(await page.evaluate(()=>Object.hasOwn(pendingRequests[1].body,'budget')),false,'Unchecked consent sends no budget');
  await page.evaluate(()=>logout());await page.waitForFunction(()=>pendingRequests[1].signal.aborted);
  await page.evaluate(()=>{profile={name:'Another',email:'another@example.test'};go('assistant')});
  assert.equal(await page.locator('#chatlog58').innerText(),'','Sign-out clears the previous conversation');assert.equal(await page.locator('#shareBudget58').isChecked(),false,'Consent resets for the next session');
  await page.locator('#chatinput58').fill('Nueva conversación');await page.locator('.chatForm58 button').click();await page.waitForFunction(()=>pendingRequests.length===3);
  await page.evaluate(()=>aryClearAssistant58());assert.equal(await page.evaluate(()=>pendingRequests[2].signal.aborted),true,'New request remains cancellable after stale request completion');
  await page.evaluate(()=>render());assert.equal(await page.locator('.chatForm58 button').isEnabled(),true,'Cancellation releases the busy state');
  // Same-route navigation must reflect state changes, including the selected theme.
  await page.evaluate(()=>{go('more');s.locale='en-US';go('more')});assert.ok((await page.locator('#app').innerText()).includes('Your tools'));
  await page.evaluate(()=>{s.theme='light';localStorage.setItem('ary-theme-v46','dark');go('more')});assert.equal(await page.evaluate(()=>document.documentElement.dataset.aryTheme),'light','Model theme wins over stale legacy cache');
  await page.evaluate(()=>toggleTheme());assert.equal(await page.evaluate(()=>document.documentElement.dataset.aryTheme),'dark','Theme toggle repaints the current section');
  await page.evaluate(()=>{go('home');aryPin61('calendar')});assert.equal(await page.locator('.adaptiveLinks61 button').first().getAttribute('data-route'),'calendar','Pinned shortcut updates immediately');
  await page.evaluate(()=>{aryPin61('');aryToggleAdaptive61();closeM()});assert.equal(await page.locator('.adaptiveLinks61 button').first().getAttribute('data-route'),'debts','Stable shortcuts update immediately');
  assert.deepEqual(errors,[]);await browser.close();browser=null;
  console.log('PASS '+name+': summary consent, busy repaint, sign-out abort, cleared conversation, cancellable next session, same-route locale and theme');
 }
 }finally{await browser?.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
