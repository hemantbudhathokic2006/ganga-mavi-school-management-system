const { chromium } = require('playwright');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  /* Collect console messages */
  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => consoleLogs.push(`[ERROR] ${err.message}`));

  console.log("\n========== TRANSLATION SPEED TEST ==========\n");
  console.log("Step 1: Load homepage in English");
  await page.goto("http://127.0.0.1:8000/frontend/pages/index.html", { waitUntil: "networkidle" });
  
  /* Wait for language buttons to be visible */
  await page.waitForSelector('[data-lang]', { timeout: 10000 });
  
  let bodyText = await page.locator('body').innerText();
  console.log(`✓ Loaded. English text present: ${bodyText.includes("Ganga") ? "YES" : "NO"}`);
  
  /* Verify button exists */
  const btnCount = await page.locator('[data-lang]').count();
  console.log(`✓ Language buttons found: ${btnCount}`);

  console.log("\nStep 2: Click Nepali button (FIRST TIME - needs translation)");
  const t1 = Date.now();
  await page.click('[data-lang="np"]', { timeout: 5000 });
  await wait(100);
  let nepaliVisible = false;
  for (let i = 0; i < 30; i++) {
    bodyText = await page.locator('body').innerText();
    if (/[\u0900-\u097F]/.test(bodyText)) {
      nepaliVisible = true;
      break;
    }
    await wait(100);
  }
  const t1_elapsed = Date.now() - t1;
  console.log(`✓ Nepali applied in ${t1_elapsed}ms. Nepali text present: ${nepaliVisible ? "YES" : "NO"}`);

  console.log("\nStep 3: Click English button (INSTANT RESTORE)");
  const t2 = Date.now();
  await page.click('[data-lang="en"]');
  await wait(50);
  bodyText = await page.locator('body').innerText();
  const t2_elapsed = Date.now() - t2;
  const englishRestored = bodyText.includes("Ganga") && !(/[\u0900-\u097F]/.test(bodyText));
  console.log(`✓ English restored in ${t2_elapsed}ms. English only: ${englishRestored ? "YES" : "NO"}`);

  console.log("\nStep 4: Click Nepali again (CACHED - should be instant)");
  const t3 = Date.now();
  await page.click('[data-lang="np"]');
  await wait(50);
  bodyText = await page.locator('body').innerText();
  nepaliVisible = /[\u0900-\u097F]/.test(bodyText);
  const t3_elapsed = Date.now() - t3;
  console.log(`✓ Nepali re-applied in ${t3_elapsed}ms. Nepali text present: ${nepaliVisible ? "YES" : "NO"}`);

  console.log("\nStep 5: Click English again (INSTANT RESTORE)");
  const t4 = Date.now();
  await page.click('[data-lang="en"]');
  await wait(50);
  bodyText = await page.locator('body').innerText();
  const t4_elapsed = Date.now() - t4;
  const englishRestored2 = bodyText.includes("Ganga") && !(/[\u0900-\u097F]/.test(bodyText));
  console.log(`✓ English restored in ${t4_elapsed}ms. English only: ${englishRestored2 ? "YES" : "NO"}`);

  console.log("\nStep 6: Repeat cycle 2 more times");
  for (let cycle = 1; cycle <= 2; cycle++) {
    const tc1 = Date.now();
    await page.click('[data-lang="np"]');
    await wait(50);
    const tc1_elapsed = Date.now() - tc1;
    
    const tc2 = Date.now();
    await page.click('[data-lang="en"]');
    await wait(50);
    const tc2_elapsed = Date.now() - tc2;
    
    console.log(`  Cycle ${cycle}: Nepali ${tc1_elapsed}ms → English ${tc2_elapsed}ms`);
  }

  console.log("\n========== CONSOLE OUTPUT ==========");
  consoleLogs.filter(l => l.includes("SchoolLanguage")).forEach(l => console.log(l));

  console.log("\n========== TEST COMPLETE ==========");
  console.log("\nExpected behavior:");
  console.log("✓ Step 1-2: First Nepali click slower (API translation)");
  console.log("✓ Step 3-5: English and Nepali clicks should be < 200ms");
  console.log("✓ Repeats should be consistently fast (cached)");
  console.log("✓ No console errors");
  console.log("✓ No stuck language");

  await browser.close();
})().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
