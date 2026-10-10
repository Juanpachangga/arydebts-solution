const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('playwright');
const root=__dirname;
const server=http.createServer(async(req,res)=>{try{const name=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname.replace(/^\/$/,'/index.html'));if(!name.startsWith(root+path.sep))return res.writeHead(403).end();const content=await fs.readFile(name);res.setHeader('Content-Type',name.endsWith('.js')?'text/javascript':name.endsWith('.html')?'text/html':name.endsWith('.css')?'text/css':'application/octet-stream');res.end(content)}catch{res.writeHead(404).end()}});
(async()=>{let browser;try{await new Promise(r=>server.listen(0,'127.0.0.1',r));browser=await chromium.launch({headless:true});const page=await browser.newPage({acceptDownloads:true});let errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());await page.goto('http://127.0.0.1:'+server.address().port);await page.evaluate(()=>{s.income=101;save();s.income=202;save();s.income=303;save();aryV18Settings()});await page.getByRole('button',{name:'💾 Copias de mis datos',exact:true}).click();assert.equal(await page.locator('#aryHistory92 button').count()>0,true);const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#aryDownload92').click()]);const content=JSON.parse(await fs.readFile(await download.path(),'utf8'));assert.equal(content.state.income,303);assert.equal(content.history.some(x=>JSON.parse(x.raw).income===202),true);await page.evaluate(()=>{const set=Storage.prototype.setItem;window.aryRestoreStorage105=()=>{Storage.prototype.setItem=set};Storage.prototype.setItem=function(k,v){if(k==='arydebts-v3')throw new DOMException('Test storage full','QuotaExceededError');return set.call(this,k,v)};s.income=404;save();aryRecovery92()});
assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('arydebts-v3')).income),303,'Failed save keeps the old persisted snapshot');
const [emergency]=await Promise.all([page.waitForEvent('download'),page.locator('#aryDownload92').click()]);
const emergencyContent=JSON.parse(await fs.readFile(await emergency.path(),'utf8'));
assert.equal(emergencyContent.state.income,404,'Download preserves visible edits after storage failure');assert.equal(emergencyContent.lastSavedState.income,303);assert.equal(emergencyContent.unsavedChanges,true);
await page.evaluate(()=>aryRestoreStorage105());
await page.locator('#aryHistory92 button').first().click();assert.equal(await page.evaluate(()=>s.income),202);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('arydebts-v3')).income),202);await page.reload();assert.equal(await page.evaluate(()=>s.income),202);// Keep a recovery dialog open while its history changes.
await page.evaluate(()=>{s.income=505;save();aryRecovery92();s.income=606;save()});
await page.locator('#aryHistory92 button').first().click();
assert.equal(await page.evaluate(()=>s.income),202,'The button restores the copy displayed when the dialog opened');
// Restore a legacy record with a null debt and malformed preferences.
await page.evaluate(()=>{const raw=JSON.stringify({income:707,debts:[{id:707,name:'Legacy card',balance:70,min:7},null],expenses:[],payments:[],calendarEvents:[],locale:'bad_locale',goals:null});localStorage.setItem('arydebts-recovery-v92',JSON.stringify([{at:new Date().toISOString(),raw}]));aryRecovery92()});
await page.locator('#aryHistory92 button').first().click();
assert.equal(await page.evaluate(()=>s.income),707);
assert.equal(await page.evaluate(()=>s.debts.length),1);
assert.equal(await page.evaluate(()=>s.debts[0].balance),70);
assert.equal(await page.evaluate(()=>s.locale),'es-US');
assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('arydebts-recovery-v92')).some(x=>JSON.parse(x.raw).debts?.includes(null))),true,'Keep the unmodified original');
await page.reload();assert.equal(await page.evaluate(()=>s.income),707);assert.equal(await page.evaluate(()=>s.debts.length),1);
assert.deepEqual(errors,[]);console.log('PASS browser: automatic history, settings entry, download, confirmed restoration and reload')}finally{await browser?.close();server.close()}})().catch(e=>{console.error(e);process.exitCode=1});
