const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = 'c:/Users/Hp/OneDrive/Attachments/Desktop/Ganga mavi school';
const pageDir = path.join(root, 'frontend/pages');
const pages = fs.readdirSync(pageDir)
  .filter((file) => file.toLowerCase().endsWith('.html'))
  .sort();

const baseUrl = 'http://127.0.0.1:8000';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const pageFile of pages) {
    const url = `${baseUrl}/frontend/pages/${pageFile}`;
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
    const issues = [];

    page.on('pageerror', (err) => issues.push(`PAGEERROR:${err.message}`));
    page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error' || /error|failed|warn/i.test(text)) {
        issues.push(`CONSOLE:${type}:${text}`);
      }
    });
    page.on('requestfailed', (req) => {
      const urlText = req.url();
      const reason = req.failure()?.errorText || 'unknown';
      issues.push(`REQUESTFAILED:${urlText} ${reason}`);
    });
    page.on('response', async (res) => {
      if (res.status() >= 400) {
        issues.push(`HTTP:${res.status()}:${res.url()}`);
      }
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(500);

    const title = await page.title();
    const bodyText = await page.locator('body').innerText();
    const navExists = await page.locator('.school-navbar, .navbar').count();
    const footerExists = await page.locator('footer, .site-footer, .footer').count();
    const langButtons = await page.locator('[data-lang]').count();
    const searchButtons = await page.locator('.school-search-button').count();
    const images = await page.locator('img').count();

    results.push({
      page: pageFile,
      title,
      navExists,
      footerExists,
      langButtons,
      searchButtons,
      images,
      textLength: bodyText.length,
      issues: issues.slice(0, 10),
    });

    await page.close();
  }

  for (const item of results) {
    const issueText = item.issues.length ? ` | ${item.issues.join(' | ')}` : '';
    console.log(`${item.page} | title=${item.title} | nav=${item.navExists} | footer=${item.footerExists} | lang=${item.langButtons} | search=${item.searchButtons} | images=${item.images}${issueText}`);
  }

  await browser.close();
})();
