// Real browser smoke tests. Only synthetic data, served locally; never production.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { chromium, webkit } = require('playwright');

const root = __dirname;
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.jpeg':'image/jpeg', '.webmanifest':'application/manifest+json' };
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    const body = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type':types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store' }).end(body);
  } catch { res.writeHead(404).end(); }
});

async function check(engine, label, viewport) {
  const browser = await engine.launch();
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const navigate = route => page.evaluate(route => go(route), route);
  try {
    const origin = `http://127.0.0.1:${server.address().port}`;
    await page.goto(origin, { waitUntil:'load' });
    assert.ok((await page.locator('#app').innerText()).includes('Arydebts'), 'Fresh startup renders');
    assert.equal(await page.evaluate(() => s.income), 0, 'Fresh startup has no invented income');
    await page.evaluate(() => {
      profile = { name:'Browser Test', email:'browser@example.com', localDemo:true };
      Object.assign(s, { name:'Browser Test', onboarded:true, income:1000, incomeFrequency:'monthly', mode:'lite', locale:'es-US', currency:'USD', goal:'security', goals:['security'], debts:[], expenses:[], payments:[] });
      localStorage.setItem('arydebts-profile', JSON.stringify(profile));
      save(); go('home');
    });
    await navigate('income');
    await page.locator('[onclick="aryIncomeForm45()"]').click();
    await page.locator('#inc45').fill('1,250.50');
    await page.locator('#freq45').selectOption('weekly');
    await page.locator('[onclick="arySaveIncome45()"]').click();
    assert.equal(await page.evaluate(() => s.income), 1250.5);
    await page.reload({ waitUntil:'load' });
    assert.equal(await page.evaluate(() => s.income), 1250.5, 'Income survives reload');
    assert.equal(await page.evaluate(() => s.incomeFrequency), 'weekly');
    await page.evaluate(() => { s.income=1000; s.incomeFrequency='monthly'; save(); });
    await navigate('buy');
    const before = await page.evaluate(() => localStorage.getItem('arydebts-v3'));
    await page.locator('#buyPrice').fill('100');
    await page.locator('[onclick="aryCheckBuy45()"]').click();
    assert.ok((await page.locator('#buyResult').innerText()).length > 20, 'Purchase produces an explanation');
    assert.equal(await page.evaluate(() => localStorage.getItem('arydebts-v3')), before, 'Analysis does not record a purchase');

    for (const locale of ['es-US','es-CO','es-ES','en-US','pt-BR']) {
      await page.evaluate(locale => { s.locale=locale; save(); }, locale);
      for (const route of ['home','income','debts','expenses','plan','progress','calendar','profile','buy','goals','setupIncome','setupGoal','setupDebts','setupExpenses']) {
        await navigate(route);
        assert.ok((await page.locator('#app').innerText()).trim().length > 10, `${locale}/${route} renders`);
      }
      await navigate('income');
      const heading = await page.locator('#app').innerText();
      assert.ok(heading.includes(locale==='en-US' ? 'My income' : locale==='pt-BR' ? 'Minha renda' : 'Mis ingresos'), `${locale} income is localized`);
    }
    await page.evaluate(() => { s.locale='es-US'; save(); go('home'); });
    for (const theme of ['light','dark']) {
      await page.evaluate(theme => { localStorage.setItem('ary-theme-v46', theme==='light'?'dark':'light'); aryToggleTheme40(); }, theme);
      assert.equal(await page.locator('html').getAttribute('data-ary-theme'), theme);
      await page.screenshot({ path:path.join(root,'browser-results', `${label}-${theme}.png`), fullPage:true });
    }
    await navigate('profile');
    await page.evaluate(() => aryProfile46());
    await page.locator('#aryName46').fill('Draft stays');
    // A browser-created image exercises actual decoding, canvas and upload events.
    const png = await page.evaluate(() => { const c=document.createElement('canvas'); c.width=1200;c.height=900;c.getContext('2d').fillRect(0,0,1200,900);return c.toDataURL('image/png').split(',')[1]; });
    await page.locator('#aryPhoto46').setInputFiles({ name:'synthetic.png', mimeType:'image/png', buffer:Buffer.from(png,'base64') });
    await page.waitForFunction(() => !!localStorage.getItem('ary-profile-photo-v46'));
    await page.waitForFunction(() => !!document.querySelector('.profilePhoto46 img'));
    assert.equal(await page.locator('#aryName46').inputValue(), 'Draft stays', 'Photo upload preserves unsaved profile');
    const dimensions = await page.locator('.profilePhoto46 img').evaluate(async img => { await img.decode(); return [img.naturalWidth,img.naturalHeight]; });
    assert.ok(Math.max(...dimensions)<=768, 'Photo is resized by the real browser');
    await page.locator('[onclick="aryRemovePhoto46()"]').click();
    assert.equal(await page.evaluate(() => localStorage.getItem('ary-profile-photo-v46')), null);
    await page.evaluate(() => closeM());
    assert.deepEqual(errors, [], 'No uncaught errors or unhandled promise rejections');
    console.log(`PASS ${label}: startup, income persistence, purchase, 5 locales, routes, themes, photo decoding`);
  } catch (error) {
    await page.screenshot({ path:path.join(root,'browser-results',`${label}-failure.png`), fullPage:true }).catch(() => {});
    console.error('Browser errors:', errors);
    throw error;
  } finally { await context.close(); await browser.close(); }
}

(async () => {
  await fs.mkdir(path.join(root,'browser-results'), { recursive:true });
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  try {
    for (const [engine,name] of [[chromium,'chromium'],[webkit,'webkit']]) {
      for (const [size,viewport] of [['desktop',{width:1280,height:900}],['mobile',{width:390,height:844}]]) {
        await check(engine, `${name}-${size}`, viewport);
      }
    }
  } finally { server.close(); }
})().catch(error => { console.error(error); process.exitCode=1; });
