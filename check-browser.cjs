// Real browser smoke tests. Only synthetic data, served locally; never production.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { chromium, webkit } = require('playwright');

const root = __dirname;
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.jpeg':'image/jpeg', '.webp':'image/webp', '.webmanifest':'application/manifest+json' };
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
    assert.match(await page.locator('#app').innerText(), /ARYDEBTS/i, 'Fresh startup renders');
    assert.equal(await page.evaluate(() => s.income), 0, 'Fresh startup has no invented income');
    await page.locator('.heroPhoto55').evaluate(img=>img.decode());
    assert.ok(await page.locator('.heroPhoto55').evaluate(img=>img.naturalWidth>=1200),'Hero has a high resolution source');
    assert.equal(await page.locator('.heroPhoto55').evaluate(img=>getComputedStyle(img).objectFit),'contain','Original globe and flags are shown without cropping');
    assert.match(await page.locator('.heroPhoto55').getAttribute('src'),/world-retouched/);
    await page.evaluate(()=>document.fonts.ready);
    assert.ok(await page.evaluate(()=>document.fonts.check('700 40px AryCinzel')),'Brand font downloaded');
    assert.ok(await page.evaluate(()=>document.fonts.check('italic 600 31px AryCormorant')),'Distinct tagline font downloaded');
    assert.equal(await page.locator('.brandEcho56').getAttribute('aria-hidden'),'true','Decorative second brand stays out of spoken text');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-typography.png`),fullPage:true});
    assert.equal(await page.locator('.worldCore57').evaluate(el=>getComputedStyle(el).animationName),'worldTurn57','Planet has a gentle turn');
    const turnBefore=await page.locator('.worldCore57').evaluate(el=>getComputedStyle(el).transform);
    await page.waitForFunction(before=>getComputedStyle(document.querySelector('.worldCore57')).transform!==before,turnBefore);
    assert.notEqual(await page.locator('.worldCore57').evaluate(el=>getComputedStyle(el).transform),turnBefore,'Planet moves over time');
    assert.equal(await page.locator('.worldMotion57 animate').count(),2,'Both flag groups have wind motion');
    await page.evaluate(()=>{s.mode='lite';render()});
    assert.equal(await page.locator('.worldMotion57').isVisible(),false,'Lite keeps original artwork still');
    assert.ok(await page.locator('.worldMotion57').evaluate(el=>el.animationsPaused()),'Lite stops SVG animation clocks');
    await page.evaluate(()=>{s.mode='immersive';render()});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForFunction(()=>document.querySelector('.worldMotion57').animationsPaused());
    assert.equal(await page.locator('.worldMotion57').isVisible(),false,'Reduced motion keeps artwork still');
    assert.ok(await page.locator('.worldMotion57').evaluate(el=>el.animationsPaused()),'Reduced motion stops SVG clocks');
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.waitForFunction(()=>!document.querySelector('.worldMotion57').animationsPaused());
    assert.ok(await page.locator('.worldMotion57').isVisible(),'Immersive restores artwork motion');
    assert.equal(await page.locator('.social55 svg').count(),5,'Recognizable vector social logos');
    assert.doesNotMatch(await page.locator('#app').innerText(),/Solution/);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Landing fits viewport');
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
    assert.ok((await page.locator('#app').innerText()).includes('Adicionar mais gastos'),'Existing expenses change add label');
    await page.locator('[onclick^="deleteExpense("]').click();
    assert.equal(await page.evaluate(()=>s.expenses.length),0,'Onboarding expense can be removed');
    await page.locator('[onclick="expenseForm()"]').click();
    await page.locator('#n').fill('Initial groceries');
    await page.locator('#b').fill('250');
    await page.locator('[onclick="saveExpense(null)"]').click();
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
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Initial debt actions fit mobile width');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-initial-debt-v59.png`),fullPage:true});
    await page.locator('[onclick^="deleteDebt("]').click();
    assert.equal(await page.evaluate(()=>s.debts.length),0,'Initial debt can be deleted');
    await page.reload({waitUntil:'load'});
    assert.equal(await page.evaluate(()=>s.debts.length),0,'Deleted initial debt stays deleted');
    await page.locator('[onclick="debtForm()"]').click();
    await page.locator('#n').fill('Initial credit card');
    await page.locator('#b').fill('1000');
    await page.locator('#m').fill('100');
    await page.locator('[onclick="saveDebt(null)"]').click();

    await page.locator('[onclick="go(\'setupExpenses\')"]').click();
    assert.ok((await page.locator('#app').innerText()).includes('Initial groceries'), 'Going back keeps entered expenses');
    await page.locator('[onclick="go(\'setupDebts\')"]').click();
    await page.locator('[onclick="go(\'setupGoal\')"]').click();
    assert.ok((await page.locator('#app').innerText()).includes('Qual é sua meta atual?'));
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
    if(viewport.width>=1000){assert.ok(navigationBox.x+navigationBox.width<=lastCard.x,'Desktop rail does not cover the final card');assert.ok(lastCard.y+lastCard.height<=viewport.height+1,'Final card remains visible at the end of the page')}else assert.ok(lastCard.y+lastCard.height <= navigationBox.y, 'Bottom navigation leaves the final card accessible');
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
    await navigate('more');
    await page.locator('[onclick="go(\'profile\')"]').click();
    await page.locator('[onclick="back()"]').click();
    assert.equal(await page.evaluate(()=>screen),'more','Profile Back returns inside the app');
    await navigate('home');
    assert.equal(await page.locator('#app .back').count(),0,'Account home has no Back button');
    await navigate('more');
    assert.equal(await page.locator('[onclick="logout()"]').count(),1,'More has one separate sign-out control');
    await page.evaluate(()=>aryV18Settings());
    await page.locator('[onclick="arySetMode58(\'lite\')"]').click();
    assert.equal(await page.evaluate(()=>s.mode),'lite');
    assert.equal(await page.locator('[onclick="arySetMode58(\'lite\')"]').getAttribute('aria-pressed'),'true');
    await page.locator('[onclick="arySetMode58(\'immersive\')"]').click();
    await page.locator('#modal [onclick="closeM()"]').click();
    await navigate('debts');await page.evaluate(()=>debtForm());
    await page.locator('.modalBack58').click();
    assert.equal(await page.locator('#modal').isVisible(),false,'Form Back closes form immediately');
    assert.equal(await page.evaluate(()=>screen),'debts','Form Back keeps the underlying page');
    await navigate('assistant');
    await page.locator('#chatinput58').fill('Mis gastos');
    await page.locator('.chatForm58 [type="submit"]').click();
    assert.ok((await page.locator('#chatlog58').innerText()).includes('gastos'));
    assert.equal(await page.locator('.message58').count(),2,'Assistant renders distinct messages without overlap');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Assistant fits viewport');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-assistant-v58.png`),fullPage:true});
    await navigate('expenses');
    await page.locator('.antEntry55').click();
    assert.equal(await page.evaluate(()=>screen),'ants','Expenses includes the original small-expenses screen');
    const antState=await page.evaluate(()=>({expenses:s.expenses,income:s.income,incomeFrequency:s.incomeFrequency,mode:s.mode}));
    await page.evaluate(()=>{s.mode='immersive';s.income=1000;s.incomeFrequency='monthly';s.expenses=[{id:999,name:'Coffee test',amount:200,cat:'Hormiga',date:localDate()}];render()});
    assert.equal(await page.locator('.antFace58').innerText(),'😣','Pig reacts to spending level');
    assert.equal(await page.locator('.pigBody63').evaluate(el=>getComputedStyle(el).animationName),'pigBounce63');
    await page.evaluate(()=>{s.expenses[0].amount=500;render()});
    assert.equal(await page.locator('.antFace58').innerText(),'🤯');
    await page.evaluate(()=>toggleMode());
    assert.equal(await page.locator('.pigBody63').evaluate(el=>getComputedStyle(el).animationName),'none','Lite stops animated icons');
    await page.evaluate(state=>{Object.assign(s,state);save()},antState);
    await navigate('profile');
    await page.locator('.profileAvatar46').waitFor({state:'visible'});
    assert.ok((await page.locator('.profileAvatar46').boundingBox()).width>=88);
    await page.screenshot({path:path.join(root,'browser-results',`${label}-seasonal-v59.png`),fullPage:true});
    await page.evaluate(() => aryProfile46());
    for(const input of await page.locator('#modal input[type="file"]').all())assert.equal(await input.isVisible(),false,'Native file fields remain hidden');
    if(viewport.width<700)assert.equal(await page.locator('#aryName46').evaluate(el=>getComputedStyle(el).fontSize),'16px','Inputs avoid automatic iPhone text zoom');

    await page.waitForFunction(()=>getComputedStyle(document.querySelector('.profileModal54')).opacity==='1');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-profile-editor.png`),fullPage:true});
    const oldViewport=page.viewportSize();
    await page.setViewportSize({width:oldViewport.width,height:600});
    await page.locator('.profileClose59').scrollIntoViewIfNeeded();
    const closeBox=await page.locator('.profileClose59').boundingBox();
    assert.ok(closeBox.y>=0&&closeBox.y+closeBox.height<=568,'Close is fully visible with safe bottom space in a short viewport');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-profile-close-v59.png`),fullPage:true});
    await page.locator('.profileClose59').click();
    assert.equal(await page.locator('#modal').isVisible(),false);
    await page.setViewportSize(oldViewport);
    await page.evaluate(()=>aryProfile46());

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

    await page.locator('#aryBirthdayMonth59').selectOption('2');
    await page.locator('#aryBirthdayDay59').selectOption('31');
    await page.locator('[onclick="arySaveProfile46()"]').click();
    assert.equal(await page.locator('#modal').isVisible(),true,'Invalid birthday does not save');
    await page.locator('#aryBirthdayMonth59').selectOption('10');
    await page.locator('#aryBirthdayDay59').selectOption('8');
    await page.locator('[onclick="arySaveProfile46()"]').click();
    assert.equal(await page.evaluate(()=>profile.birthday),'10-08');
    await page.reload({waitUntil:'load'});
    assert.equal(await page.evaluate(()=>profile.birthday),'10-08','Birthday month/day persists');
    assert.equal(await page.evaluate(()=>arySeason59(new Date(2026,9,8))),'birthday');
    assert.equal(await page.evaluate(()=>arySeason59(new Date(2026,9,9))),'halloween');
    assert.equal(await page.evaluate(()=>arySeason59(new Date(2026,11,25))),'christmas');
    assert.equal(await page.evaluate(()=>arySeason59(new Date(2027,0,1))),'newyear');
    await page.evaluate(()=>{s.mode='immersive';render()});
    assert.equal(await page.locator('.brandLetter59 b').evaluate(el=>getComputedStyle(el).animationName),'brandFlow59');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-brand-v59.png`),fullPage:true});
    await page.evaluate(()=>toggleMode());
    assert.equal(await page.locator('.brandLetter59 b').evaluate(el=>getComputedStyle(el).animationName),'none');
    await page.evaluate(() => closeM());
    // Header cues are based on pending dates, not historical expense dates.
    const reminderBefore60=await page.evaluate(()=>({debts:s.debts,expenses:s.expenses,calendarEvents:s.calendarEvents,payments:s.payments,mode:s.mode}));
    const reminderDate60=await page.evaluate(()=>{const d=new Date();d.setDate(d.getDate()+1);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`});
    await page.evaluate(date=>{s.mode='immersive';s.debts=[{id:6001,name:'Carro',balance:1000,min:100,due:date,icon:'🚗'}];s.payments=[];s.calendarEvents=[{id:6002,name:'Luz',date,kind:'reminder',amount:80},{id:6003,name:'Renta',date,kind:'reminder',amount:1600}];go('home')},reminderDate60);
    assert.equal(await page.locator('.dueBadge60').count(),3);
    assert.deepEqual(await page.locator('.dueBadge60>span').allTextContents(),['🔑','⚡','🏠']);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Reminder badges fit mobile width');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-reminders-v60.png`),fullPage:true});
    await page.locator('[onclick="aryShowDue60(\'power\')"]').click();
    assert.match(await page.locator('#modal').innerText(),/Luz/);
    await page.locator('[onclick^="aryCalendarDate60("]').click();
    assert.equal(await page.evaluate(()=>screen),'calendar');
    assert.ok((await page.locator('.calDetail35').innerText()).includes('Luz'));
    await page.locator('#app [onclick="aryCompleteReminder60(6002,true)"]').click();
    assert.equal(await page.evaluate(()=>s.calendarEvents.find(e=>e.id===6002).completed),true);
    assert.equal(await page.locator('[onclick="aryShowDue60(\'power\')"]').count(),0);
    await page.reload({waitUntil:'load'});
    assert.equal(await page.locator('[onclick="aryShowDue60(\'power\')"]').count(),0,'Completed reminder stays hidden after reload');
    await page.evaluate(date=>aryCalendarDate60(date),reminderDate60);
    await page.locator('#app [onclick="aryCompleteReminder60(6002,false)"]').click();
    assert.equal(await page.locator('[onclick="aryShowDue60(\'power\')"]').count(),1,'Calendar allows undoing reminder completion');
    await page.evaluate(()=>toggleMode());
    assert.equal(await page.locator('.dueBadge60>span').first().evaluate(el=>getComputedStyle(el).animationName),'none');
    await page.evaluate(state=>{Object.assign(s,state);save()},reminderBefore60);
    const beforePersonal61=await page.evaluate(()=>JSON.parse(JSON.stringify(s)));
    await page.evaluate(date=>{s.locale='es-US';s.currency='USD';s.name='Cliente de prueba';profile.birthday='';s.income=2500;s.incomeFrequency='monthly';s.debts=[{id:6101,name:'Carro',balance:1000,min:100,due:date}];s.payments=[];s.expenses=[{id:6102,name:'Mercado',amount:500,date:localDate()},...[1,2,3].map(id=>({id:6102+id,name:'Gym deporte',amount:50,date:localDate()}))];s.calendarEvents=[{id:6107,name:'Luz',date:localDate(),kind:'reminder',amount:80}];s.personalization61={enabled:true,pinned:'',visits:{expenses:{score:5,at:Date.now()}}};save();go('home')},reminderDate60);
    assert.equal(await page.locator('.adaptiveLinks61 button').first().getAttribute('data-route'),'expenses');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Adaptive shortcuts fit mobile');
    assert.equal(await page.evaluate(()=>aryPersonalBudget61().margin),1670);
    assert.equal(await page.evaluate(()=>aryAssessPurchase45(100).after),1570);
    assert.equal(await page.locator('.interest61').count(),1,'Repeated sports expenses offer a purchase analysis with positive margin');
    assert.equal(await page.locator('.homeMetric51[onclick="go(\'plan\')"] .kpi').innerText(),await page.evaluate(()=>money(1670)),'Home margin includes pending calendar reserve');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-polished-home-v62.png`),fullPage:false});
    await page.evaluate(()=>scrollTo(0,350));
    const homeScroll62=await page.evaluate(()=>scrollY);
    await page.locator('#nav [onclick="go(\'plan\')"]').click();
    assert.equal(await page.evaluate(()=>scrollY),0,'New route starts at the top');
    assert.match(await page.locator('#app').innerText(),/Reserva de recordatorios pendientes/);
    assert.ok((await page.locator('#app').innerText()).includes(await page.evaluate(()=>money(1670))),'Plan uses the same reserved margin');
    await page.locator('#app [onclick="back()"]').first().click();
    assert.equal(await page.evaluate(()=>screen),'home');
    assert.ok(Math.abs((await page.evaluate(()=>scrollY))-homeScroll62)<2,'Back restores home scroll');
    await page.evaluate(()=>aryCustomize61());
    await page.keyboard.press('Escape');
    assert.ok(await page.locator('#modal').evaluate(el=>el.classList.contains('hidden')),'Escape closes modal');
    await page.evaluate(()=>{s.calendarEvents[0].completed=true;save()});
    assert.doesNotMatch(await page.locator('#app .list').innerText(),/Luz/,'Completed reminder disappears from upcoming activity');
    await page.evaluate(()=>{s.calendarEvents[0].completed=false;save()});
    await page.locator('.adaptiveLinks61 [data-route="expenses"]').click();
    assert.equal(await page.evaluate(()=>screen),'expenses');
    await page.reload({waitUntil:'load'});
    await navigate('home');
    assert.equal(await page.locator('.adaptiveLinks61 button').first().getAttribute('data-route'),'expenses','Learned order survives reload');
    await page.locator('.adaptiveHeading61 [onclick="aryCustomize61()"]').click();
    await page.locator('#favorite61').selectOption('calendar');
    await page.locator('#modal [onclick="closeM()"]').click();
    assert.equal(await page.locator('.adaptiveLinks61 button').first().getAttribute('data-route'),'calendar');
    await page.locator('.adaptiveHeading61 [onclick="aryCustomize61()"]').click();
    await page.locator('#favorite61').selectOption('');
    await page.locator('[onclick="aryToggleAdaptive61()"]').click();
    await page.locator('#modal [onclick="closeM()"]').click();
    assert.equal(await page.locator('.adaptiveLinks61 button').first().getAttribute('data-route'),'debts','Disabling restores stable default shortcuts');
    await page.evaluate(()=>{s.income=100;save()});
    assert.equal(await page.locator('.interest61').count(),0,'Deficit does not offer purchase suggestions');
    await navigate('notifications');
    assert.doesNotMatch(await page.locator('#app').innerText(),/Completaste una parte de tu plan/);
    await page.evaluate(state=>{Object.assign(s,state);save()},beforePersonal61);
    const beforeRecurring63=await page.evaluate(()=>JSON.parse(JSON.stringify(s)));
    await page.evaluate(()=>{s.locale='es-CO';s.currency='COP';s.income=1000;s.incomeFrequency='monthly';s.expenses=[];s.debts=[];s.calendarEvents=[];s.payments=[];save()});
    await navigate('expenses');
    await page.locator('[onclick="expenseForm()"]').click();
    assert.equal(await page.locator('#expenseFrequency63 option').count(),9);
    await page.locator('#n').fill('Gas mensual');
    await page.locator('#b').fill('200');
    await page.locator('#expenseFrequency63').selectOption('monthly');
    await page.locator('#edate').fill('');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-frequency-v63.png`),fullPage:false});
    await page.locator('[onclick="saveExpense(null)"]').click();
    assert.equal(await page.evaluate(()=>s.expenses[0].frequency),'monthly');
    assert.equal(await page.evaluate(()=>aryRealData54.snapshot().recurringExpenses),200);
    assert.equal(await page.evaluate(()=>aryRealData54.snapshot().actualExpenses),0);
    await page.locator('[onclick^="aryRecordRecurringExpense63("]').click();
    await page.locator('#b').fill('120');
    await page.locator('[onclick="saveExpense(null)"]').click();
    assert.equal(await page.evaluate(()=>aryRealData54.snapshot().actualExpenses),120);
    assert.equal(await page.evaluate(()=>aryRealData54.snapshot().recurringExpenses),80,'Actual linked expense replaces reserve');
    await page.reload({waitUntil:'load'});
    await navigate('expenses');
    assert.equal(await page.evaluate(()=>s.expenses[0].frequency),'monthly','Recurrence survives reload');
    await navigate('income');
    await page.locator('[onclick="aryIncomeForm45()"]').click();
    await page.locator('#inc45').fill('3000');
    await page.locator('#freq45').selectOption('quarterly');
    await page.locator('[onclick="arySaveIncome45()"]').click();
    assert.equal(await page.evaluate(()=>aryRealData54.snapshot().income),1000);
    await navigate('debts');
    await page.locator('[onclick="debtForm()"]').click();
    await page.locator('#n').fill('Deuda semanal');
    await page.locator('#b').fill('1000');
    await page.locator('#m').fill('50');
    await page.locator('#debtFrequency63').selectOption('weekly');
    await page.locator('[onclick="saveDebt(null)"]').click();
    assert.ok(Math.abs((await page.evaluate(()=>aryRealData54.snapshot().registeredMinimums))-50*52/12)<0.001);
    await navigate('calendar');
    await page.locator('[onclick="aryNewCommitment63()"]').click();
    await page.locator('#cevName36').fill('Luz trimestral');
    await page.locator('#cevAmount36').fill('60');
    await page.locator('#eventFrequency63').selectOption('quarterly');
    await page.locator('[onclick="arySaveEvent36(null)"]').click();
    assert.equal(await page.evaluate(()=>aryPersonalBudget61().reserve),20);
    assert.ok((await page.locator('#app').innerText()).includes('Luz trimestral'));
    for(const [locale,value] of [['es-CO','1.800.000'],['en-US','1,800,000'],['pt-BR','1.800.000']]){
      await page.evaluate(loc=>{s.locale=loc;save()},locale);
      await page.evaluate(()=>expenseForm());
      await page.locator('#b').fill('1800000');
      await page.locator('#b').press('Tab');
      assert.equal(await page.locator('#b').inputValue(),value,'Amount field uses language grouping');
      await page.locator('#modal [onclick="closeM()"]').click();
    }
    await page.evaluate(()=>{s.locale='es-CO';s.currency='COP';s.mode='immersive';save()});
    await navigate('ants');
    const pig63=await page.locator('.pigMascot63').boundingBox(),hero63=await page.locator('.antHero25').boundingBox();
    assert.ok(pig63.width>=200,'Full-body pig is larger');
    assert.ok(Math.abs((pig63.x+pig63.width/2)-(hero63.x+hero63.width/2))<3,'Pig is centered in its card');
    assert.notEqual(await page.locator('.pigBody63').evaluate(el=>getComputedStyle(el).animationName),'none');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-pig-v63.png`),fullPage:true});
    await page.evaluate(()=>{s.mode='lite';save()});
    assert.equal(await page.locator('.pigBody63').evaluate(el=>getComputedStyle(el).animationName),'none','Lite pauses pig');
    await page.evaluate(state=>{Object.assign(s,state);save()},beforeRecurring63);
    await navigate('home');
    const settings64=page.locator('.headerActions64 .settings64'),bell64=page.locator('.headerActions64 .bell');
    assert.ok(await settings64.isVisible(),'Header has a direct settings gear');
    const gearBox64=await settings64.boundingBox(),bellBox64=await bell64.boundingBox();
    assert.ok(gearBox64.x+gearBox64.width<=bellBox64.x,'Settings gear sits beside the bell');
    assert.ok(gearBox64.width>=42&&gearBox64.height>=44,'Header controls have usable targets');
    await settings64.click();
    assert.ok(await page.locator('#modal .experience58').isVisible(),'Gear opens complete app preferences');
    await page.locator('#modal [onclick="closeM()"]').click();
    if(viewport.width>=1000){
      const nav64=await page.locator('#nav').boundingBox(),app64=await page.locator('#app').boundingBox();
      assert.ok(app64.width>700,'Desktop content uses available width');
      assert.ok(nav64.x+nav64.width<app64.x,'Persistent rail is separate from the content');
      assert.ok(nav64.y>=0&&nav64.y+nav64.height<=viewport.height,'All primary navigation fits the screen');
      await page.locator('#nav [onclick="go(\'expenses\')"]').click();
      assert.equal(await page.evaluate(()=>screen),'expenses');
      await page.evaluate(()=>scrollTo(0,500));
      await page.locator('#nav [onclick="go(\'home\')"]').click();
      assert.equal(await page.evaluate(()=>screen),'home','Sidebar returns directly to Home');
      assert.equal(await page.evaluate(()=>scrollY),0);
      assert.equal(await page.locator('#nav .active').getAttribute('aria-current'),'page');
    }else{
      const nav64=await page.locator('#nav').boundingBox();
      assert.ok(nav64.y>viewport.height/2,'Mobile keeps bottom navigation');
    }
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Responsive header and navigation fit the viewport');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-navigation-v64.png`),fullPage:false});
    // A customer with an existing profile can open the complete public cover.
    const portalBefore=await page.evaluate(()=>JSON.parse(localStorage.getItem('arydebts-v3')));
    await page.goto(origin+'/#welcome',{waitUntil:'load'});
    await page.locator('.landing9').waitFor({state:'visible'});
    assert.equal(await page.locator('#nav').innerText(),'');
    assert.equal(await page.locator('body.signed64').count(),0,'Public landing keeps its full layout');
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
