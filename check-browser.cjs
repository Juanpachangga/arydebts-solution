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
    for(const theme of ['light','dark','light','dark']) {
      await page.locator('[onclick="aryToggleDark()"]').click();
      await page.waitForFunction(theme => document.documentElement.dataset.aryTheme===theme, theme);
      const expected=theme==='dark'?'rgb(255, 255, 255)':'rgb(23, 35, 59)';
      await page.waitForFunction(expected => getComputedStyle(document.querySelector('.tag21')).color===expected,expected);
      for(const selector of ['.tag21','.brand21 b','.features21 b']) {
        assert.equal(await page.locator(selector).first().evaluate(el=>getComputedStyle(el).getPropertyValue('-webkit-text-fill-color')), expected, 'Safari text fill follows landing theme');
      }
    }
    await page.screenshot({path:path.join(root,'browser-results',`${label}-landing-dark.png`),fullPage:true});
    await page.locator('[onclick="aryToggleLangMenu(event)"]').click();
    await page.locator('[onclick="arySetLandingLang(\'pt\')"]').click();
    assert.match(await page.locator('.cta21').innerText(), /^Começar hoje\s*→$/);
    // Exercise the actual signup and questions, rather than injecting an onboarded profile.
    await page.locator('[onclick="aryStartOnboarding43()"]').click();
    assert.ok((await page.locator('#app').innerText()).includes('Este espaço é seu'));
    assert.ok((await page.locator('#app').innerText()).includes('Senha'));
    assert.doesNotMatch(await page.locator('#app').innerText(), /Contraseña|Correo electrónico|Crear mi espacio/);
    await page.locator('#an').fill('Initial User');
    await page.locator('#ae').fill('initial@example.com');
    await page.locator('#ap').fill('synthetic-test-password');
    await page.locator('[onclick="localAuth(\'signup\')"]').click();
    assert.ok((await page.locator('#app').innerText()).includes('Comece a mudar'));
    await page.locator('[onclick="go(\'setupIncome\')"]').click();
    await page.locator('#oi').fill('1000');
    await page.locator('#of').selectOption('monthly');
    await page.locator('[onclick="arySaveIncome54()"]').click();
    assert.equal(await page.evaluate(() => screen), 'setupExpenses', 'Income leads to expenses before goals');
    await page.locator('[onclick="expenseForm()"]').click();
    await page.locator('#n').fill('Initial groceries');
    await page.locator('#b').fill('250');
    await page.locator('[onclick="saveExpense(null)"]').click();
    assert.ok((await page.locator('#app').innerText()).includes('Initial groceries'));
    await page.reload({waitUntil:'load'});
    assert.equal(await page.evaluate(() => screen), 'setupExpenses', 'Reload resumes the current question');
    assert.equal(await page.evaluate(() => s.locale), 'pt-BR', 'Landing language survives signup and reload');
    assert.ok((await page.locator('#app').innerText()).includes('Agora, seus gastos'));
    await page.locator('[onclick="go(\'setupDebts\')"]').click();
    await page.locator('[onclick="debtForm()"]').click();
    await page.locator('#n').fill('Initial credit card');
    await page.locator('#b').fill('1000');
    await page.locator('#m').fill('100');
    await page.locator('[onclick="saveDebt(null)"]').click();
    assert.ok((await page.locator('#app').innerText()).includes('Initial credit card'));
    await page.locator('[onclick="go(\'setupExpenses\')"]').click();
    assert.ok((await page.locator('#app').innerText()).includes('Initial groceries'), 'Going back keeps entered expenses');
    await page.locator('[onclick="go(\'setupDebts\')"]').click();
    await page.locator('[onclick="go(\'setupGoal\')"]').click();
    await page.locator('[onclick="aryContinueGoals54()"]').click();
    assert.equal(await page.evaluate(() => screen), 'setupGoal', 'Empty goal does not jump to another question');
    await page.locator('[onclick="aryChooseGoal54(\'debtFree\')"]').click();
    await page.locator('[onclick="aryContinueGoals54()"]').click();
    assert.equal(await page.evaluate(() => s.onboarded), true);
    await page.reload({waitUntil:'load'});
    assert.equal(await page.evaluate(() => screen), 'home');
    assert.equal(await page.evaluate(() => s.expenses[0].amount), 250);
    assert.equal(await page.evaluate(() => s.debts[0].balance), 1000);
    // Empty lists use explicit next steps; the goal can be chosen later.
    await page.evaluate(() => { aryEmptyFinancialState54(); go('intro'); });
    await page.locator('[onclick="go(\'setupIncome\')"]').click();
    await page.locator('#oi').fill('0');
    await page.locator('[onclick="arySaveIncome54()"]').click();
    await page.locator('[onclick="go(\'setupDebts\')"]').click();
    await page.locator('[onclick="go(\'setupGoal\')"]').click();
    await page.locator('[onclick="aryFinishOnboarding54()"]').click();
    assert.equal(await page.evaluate(() => screen), 'home');
    assert.equal(await page.evaluate(() => s.expenses.length+s.debts.length), 0);
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
      await page.evaluate(locale => setLocale(locale), locale);
      const audit={};
      for (const route of ['home','income','debts','expenses','plan','progress','calendar','profile','buy','goals','setupIncome','setupGoal','setupDebts','setupExpenses']) {
        await navigate(route);
        assert.ok((await page.locator('#app').innerText()).trim().length > 10, `${locale}/${route} renders`);
        audit[route]=await page.locator('#app').innerText();
      }
      for(const route of ['signup','login','intro','more','assistant','notifications']) {
        await navigate(route);audit[route]=await page.locator('#app').innerText();
        if(locale==='pt-BR'||locale==='en-US')assert.doesNotMatch(audit[route],/Contraseña|Correo electrónico|Crear mi espacio|Pregúntame sobre|¿Puedo comprar|Notificaciones|Un gasto merece atención|Empieza a cambiar/,`${locale}/${route} contains translated UI`);
      }
      await page.evaluate(() => debtForm());
      audit.debtForm=await page.locator('#modal').innerText();
      if(locale==='pt-BR'||locale==='en-US')assert.doesNotMatch(audit.debtForm,/Nombre de la deuda|Fecha de vencimiento|Pago mínimo|Escribe el valor/,'Debt form is immediately localized');
      await page.evaluate(()=>closeM());
      await page.evaluate(()=>customizeHome());
      audit.customizeHome=await page.locator('#modal').innerText();
      assert.doesNotMatch((await page.locator('#modal .row b').allTextContents()).join(' '),/\bhome\b|\bdebts\b|\bexpenses\b|\bmore\b/,'Home customization uses translated labels rather than internal route names');
      await page.evaluate(()=>closeM());
      await fs.writeFile(path.join(root,'browser-results',`${label}-${locale}-copy.json`),JSON.stringify(audit,null,2));
      await navigate('income');
      const heading = await page.locator('#app').innerText();
      assert.ok(heading.includes(locale==='en-US' ? 'My income' : locale==='pt-BR' ? 'Minha renda' : 'Mis ingresos'), `${locale} income is localized`);
    }
    await page.evaluate(() => { s.locale='es-US'; save(); go('home'); });
    for (const locale of ['es-US','en-US','pt-BR']) {
      await page.evaluate(locale => { s.locale=locale; go('more'); }, locale);
      // Observers must settle rather than rewriting the same elements each frame.
      const mutations = await page.evaluate(async () => {
        const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
        for(let i=0;i<4;i++) await frame();
        let count=0;
        const observer=new MutationObserver(records => count+=records.length);
        observer.observe(document.getElementById('app'),{childList:true,subtree:true,attributes:true,characterData:true});
        for(let i=0;i<8;i++) await frame();
        observer.disconnect();return count;
      });
      assert.equal(mutations, 0, 'Idle preferences screen does not continuously rewrite the DOM');
      for(let i=0;i<3;i++) {
        await page.locator('#app button').filter({hasText:/Preferencias de la app|App preferences|Preferências do app/}).click();
        await page.locator('#modal [onclick="closeM()"]').click();
        assert.equal(await page.locator('#modal').evaluate(el => el.classList.contains('hidden')), true);
      }
    }
    await page.evaluate(() => { s.locale='es-US'; go('home'); });
    await page.waitForFunction(()=>!document.documentElement.classList.contains('landing-bright-root'));
    const navigation = page.locator('#nav button');
    assert.equal(await navigation.count(), 5);
    assert.equal(await page.locator('#nav button[aria-current="page"]').count(), 1);
    for (const button of await navigation.all()) {
      assert.ok((await button.boundingBox()).height >= 44, 'Navigation has comfortable touch targets');
    }
    await page.locator('.homeTap51').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => screen), 'debts', 'Debt card works with keyboard');
    await page.locator('#nav [onclick="go(\'home\')"]').click();
    assert.equal(await page.evaluate(() => screen), 'home', 'Navigation returns home');
    assert.equal(await page.locator('#nav [aria-current="page"]').innerText(), '⌂\nInicio');
    for (const button of await page.locator('.homeSetup54 .btn, .linkBtn').all()) {
      assert.ok((await button.boundingBox()).height >= 44, 'Home actions have comfortable touch targets');
    }
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    const lastCard = await page.locator('#app .grid > .card').last().boundingBox();
    const navigationBox = await page.locator('#nav').boundingBox();
    assert.ok(lastCard.y+lastCard.height <= navigationBox.y, 'Bottom navigation leaves the final card accessible');
    await page.evaluate(() => window.scrollTo(0, 0));
    for (const theme of ['light','dark']) {
      await page.evaluate(theme => { localStorage.setItem('ary-theme-v46', theme==='light'?'dark':'light'); aryToggleTheme40(); }, theme);
      assert.equal(await page.locator('html').getAttribute('data-ary-theme'), theme);
      // Wait for theme transitions, so screenshots show the finished theme.
      await page.evaluate(async () => {
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        await Promise.all(document.getAnimations().filter(animation => animation.effect?.getComputedTiming().iterations !== Infinity).map(animation => animation.finished.catch(() => {})));
      });
      await page.waitForFunction(expected => getComputedStyle(document.body).color === expected, theme==='light'?'rgb(17, 24, 39)':'rgb(244, 248, 255)');
      assert.equal(await page.locator('body').evaluate(el => getComputedStyle(el).color), theme==='light'?'rgb(17, 24, 39)':'rgb(244, 248, 255)', 'Theme sets readable foreground');
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
    // A customer with an existing profile can open the complete public cover.
    const portalBefore=await page.evaluate(()=>JSON.parse(localStorage.getItem('arydebts-v3')));
    await page.goto(origin+'/#welcome',{waitUntil:'load'});
    await page.locator('.landing9').waitFor({state:'visible'});
    assert.equal(await page.locator('#nav').innerText(),'');
    assert.equal(await page.evaluate(()=>s.income),portalBefore.income);
    assert.deepEqual(await page.evaluate(()=>s.debts),portalBefore.debts);
    await page.locator('.cta21').click();
    assert.ok(await page.locator('#an').isVisible(),'Cover leads to signup');
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
