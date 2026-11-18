// Renders PNG favicons + OG image from the SVG kit using Playwright's Chromium.
//   node scripts/brand/render_icons.mjs
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const svg = (f) => readFileSync(resolve(root, 'public/brand', f), 'utf8');
const mark = svg('mark.svg');
const vertical = svg('logo-vertical.svg');

const jobs = [
  { out: 'app/apple-icon.png', w: 180, h: 180, html: icon(mark, 180, 26) },
  { out: 'public/icon-192.png', w: 192, h: 192, html: icon(mark, 192, 28) },
  { out: 'public/icon-512.png', w: 512, h: 512, html: icon(mark, 512, 72) },
  { out: 'public/og.png', w: 1200, h: 630, html: og() },
];

function icon(s, size, pad) {
  return `<body style="margin:0;width:${size}px;height:${size}px;background:#EEE8DD;display:grid;place-items:center">
  <div style="width:${size - pad * 2}px">${s.replace('<svg ', '<svg width="100%" ')}</div></body>`;
}
function og() {
  return `<body style="margin:0;width:1200px;height:630px;background:#EEE8DD;display:grid;place-items:center">
  <div style="width:300px">${vertical.replace('<svg ', '<svg width="100%" ')}</div></body>`;
}

const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
for (const j of jobs) {
  const page = await browser.newPage({ viewport: { width: j.w, height: j.h } });
  await page.setContent(j.html);
  await page.screenshot({ path: resolve(root, j.out), omitBackground: false });
  await page.close();
  console.log('wrote', j.out);
}
await browser.close();
