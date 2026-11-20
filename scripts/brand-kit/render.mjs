// Renders brand-kit layouts with Chromium: vector PDF (live text, embedded
// fonts, vector shapes) and high-resolution PNG.
//   node scripts/brand-kit/render.mjs <jobs.json> [more.json ...]
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const jobs = process.argv.slice(2).flatMap((f) => JSON.parse(readFileSync(f, 'utf8')).jobs);
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
let n = 0;
for (const j of jobs) {
  const ctx = await browser.newContext({
    viewport: { width: Math.max(1, Math.round(j.vw ?? (typeof j.w === 'number' ? j.w : 1200))), height: Math.max(1, Math.round(j.vh ?? (typeof j.h === 'number' ? j.h : 800))) },
    deviceScaleFactor: j.scale || 1,
  });
  const page = await ctx.newPage();
  await page.goto(pathToFileURL(j.html).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  if (j.type === 'pdf') {
    await page.pdf({ path: j.out, width: j.w, height: j.h, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: !!j.cssPage, ...(j.pages ? { pageRanges: j.pages } : {}) });
  } else {
    await page.screenshot({ path: j.out, omitBackground: !!j.transparent, fullPage: false });
  }
  await ctx.close();
  if (++n % 25 === 0) console.log(`${n}/${jobs.length}`);
}
await browser.close();
console.log(`rendered ${n} files`);
