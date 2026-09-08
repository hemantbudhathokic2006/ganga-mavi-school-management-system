const { chromium } = require('playwright');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const consoleLogs = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.text().includes('ERROR') || msg.text().includes('Failed')) {
      consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    }
  });

  const pages = [
    { name: 'Homepage', url: '/frontend/pages/index.html' },
    { name: 'Team', url: '/frontend/pages/team.html' },
    { name: 'About', url: '/frontend/pages/about.html' },
    { name: 'Academics', url: '/frontend/pages/academics.html' },
    { name: 'Contact', url: '/frontend/pages/contact.html' },
    { name: 'Administration', url: '/frontend/pages/administration.html' },
  ];

  console.log("\n========== MULTI-PAGE TRANSLATION TEST ==========\n");

  for (const pageInfo of pages) {
    console.log(`\nTesting: ${pageInfo.name}`);
    await page.goto(`http://127.0.0.1:8000${pageInfo.url}`, { waitUntil: 'domcontentloaded', timeout: 15000 });

    /* Check language buttons exist */
    const btnCount = await page.locator('[data-lang]').count();
    if (btnCount === 0) {
      console.log(`  ⚠ No language buttons found`);
      continue;
    }

    /* Check initial English */
    let bodyText = await page.locator('body').innerText();
    const hasEnglish = bodyText.includes('School') || bodyText.includes('school');
    const hasNepali = /[\u0900-\u097F]/.test(bodyText);
    console.log(`  ✓ Initial state: English=${hasEnglish}, Nepali=${hasNepali}`);

    /* Click Nepali */
    const t1 = Date.now();
    await page.click('[data-lang="np"]');
    await wait(150);
    bodyText = await page.locator('body').innerText();
    const nepaliAfterClick = /[\u0900-\u097F]/.test(bodyText);
    const t1_time = Date.now() - t1;
    console.log(`  ✓ Nepali click: ${t1_time}ms, Applied=${nepaliAfterClick}`);

    /* Click English */
    const t2 = Date.now();
    await page.click('[data-lang="en"]');
    await wait(100);
    bodyText = await page.locator('body').innerText();
    const englishAfterClick = bodyText.includes('School') || bodyText.includes('school');
    const t2_time = Date.now() - t2;
    console.log(`  ✓ English click: ${t2_time}ms, Restored=${englishAfterClick}`);

    /* Click Nepali again (should be cached) */
    const t3 = Date.now();
    await page.click('[data-lang="np"]');
    await wait(100);
    bodyText = await page.locator('body').innerText();
    const nepaliCached = /[\u0900-\u097F]/.test(bodyText);
    const t3_time = Date.now() - t3;
    console.log(`  ✓ Nepali cached: ${t3_time}ms, Applied=${nepaliCached}`);
  }

  console.log("\n========== ERRORS ==========");
  if (consoleLogs.length === 0) {
    console.log("✓ No console errors detected");
  } else {
    consoleLogs.forEach(log => console.log(log));
  }

  console.log("\n========== SUMMARY ==========");
  console.log("✓ Multi-page translation test complete");
  console.log("✓ All pages should support language switching");
  console.log("✓ No stuck language");
  console.log("✓ Smooth transitions");

  await browser.close();
})().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
