const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium, webkit } = require('playwright');
const root = __dirname;
const server = http.createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) return res.writeHead(403).end();
    res.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.html') ? 'text/html' : 'application/octet-stream');
    res.end(await fs.readFile(file));
  } catch { res.writeHead(404).end(); }
});
(async () => {
  let browser;
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]].filter(([name]) => !process.env.ARY_TEST_ENGINE || name === process.env.ARY_TEST_ENGINE)) {
      browser = await engine.launch(process.env.ARY_BROWSER_PATH ? { executablePath: process.env.ARY_BROWSER_PATH } : {});
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('https://**/*', route => route.abort());
      await page.goto('http://127.0.0.1:' + server.address().port);
      await page.waitForFunction(() => !!window.arySignupPremiumIntent215);
      await page.evaluate(() => { s.theme = 'dark'; s.mode = 'immersive'; go('welcome'); go('signup'); });
      assert.equal(await page.locator('html').getAttribute('data-ary-theme'), 'light');
      await page.getByRole('button', { name: '‹ Volver', exact: true }).click();
      assert.deepEqual(await page.evaluate(() => [s.theme, s.mode]), ['dark', 'immersive'], 'Cancel signup restores the previous appearance');
      assert.equal(await page.locator('html').getAttribute('data-ary-theme'), 'dark');
      await page.evaluate(() => go('signup'));
      await page.locator('[data-signup214][data-experience214="complete"]').click();
      await page.evaluate(() => arySetTheme46('light'));
      await page.getByRole('button', { name: '‹ Volver', exact: true }).click();
      assert.equal(await page.locator('html').getAttribute('data-ary-theme'), 'light', 'Cancel retains an explicitly saved appearance preference');
      await page.evaluate(() => {
        profile = { name: 'Navigation audit', email: 'navigation216@example.test', localDemo: true };
        localStorage.setItem(AUTH, JSON.stringify(profile));
        s.onboarded = true; s.experience214 = 'complete'; s.locale = 'es-US'; s.currency = 'USD';
        s.income = 2000; s.incomeFrequency = 'monthly'; s.payments = [];
        s.debts = [{ id: 1, name: 'Audit debt', balance: 300, min: 30, apr: 5 }];
        s.expenses = Array.from({ length: 30 }, (_, i) => ({ id: i + 1, name: 'Expense ' + i, amount: 1, cat: 'Hormiga', date: localDate(), frequency: 'once' }));
        s.guide94 = { version: 203, active: false, completed: true, seen: ['home', 'expenses', 'plan', 'debts', 'investments', 'more'] };
        window.auditSubscription216 = { plan: 'premium', status: 'trialing', amount: 999, currency: 'USD', interval: 'month', validUntil: new Date(Date.now() + 86400000).toISOString() };
        window.aryPremiumService214 = { ready: true, readStatus: async () => ({ ...auditSubscription216, owner: aryGuideLifecycle128.currentUser() }) };
        save(); go('strategy215');
      });
      await page.waitForFunction(() => aryPremiumActive214() && !!document.getElementById('extraPayment215'));
      const finances = await page.evaluate(() => JSON.stringify([s.income, s.debts, s.expenses, s.payments]));
      await page.locator('#extraPayment215').fill('47.25');
      await page.evaluate(() => { window.draftNode216 = document.getElementById('extraPayment215'); go('strategy215'); });
      assert.equal(await page.locator('#extraPayment215').inputValue(), '47.25');
      assert.equal(await page.evaluate(() => draftNode216 === document.getElementById('extraPayment215')), true, 'Repeated route retains the actual field');
      await page.evaluate(() => aryRefreshPremium214());
      assert.equal(await page.locator('#extraPayment215').inputValue(), '47.25', 'Unchanged subscription does not erase a draft');
      assert.equal(await page.evaluate(() => draftNode216 === document.activeElement), true, 'Background subscription refresh retains focus');
      await page.evaluate(async () => { auditSubscription216.status = 'active'; await aryRefreshPremium214(); });
      assert.equal(await page.locator('#extraPayment215').inputValue(), '47.25', 'Trial renewal retains an unfinished draft');
      await page.locator('button[type="submit"]').click();
      assert.equal(await page.locator('#extraPayment215').inputValue(), '47.25');
      await page.evaluate(() => { s.currency = 'COP'; render(); });
      assert.equal(await page.locator('#extraPayment215').inputValue(), '0', 'A changed currency does not reuse a payment amount in another unit');
      await page.locator('#extraPayment215').fill('12000');
      await page.locator('button[type="submit"]').click();
      await page.evaluate(() => { profile = { name: 'Another account', email: 'other-navigation216@example.test', localDemo: true }; render(); });
      await page.waitForFunction(() => aryPremiumActive214() && !!document.getElementById('extraPayment215'));
      assert.equal(await page.locator('#extraPayment215').inputValue(), '0', 'Another account does not inherit the previous payment scenario');
      await page.evaluate(() => { auditSubscription216.validUntil = '2000-01-01'; go('strategy215'); });
      // Read the expired server status, then revisit the same route immediately.
      await page.evaluate(async () => { await aryRefreshPremium214(); go('strategy215'); });
      assert.equal(await page.locator('#extraPayment215').count(), 0, 'Expired access still removes advanced forms');
      await page.evaluate(async () => { auditSubscription216.validUntil = new Date(Date.now() + 86400000).toISOString(); await aryRefreshPremium214(); s.onboarded = false; go('premium214'); });
      assert.equal(await page.getByRole('button', { name: 'Continuar configuración', exact: true }).isEnabled(), true, 'A paid account can finish its setup');
      await page.getByRole('button', { name: 'Continuar configuración', exact: true }).click();
      assert.equal(await page.evaluate(() => screen), 'intro');
      await page.evaluate(() => { s.onboarded = true; arySetExperience214('simple'); go('expenses'); window.scrollTo(0, 600); });
      await page.waitForFunction(() => scrollY >= 590);
      await page.evaluate(() => { window.expenseNode216 = document.querySelector('.simpleRecords215'); });
      await page.locator('#nav button[aria-current="page"]').click();
      await page.waitForTimeout(100);
      assert.ok(await page.evaluate(() => scrollY >= 590), 'Tapping the selected tab does not jump to the top');
      assert.equal(await page.evaluate(() => expenseNode216 === document.querySelector('.simpleRecords215')), true);
      await page.locator('#nav button[onclick="go(\'debts\')"]').click();
      await page.waitForFunction(() => screen === 'debts' && scrollY <= 1);
      await page.evaluate(() => { appNavigation55.length = 0; appNavigation55.push('home', 'not-a-route', 'plan'); back(); });
      assert.equal(await page.evaluate(() => screen), 'more', 'Old Complete history cannot reopen Plan in Simple');
      await page.evaluate(() => back());
      assert.equal(await page.evaluate(() => screen), 'home', 'Back skips an invalid historical route');
      await page.evaluate(() => debtForm());
      await page.locator('#n').fill('Unfinished debt');
      await page.evaluate(() => back());
      assert.equal(await page.evaluate(() => screen), 'home', 'Back closes the modal before navigating');
      assert.equal(await page.locator('#modal').evaluate(el => el.classList.contains('hidden')), true);
      assert.equal(await page.evaluate(() => JSON.stringify([s.income, s.debts, s.expenses, s.payments])), finances);
      assert.deepEqual(errors, []);
      console.log('PASS ' + name + ': stable active tabs and scroll, Premium draft/focus retention, expiry, paid setup, canceled signup appearance, account/currency scenario isolation, historical routes and modal Back.');
      await browser.close(); browser = null;
    }
  } finally { await browser?.close(); server.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
