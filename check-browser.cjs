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
    assert.equal(await page.locator('.worldCore57').evaluate(el=>getComputedStyle(el).animationDuration),'7s');
    // Light mode reveals the seasonal artwork through the cover, across regions.
    await page.evaluate(()=>{window._seasonTest73=aryBackdropSeason71;arySetTheme46('light')});
    for(const season of ['halloween','christmas','newyear','birthday','usa','colombia','brazil']){
      await page.evaluate(season=>{window.aryBackdropSeason71=()=>season;aryUpdateBackdrop71()},season);
      assert.equal(await page.locator('body').getAttribute('data-season71'),season);
      assert.equal(await page.locator('.seasonArt71').count(),4);
      assert.equal(await page.locator('.landing55').evaluate(el=>getComputedStyle(el).backgroundColor),'rgba(0, 0, 0, 0)','The cover cannot hide the seasonal scene behind a white rectangle');
      assert.equal(await page.locator('.seasonBackdrop71').evaluate(el=>getComputedStyle(el).opacity),'1');
      assert.ok(await page.locator('.seasonArt71').first().isVisible());
      if(season==='halloween'||season==='christmas'&&viewport.width>1000){
        await page.evaluate(()=>Promise.all(document.getAnimations().filter(a=>{const timing=a.effect.getComputedTiming();return timing.iterations!==Infinity}).map(a=>a.finished.catch(()=>{}))));
        await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
        await page.screenshot({path:path.join(root,'browser-results',`${label}-light-${season}-v73.png`),fullPage:true});
      }
    }
    await page.evaluate(()=>{window.aryBackdropSeason71=window._seasonTest73;arySetTheme46('dark');aryUpdateBackdrop71()});
    const turnBefore=await page.locator('.worldCore57').evaluate(el=>getComputedStyle(el).transform);
    await page.waitForFunction(before=>getComputedStyle(document.querySelector('.worldCore57')).transform!==before,turnBefore);
    assert.notEqual(await page.locator('.worldCore57').evaluate(el=>getComputedStyle(el).transform),turnBefore,'Planet moves over time');
    assert.equal(await page.locator('.worldMotion57 animate').count(),1,'A soft breeze animates only the flag fabric');
    assert.equal(await page.locator('.worldMotion57 image').count(),2,'Planet and flag movement have separate masks');
    assert.equal(await page.locator('#clothBreeze72 feDisplacementMap').getAttribute('scale'),'5','Breeze stays local to the flag masks');
    assert.equal(await page.locator('.heroPhoto55').evaluate(el=>getComputedStyle(el).opacity),'1','Original sky stays visible and still');
    await page.locator('.coverMotion80').click();
    assert.equal(await page.locator('.worldMotion57').isVisible(),false,'Lite keeps original artwork still');
    assert.ok(await page.locator('.worldMotion57').evaluate(el=>el.animationsPaused()),'Lite stops SVG animation clocks');
    await page.locator('.coverMotion80').click();
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForFunction(()=>document.querySelector('.worldMotion57').animationsPaused());
    assert.equal(await page.locator('.worldMotion57').isVisible(),false,'Reduced motion keeps artwork still');
    assert.ok(await page.locator('.worldMotion57').evaluate(el=>el.animationsPaused()),'Reduced motion stops SVG clocks');
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.waitForFunction(()=>!document.querySelector('.worldMotion57').animationsPaused());
    assert.ok(await page.locator('.worldMotion57').isVisible(),'Immersive restores artwork motion');
    assert.equal(await page.locator('.motivation72 p').count(),2,'Landing shows only the two weekly thoughts');
    for(const provider of ['Google','Facebook','Instagram','Discord','Apple']){
      await page.locator('.social55 button').filter({has:page.locator('.social'+provider+'55')}).click();
      assert.ok(await page.locator('#modal h2').innerText().then(text=>text.includes(provider)));
      assert.match(await page.locator('#modal').innerText(),/aún no está conectado/,'Missing OAuth configuration is explicit');
      await page.locator('#modal [onclick="closeM()"]').click();
    }
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
    await navigate('more');
    await page.locator('.menuItem[onclick="go(\'profile\')"]').click();
    await page.locator('[onclick="back()"]').click();
    assert.equal(await page.evaluate(()=>screen),'more','Profile Back returns inside the app');
    await navigate('home');
    assert.equal(await page.locator('#app .back').count(),0,'Account home has no Back button');
    await navigate('more');
    assert.equal(await page.locator('#app [onclick="logout()"]').count(),1,'More has one separate sign-out control');
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
    assert.equal(await page.locator('.antAlert70').evaluate(el=>getComputedStyle(el).animationName),'moodPulse70');assert.equal(await page.locator('.pigMascot63').count(),0,'High spending replaces the pig');
    await page.evaluate(()=>{s.expenses[0].amount=500;render()});
    assert.equal(await page.locator('.antFace58').innerText(),'🤯');
    await page.evaluate(()=>toggleMode());
    assert.equal(await page.locator('.antAlert70').evaluate(el=>getComputedStyle(el).animationName),'none','Lite stops animated icons');
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
    await page.locator('#selfNote72').fill('One step at a time');
    await page.locator('[onclick="arySaveNote72()"]').click();
    assert.equal(await page.locator('#modal').isVisible(),true,'Saving a note keeps the profile open');
    assert.equal(await page.locator('#aryName46').inputValue(),'Draft stays');
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
    await page.locator('#modal [onclick^="aryCalendarDate60("]').click();
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
    assert.equal(await page.locator('.homeSetup54').count(),0,'Completed onboarding removes the setup banner');
    await page.evaluate(()=>languageMenu());
    const languageButtons78=page.locator('#modal [onclick^="setLocale"]');
    assert.equal(await languageButtons78.count(),3);
    assert.deepEqual(await languageButtons78.allTextContents(),['🌐 Español','🇺🇸 English','🇧🇷 Português']);
    await page.locator('#modal [onclick="closeM()"]').click();

    await page.evaluate(()=>{s.mode='immersive';window.originalSeason77=aryBackdropSeason71;window.aryBackdropSeason71=()=> 'halloween';render()});
    assert.ok(await page.locator('.hello .greetingScene77 svg').isVisible());
    assert.equal(await page.locator('.greetingBat77').evaluate(el=>getComputedStyle(el).animationName),'greetingFlight77');
    const values78=await page.locator('.homeMetric51 .kpi').allTextContents();
    const tide78=await page.locator('.homeMetric51').first().evaluate(el=>getComputedStyle(el,'::before').transform);
    await page.waitForFunction(before=>getComputedStyle(document.querySelector('.homeMetric51'),'::before').transform!==before,tide78);
    assert.deepEqual(await page.locator('.homeMetric51 .kpi').allTextContents(),values78,'Card motion leaves values unchanged');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-card-waves-v78.png`),fullPage:true});

    const batBefore77=await page.locator('.greetingBat77').evaluate(el=>getComputedStyle(el).transform);
    await page.waitForFunction(before=>getComputedStyle(document.querySelector('.greetingBat77')).transform!==before,batBefore77);
    await page.screenshot({path:path.join(root,'browser-results',`${label}-greeting-dark-v77.png`),fullPage:false});
    await page.evaluate(()=>arySetTheme46('light'));
    await page.screenshot({path:path.join(root,'browser-results',`${label}-greeting-light-v77.png`),fullPage:false});
    await page.evaluate(()=>{s.mode='lite';render()});
    assert.equal(await page.locator('.greetingBat77').evaluate(el=>getComputedStyle(el).animationName),'none');
    assert.equal(await page.locator('.homeMetric51').first().evaluate(el=>getComputedStyle(el,'::before').animationName),'none');
    await page.evaluate(()=>{s.mode='immersive';render()});
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.locator('.greetingBat77').evaluate(el=>getComputedStyle(el).animationName),'none');
    assert.equal(await page.locator('.homeMetric51').first().evaluate(el=>getComputedStyle(el,'::before').animationName),'none');
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.evaluate(()=>{window.aryBackdropSeason71=window.originalSeason77;delete window.originalSeason77;arySetTheme46('dark');render()});
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
    const {pig63,hero63}=await page.evaluate(()=>{const box=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return{x:r.x,width:r.width}};return{pig63:box('.pigMascot63'),hero63:box('.antHero25')}});
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
      assert.ok(nav64.y>viewport.height/2,'Desktop has the same bottom tabs as mobile');
      assert.ok(nav64.y>=0&&nav64.y+nav64.height<=viewport.height,'All primary navigation fits the screen');
      await page.locator('#nav [onclick="go(\'expenses\')"]').click();
      assert.equal(await page.evaluate(()=>screen),'expenses');
      await page.evaluate(()=>scrollTo(0,500));
      await page.locator('#nav [onclick="go(\'home\')"]').click();
      assert.equal(await page.evaluate(()=>screen),'home','Bottom tabs return directly to Home');
      assert.equal(await page.evaluate(()=>scrollY),0);
      assert.equal(await page.locator('#nav .active').getAttribute('aria-current'),'page');
    }else{
      const nav64=await page.locator('#nav').boundingBox();
      assert.ok(nav64.y>viewport.height/2,'Mobile keeps bottom navigation');
    }
    const orderBefore65=await page.evaluate(()=>[...s.navOrder]);
    await page.evaluate(()=>{s.navOrder=['home','plan','home','unknown','more'];save()});
    assert.equal(await page.locator('#nav button').count(),5,'Repair incomplete or duplicate saved navigation');
    for(const route of ['home','debts','expenses','plan','more']){
      const button=page.locator(`#nav [onclick="go('${route}')"]`),box=await button.boundingBox();
      assert.ok(box.x>=0&&box.x+box.width<=viewport.width+1&&box.y>=0&&box.y+box.height<=viewport.height,'Every tab is fully visible');
      await button.click();assert.equal(await page.evaluate(()=>screen),route,`Tab opens ${route}`);
    }
    await page.evaluate(order=>{s.navOrder=order;save();go('home')},orderBefore65);
    await page.evaluate(()=>{s.mode='immersive';save()});
    if(viewport.width>=1000){assert.equal(await page.locator('.waves65').evaluate(el=>getComputedStyle(el).display),'block');assert.equal(await page.locator('.waves65').evaluate(el=>getComputedStyle(el,'::before').animationName),'colorWave65');}
    await page.locator('.settings64').click();
    assert.ok(await page.locator('.signoutWave65').isVisible(),'Preferences include a separate red sign-out control');
    assert.equal(await page.locator('.signoutWave65').evaluate(el=>getComputedStyle(el,'::before').animationName),'signoutRipple65');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-preferences-v65.png`),fullPage:false});
    await page.locator('#modal [onclick="closeM()"]').click();
    await page.evaluate(()=>{s.mode='lite';save()});
    await page.locator('.settings64').click();
    assert.equal(await page.locator('.signoutWave65').evaluate(el=>getComputedStyle(el,'::before').animationName),'none');
    if(viewport.width>=1000)assert.equal(await page.locator('.waves65').evaluate(el=>getComputedStyle(el,'::before').animationName),'none');
    const sessionBefore65=await page.evaluate(()=>({profile:JSON.parse(JSON.stringify(profile)),finances:localStorage.getItem(KEY)}));
    await page.locator('.signoutWave65').click();
    assert.equal(await page.evaluate(()=>screen),'welcome');
    assert.equal(await page.locator('#nav button').count(),0,'Sign-out hides account navigation');
    assert.equal(await page.evaluate(()=>localStorage.getItem(KEY)),sessionBefore65.finances,'Sign-out preserves financial records');
    await page.evaluate(previous=>{profile=previous.profile;safeSet(AUTH,JSON.stringify(profile));go('home')},sessionBefore65);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Responsive header and navigation fit the viewport');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-navigation-v65.png`),fullPage:false});
    await navigate('home');await page.locator('.brandProfile70').click();assert.equal(await page.evaluate(()=>screen),'profile','Brand opens the profile');
    assert.equal(await page.locator('.seasonBackdrop71').count(),1,'One seasonal backdrop across rerenders');
    assert.equal(await page.locator('.seasonBackdrop71').getAttribute('aria-hidden'),'true');
    assert.equal(await page.locator('.seasonBackdrop71').evaluate(el=>getComputedStyle(el).pointerEvents),'none','Decoration never blocks controls');
    const seasonState71=await page.evaluate(()=>({mode:s.mode,theme:document.documentElement.dataset.aryTheme}));
    await page.evaluate(()=>{s.mode='immersive';arySetTheme46('dark');save()});
    const artCount71=await page.locator('.seasonArt71').count();assert.equal(artCount71,await page.evaluate(()=>aryBackdropSeason71()==='everyday'?0:4));
    assert.equal(await page.locator('.seasonGlow71').evaluate(el=>getComputedStyle(el).animationName),'seasonAurora71');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-season-v71.png`),fullPage:false});
    await page.evaluate(()=>{arySetTheme46('light');save()});
    assert.equal(await page.locator('html').getAttribute('data-ary-theme'),'light');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-season-light-v71.png`),fullPage:false});
    await page.evaluate(()=>{s.mode='lite';save()});
    assert.equal(await page.locator('.seasonGlow71').evaluate(el=>getComputedStyle(el).animationName),'none');
    await page.evaluate(previous=>{Object.assign(s,previous);arySetTheme46(previous.theme);save()},seasonState71);
    const state70=await page.evaluate(()=>JSON.parse(JSON.stringify(s)));
    await page.evaluate(()=>{s.locale='es-US';s.currency='USD';s.income=1000;s.incomeFrequency='monthly';s.debts=[{id:7001,name:'Afirm',balance:700,min:58.3,due:'2027-01-07',apr:0}];s.expenses=[];s.payments=[];s.calendarEvents=[];save();go('home')});
    await page.locator('.upcoming70').click();
    assert.equal(await page.evaluate(()=>screen),'calendar');
    assert.ok((await page.locator('.calDetail35').innerText()).includes('Afirm'),'Upcoming payment opens its selected calendar date');
    assert.equal(await page.locator('.calDay35.selected').count(),1);
    await page.evaluate(()=>debtForm(7001));await page.locator('#n').fill('Afirm draft');
    await page.locator('#debtCurrency70').selectOption('EUR');
    assert.equal(await page.locator('#n').inputValue(),'Afirm draft','Changing currency preserves the debt form');
    assert.equal(await page.locator('#greet').count(),0);assert.equal(await page.locator('#loc').count(),0);
    assert.equal(await page.evaluate(()=>s.currency),'EUR');
    await page.locator('#modal [onclick="closeM()"]').click();
    await navigate('ants');assert.ok(await page.locator('.pigMascot63').isVisible(),'Low spending keeps the pig');
    await page.evaluate(()=>{s.expenses=[{id:7002,name:'Coffee',cat:'Hormiga',amount:20,frequency:'daily'}];save()});
    assert.equal(await page.locator('.antAlert70').innerText(),'🤯','High recurring spending changes the main mood');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-mood-v70.png`),fullPage:false});
    await page.evaluate(()=>{s.currency='USD';s.expenses=[];save();go('buy')});
    await page.locator('#buyPrice').fill('2000');await page.locator('[onclick="aryCheckBuy45()"]').click();
    assert.ok(await page.locator('.purchaseLimit70').isVisible());
    assert.equal(await page.locator('#buyResult details').getAttribute('open'),null);
    await page.locator('#buyResult details summary').click();assert.ok((await page.locator('#buyResult details').innerText()).includes('saldo bancario'));
    await page.locator('#buyResult details summary').click();
    await page.screenshot({path:path.join(root,'browser-results',`${label}-buy-v70.png`),fullPage:false});
    for(const [locale70,card70,car70] of [['en-US','Credit card','Car'],['pt-BR','Cartão de crédito','Carro'],['es-US','Tarjeta de crédito','Carro']]){
      await page.evaluate(locale=>{s.locale=locale;s.debts=[{id:7003,name:'Tarjeta de crédito',balance:100,min:10,apr:10},{id:7004,name:'Carro',balance:100,min:10,apr:10}];save();go('debts')},locale70);
      const names70=await page.locator('.row strong').allTextContents();
      assert.ok(names70.includes(card70)&&names70.includes(car70),'Common debt labels follow the selected language');
      assert.equal(await page.evaluate(()=>s.debts[0].name),'Tarjeta de crédito','Display translation preserves stored name');
    }
    await page.evaluate(previous=>{Object.assign(s,previous);save();go('home')},state70);
    const before68=await page.evaluate(()=>JSON.parse(JSON.stringify(s)));
    await page.evaluate(()=>{s.locale='es-US';s.currency='USD';s.income=1000;s.incomeFrequency='monthly';s.calendarEvents=[{id:6801,name:'holis',note:'holis',amount:111,kind:'income',date:localDate(),icon:'🟢'}];s.expenses=[{id:6802,name:'Renta',amount:1600,frequency:'monthly',cat:'Hormiga'},{id:6803,name:'Celulares',amount:300,frequency:'monthly',cat:'Variable'},{id:6804,name:'Energizantes',amount:8,frequency:'daily',cat:'Hormiga'}];s.debts=[{id:6805,name:'Tarjeta',balance:100,min:10,apr:0}];s.payments=[];delete s.dismissedAPR68;save();aryCalendarDate60(localDate())});
    await page.locator('[onclick="aryDeleteEvent36(6801)"]').click();
    assert.ok(await page.locator('#modal').isVisible(),'Calendar X opens a visible in-app confirmation');
    await page.locator('[onclick="aryDeleteConfirmed68(\'event\',6801)"]').click();
    assert.equal(await page.evaluate(()=>s.calendarEvents.length),0,'Holis actually disappears');
    await page.reload();assert.equal(await page.evaluate(()=>s.calendarEvents.length),0);
    await navigate('ants');
    assert.ok((await page.locator('.recurringAnts68').innerText()).includes('Energizantes'),'Onboarding recurring ants remain visible');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-ants-v68.png`),fullPage:true});
    await navigate('plan');
    const cuts68=await page.locator('.expenseCuts68 .list').innerText();
    assert.ok(cuts68.includes('Energizantes'));assert.ok(!cuts68.includes('Renta')&&!cuts68.includes('Celulares'),'Suggestions protect essentials even if miscategorized');
    await page.locator('.aprNotice68').waitFor({state:'hidden',timeout:10000});
    await page.evaluate(()=>render());assert.equal(await page.locator('.aprNotice68').count(),0,'APR notice stays dismissed after render');
    await navigate('home');assert.equal(await page.locator('.homeMetric51 small').filter({hasText:'›'}).count(),0);
    await page.evaluate(()=>{s.mode='immersive';save()});
    assert.equal(await page.locator('.palette68 span').first().evaluate(el=>getComputedStyle(el).animationName),'paletteCycle68');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-colors-v68.png`),fullPage:false});
    await page.evaluate(()=>{s.mode='lite';save()});assert.equal(await page.locator('.palette68 span').first().evaluate(el=>getComputedStyle(el).animationName),'none');
    await page.evaluate(previous=>{Object.assign(s,previous);save();go('home')},before68);
    const localeBefore67=await page.evaluate(()=>s.locale);
    for(const locale67 of ['es-US','en-US','es-CO','es-ES','pt-BR']){
      await page.evaluate(locale=>{s.locale=locale;expenseForm()},locale67);
      const amount67=page.locator('#b'),formatted67=new Intl.NumberFormat(locale67,{useGrouping:true}).format(2000000),small67=new Intl.NumberFormat(locale67,{useGrouping:true}).format(2000);
      await amount67.fill("2'000.000");
      assert.equal(await amount67.inputValue(),formatted67,'Apostrophe grouping corrects without leaving the field');
      await amount67.evaluate(el=>el.setSelectionRange(el.value.length-3,el.value.length));
      await amount67.press('Backspace');
      assert.equal(await amount67.inputValue(),small67,'Deleting the final three zeros updates grouping immediately');
      await amount67.fill('');await amount67.pressSequentially('2000000');
      assert.equal(await amount67.inputValue(),formatted67,'Grouping updates digit by digit');
      for(let i=0;i<3;i++)await amount67.press('Backspace');
      assert.equal(await amount67.inputValue(),small67);
      const decimal67=new Intl.NumberFormat(locale67).formatToParts(1.1).find(p=>p.type==='decimal').value;
      await amount67.pressSequentially(decimal67+'05');
      assert.equal(await amount67.inputValue(),small67+decimal67+'05','Decimals remain editable');
      await amount67.fill('123456');await amount67.evaluate(el=>el.setSelectionRange(4,4));await amount67.press('Backspace');
      assert.equal(await amount67.inputValue(),new Intl.NumberFormat(locale67).format(12456),'Backspace on grouping separator deletes the adjacent digit');
      await amount67.pressSequentially('9');
      assert.equal(await amount67.inputValue(),new Intl.NumberFormat(locale67).format(129456),'Cursor stays at the edited position');
      await amount67.fill('');assert.equal(await amount67.inputValue(),'');
      await page.locator('#modal [onclick="closeM()"]').click();
    }
    await page.evaluate(locale=>{s.locale=locale;go('expenses')},localeBefore67);
    assert.equal(await page.locator('#app .fab').count(),0,'Expenses has no stray plus control');
    assert.ok(await page.locator('.addExpense67').isVisible(),'Adding expenses remains available with a clear label');
    const before66=await page.evaluate(()=>JSON.parse(JSON.stringify(s)));
    await page.evaluate(()=>{s.locale='es-US';s.currency='USD';s.income=1000;s.incomeFrequency='monthly';s.expenses=[];s.debts=[];s.payments=[];s.calendarEvents=[];save();go('expenses')});
    await page.locator('.addExpense67').click();
    await page.locator('.debtChoice66 button').click();
    await page.locator('#n').fill('Tarjeta de prueba');
    await page.getByLabel('Saldo total pendiente',{exact:true}).fill('1000');
    await page.getByLabel('Monto a pagar por periodo',{exact:true}).fill('76');
    await page.locator('#debtFrequency63').selectOption('monthly');
    await page.locator('#due').fill(await page.evaluate(()=>localDate()));
    await page.locator('#modal [onclick="saveDebt(null)"]').click();
    assert.equal(await page.evaluate(()=>s.debts.length),1);
    assert.equal(await page.evaluate(()=>s.expenses.length),0,'Debt payment is not duplicated as an expense');
    assert.equal(await page.evaluate(()=>aryRealData54.snapshot().availableAfterMinimums),924);
    const debt66=await page.evaluate(()=>s.debts[0].id);
    assert.ok((await page.locator('.debtExpenses66').innerText()).includes('$76.00'));
    assert.ok((await page.locator('.debtExpenses66').innerText()).includes('$1,000.00'));
    const iconSize66=await page.locator('.debtExpenses66 .ico').evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
    assert.ok(iconSize66>=36,'Debt and expense row icons fill their tiles');
    await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));
    const lastAction66=await page.locator('.debtExpenses66 .dangerBtn').boundingBox(),dock66=await page.locator('#nav').boundingBox();
    assert.ok(lastAction66.y+lastAction66.height<dock66.y,'Debt payment actions can scroll clear of the bottom dock');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-debt-expenses-v66.png`),fullPage:true});
    await page.locator('.debtExpenses66 [onclick^="aryDebtPayment54"]').click();
    await page.locator('#payAmount54').fill('76');
    await page.locator('#modal [onclick="arySavePayment54()"]').click();
    assert.equal(await page.evaluate(()=>s.debts[0].balance),924,'Only a recorded payment reduces the outstanding balance');
    assert.equal(await page.evaluate(()=>s.payments.length),1);
    assert.equal(await page.evaluate(()=>aryRealData54.snapshot().availableAfterMinimums),924,'Recorded minimum replaces reserve once');
    await page.locator('.debtExpenses66 [onclick^="debtForm("]').last().click();
    assert.equal(await page.locator('#b').evaluate(el=>parseNum(el.value)),924);
    assert.equal(await page.locator('#debtFrequency63').inputValue(),'monthly');
    await page.screenshot({path:path.join(root,'browser-results',`${label}-debt-form-v66.png`),fullPage:true});
    await page.locator('#modal [onclick="closeM()"]').click();
    await page.reload();
    assert.equal(await page.evaluate(()=>s.debts.find(d=>d.id===s.debts[0].id).balance),924,'Debt balance persists');
    await page.evaluate(previous=>{Object.assign(s,previous);save();go('home')},before66);
    // Quote controls must not bubble into a legacy card navigation handler.
    await navigate('home');
    const quoteBefore74=await page.locator('.homeCoach29>b').innerText();
    await page.locator('[data-quote-action="next"]').click();
    assert.equal(await page.evaluate(()=>screen),'home');
    assert.notEqual(await page.locator('.homeCoach29>b').innerText(),quoteBefore74);
    await page.locator('[data-quote-action="next"]').press('Enter');
    assert.equal(await page.evaluate(()=>screen),'home');
    await page.locator('[data-quote-action="favorite"]').click();
    assert.equal(await page.evaluate(()=>screen),'home');
    assert.equal(await page.locator('[data-quote-action="favorite"]').getAttribute('aria-pressed'),'true');
    const chosen74=await page.locator('.homeCoach29>b').innerText();
    await page.reload();assert.equal(await page.locator('.homeCoach29>b').innerText(),chosen74,'Favorite survives reload');
    // V72 privacy and accessibility, exercised with synthetic records only.
    await page.evaluate(()=>{s.debts=[{id:7201,name:'Préstamo Árbol',balance:900,min:30}];s.payments=[{id:7202,amount:100,debtId:7201,date:localDate()}];go('home')});
    assert.equal(await page.locator('.progressRing72 span').innerText(),'10%');
    assert.ok(await page.locator('.privacy72').isVisible());
    const financial72=await page.evaluate(()=>JSON.stringify([s.income,s.debts,s.expenses,s.payments]));
    await page.locator('.privacy72').click();
    assert.equal(await page.locator('.progressRing72 span').innerText(),'••••');
    for(const route of ['home','debts','expenses','plan','progress']){await navigate(route);assert.doesNotMatch(await page.locator('#app').innerText(),/\$\s*[\d,]+/,'Financial amounts stay hidden on '+route)}
    await page.reload();assert.equal(await page.evaluate(()=>aryHidden72()),true);
    await page.evaluate(()=>debtForm(7201));
    assert.equal(await page.locator('#b').getAttribute('type'),'password');
    assert.equal(await page.locator('#b').isDisabled(),true);
    const draft72=await page.locator('#b').inputValue();
    await page.evaluate(()=>aryTogglePrivacy72());
    assert.equal(await page.locator('#b').inputValue(),draft72);
    assert.equal(await page.locator('#b').isDisabled(),false);
    await page.evaluate(()=>closeM());
    assert.equal(await page.evaluate(()=>JSON.stringify([s.income,s.debts,s.expenses,s.payments])),financial72);
    await page.evaluate(()=>arySearch72());await page.locator('#searchQuery72').fill('arbol');await page.locator('.searchResult72').click();
    assert.ok(await page.locator('#b').isVisible(),'Search opens the matching debt');await page.evaluate(()=>closeM());
    await page.evaluate(()=>aryAppearance72());
    await page.locator('#palette72').focus();
    await page.locator('#palette72').selectOption('violet');
    assert.equal(await page.evaluate(()=>document.activeElement.id),'palette72','Changing style preserves keyboard focus');
    await page.locator('[onclick="aryResetUI72()"]').click();
    assert.equal(await page.locator('#palette72').inputValue(),'season');
    await page.evaluate(()=>closeM());
    await page.evaluate(()=>{arySetUI72('size',1.3);arySetUI72('palette','ocean');arySetUI72('brand','amber');arySetUI72('contrast','true');go('more')});
    assert.equal(await page.locator('body').getAttribute('data-palette72'),'ocean');assert.ok(await page.locator('body').evaluate(el=>el.classList.contains('highContrast72')));
    assert.ok(await page.locator('.communityLink72').last().isVisible());
    await page.screenshot({path:path.join(root,'browser-results',`${label}-workspace-v72.png`),fullPage:true});
    await navigate('feedback');
    await page.locator('#feedbackText72').fill('Preserve this draft');
    await page.evaluate(()=>{window.originalStorage76=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new DOMException('Full','QuotaExceededError')}});
    try{
      await page.locator('[onclick="arySaveFeedback72()"]').click();
      assert.equal(await page.locator('#feedbackText72').inputValue(),'Preserve this draft');
      assert.match(await page.locator('#toast').innerText(),/No se pudo guardar|Could not save|Não foi possível salvar/);
      assert.equal(await page.locator('.feedbackCard72').count(),0);
    }finally{await page.evaluate(()=>{Storage.prototype.setItem=window.originalStorage76;delete window.originalStorage76})}
    await page.locator('#feedbackText72').fill('A clear app <thanks>');await page.locator('[onclick="arySaveFeedback72()"]').click();
    assert.match(await page.locator('.feedbackCard72').innerText(),/A clear app <thanks>/);
    await page.evaluate(()=>{arySetUI72('size',1);arySetUI72('contrast','false');arySetUI72('palette','season');arySetUI72('brand','season');go('home')});
    await page.screenshot({path:path.join(root,'browser-results',`${label}-progress-v72.png`),fullPage:true});
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

    // Local profile motion must not control the signed-out public cover.
    const profile80=await page.evaluate(()=>JSON.parse(JSON.stringify(profile)));
    await page.evaluate(()=>{s.mode='lite';save();logout()});
    assert.equal(await page.locator('.coverMotion80').getAttribute('aria-checked'),'true');
    assert.ok(await page.locator('.worldMotion57').isVisible());
    await page.locator('.coverMotion80').click();
    assert.equal(await page.locator('.coverMotion80').getAttribute('aria-checked'),'false');
    await page.reload();
    assert.equal(await page.locator('.coverMotion80').getAttribute('aria-checked'),'false');
    await page.locator('.coverMotion80').click();
    await page.evaluate(p=>{profile=p;go('home')},profile80);
    assert.equal(await page.evaluate(()=>s.mode),'lite');
    if(viewport.width<700){
      const audit80=[];
      for(const width of [320,390,430,768]){
        await page.setViewportSize({width,height:844});
        for(const locale of ['es-US','en-US','pt-BR'])for(const route of ['home','debts','expenses','plan','more']){
          await page.evaluate(({locale,route})=>{s.locale=locale;go(route)}, {locale,route});
          const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,nav:[...document.querySelectorAll('#nav button')].map(b=>({width:b.getBoundingClientRect().width,height:b.getBoundingClientRect().height}))}));
          assert.ok(result.overflow<=1,`No horizontal overflow: ${width}, ${locale}, ${route}`);
          assert.equal(result.nav.length,5);
          for(const target of result.nav)assert.ok(target.width>=44&&target.height>=44,'Bottom navigation has usable touch targets');
          audit80.push({width,locale,route,...result});
        }
      }
      await fs.writeFile(path.join(root,'browser-results',`${label}-mobile-audit-v80.json`),JSON.stringify(audit80,null,2));
      await page.setViewportSize(viewport);
      await page.evaluate(()=>{s.locale='es-US';s.mode='immersive';go('home')});
      await page.screenshot({path:path.join(root,'browser-results',`${label}-mobile-home-v80.png`),fullPage:false});
      await page.evaluate(()=>go('welcome'));
      await page.screenshot({path:path.join(root,'browser-results',`${label}-cover-switch-v80.png`),fullPage:false});
    }
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
