const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  page.on('pageerror', (err) => console.log('PAGEERROR:' + err.message));
  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error' || /error|failed|warn/i.test(text)) {
      console.log('CONSOLE:' + type + ':' + text);
    }
  });
  page.on('requestfailed', (req) => {
    console.log('REQUESTFAILED:' + req.url() + ' ' + (req.failure() && req.failure().errorText || ''));
  });
  page.on('response', (res) => {
    if (res.status() >= 400) {
      console.log('HTTP:' + res.status() + ':' + res.url());
    }
  });

  await page.goto('http://localhost:8000/frontend/pages/index.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(1200);

  const title = await page.title();
  const navExists = await page.locator('.school-navbar').count();
  const footerExists = await page.locator('footer').count();
  const langButtons = await page.locator('[data-lang]').count();
  const searchButtons = await page.locator('.school-search-button').count();
  const searchModalCount = await page.locator('#siteSearchModal').count();

  console.log('TITLE=' + title);
  console.log('NAV=' + navExists);
  console.log('FOOTER=' + footerExists);
  console.log('LANGBUTTONS=' + langButtons);
  console.log('SEARCHBUTTONS=' + searchButtons);
  console.log('SEARCHMODAL=' + searchModalCount);

  await page.locator('.school-search-button').click();
  await page.waitForTimeout(500);
  const modalVisible = await page.locator('#siteSearchModal .modal-dialog').isVisible();
  console.log('MODAL_VISIBLE=' + modalVisible);

  await page.locator('#site-search-input').fill('admission');
  await page.waitForTimeout(800);
  const resultsCount = await page.locator('.search-result-item').count();
  console.log('RESULTS_COUNT=' + resultsCount);

  await page.locator('[data-lang="np"]').click();
  await page.waitForTimeout(1000);
  const nepaliActive = await page.locator('[data-lang="np"]').getAttribute('aria-pressed');
  const bodyText = await page.locator('body').innerText();
  console.log('NEPALI_ACTIVE=' + nepaliActive);
  console.log('BODY_HAS_NEPALI=' + /[\u0900-\u097F]/.test(bodyText));

  await page.locator('[data-lang="en"]').click();
  await page.waitForTimeout(1000);
  const englishRestored = (await page.locator('body').innerText()).includes('Admissions');
  console.log('ENGLISH_RESTORED=' + englishRestored);

  await browser.close();
})();
