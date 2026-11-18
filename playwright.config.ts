import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.PORT || 3100);
const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL,
    trace: 'off',
    // the sandboxed CI image ships its own Chromium; elsewhere Playwright's default is used
    launchOptions: process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {},
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: `pnpm start -p ${PORT}`, url: baseURL, reuseExistingServer: true, timeout: 60_000 },
});
