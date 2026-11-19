import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = ['/', '/el-lugar', '/celebraciones', '/planear', '/galeria', '/visita', '/aviso-de-privacidad'];
const ALL = [...ROUTES, ...ROUTES.map((r) => (r === '/' ? '/en' : `/en${r}`))];

for (const path of ALL) {
  test(`renders ${path} with one h1, lang and no a11y violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe(path.startsWith('/en') ? 'en' : 'es-MX');
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('main navigation and language switch work', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    const sheet = page.getByRole('dialog');
    await expect(sheet).toBeVisible();
    await sheet.getByRole('link', { name: /Planear/ }).click();
  } else {
    await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Planear' }).click();
  }
  await expect(page).toHaveURL(/\/planear$/);
  await expect(page.locator('h1')).toContainText('planear');
  await page.getByRole('link', { name: /Cambiar idioma/ }).first().click();
  await expect(page).toHaveURL(/\/en\/planear$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('whatsapp links carry the prefilled message', async ({ page }) => {
  await page.goto('/visita');
  const link = page.locator('a[href^="https://wa.me/522447855365?text="]').first();
  await expect(link).toHaveAttribute('href', /Hola%2C%20me%20gustar%C3%ADa/);
});

test('inquiry form validates on the server and reports inline', async ({ page }) => {
  await page.goto('/visita');
  const form = page.locator('form').first();
  await form.getByRole('button', { name: /Solicitar visita privada/ }).click();
  await expect(form.getByText('Escribe tu nombre.')).toBeVisible();
  await expect(form.getByText('Déjanos un correo o un teléfono para responderte.')).toBeVisible();
  await expect(form.getByText('Elige una fecha tentativa.')).toBeVisible();
  await expect(form.getByText(/Elige un rango de inversión/)).toBeVisible();
  await expect(form.getByLabel(/Nombre/)).toHaveAttribute('aria-invalid', 'true');
  await expect(form.getByLabel(/Nombre/)).toBeFocused();
});

test('the mandatory budget range is part of the inquiry form', async ({ page }) => {
  await page.goto('/visita');
  const budget = page.locator('form').first().getByLabel(/Inversión estimada/);
  await expect(budget).toBeVisible();
  await expect(budget.locator('option')).toHaveCount(7);
});

test('gallery filters narrow the photographs by space and style', async ({ page }) => {
  await page.goto('/galeria');
  const all = await page.getByRole('button', { name: /^Ampliar imagen/ }).count();
  await page.getByRole('button', { name: 'El Arbolado', exact: true }).click();
  await expect(page.getByRole('heading', { name: /Resultados/ })).toBeVisible();
  const some = await page.getByRole('button', { name: /^Ampliar imagen/ }).count();
  expect(some).toBeGreaterThan(0);
  expect(some).toBeLessThan(all);
  await page.getByRole('button', { name: 'Madera · Cross Back y vintage' }).click();
  await expect(page.getByText(/No hay fotografías con esta combinación/)).toBeVisible();
  await page.getByRole('button', { name: 'Quitar filtros' }).click();
  await expect(page.getByRole('heading', { name: 'Arquitectura' })).toBeVisible();
});

test('inquiry form fails safely when email is not configured', async ({ page }) => {
  test.skip(!!process.env.RESEND_API_KEY, 'email is configured: would send a real message');
  await page.goto('/visita');
  const form = page.locator('form').first();
  await form.getByLabel(/Nombre/).fill('Prueba');
  await form.getByLabel('Correo').fill('prueba@example.com');
  await form.getByLabel(/Inversión estimada/).selectOption('50-100');
  await form.getByLabel(/Fecha tentativa/).fill('2027-03-20');
  await form.getByRole('button', { name: /Solicitar visita privada/ }).click();
  await expect(form.getByRole('status')).toContainText(/WhatsApp/);
});

test('lightbox opens, navigates with arrows and closes with Escape', async ({ page }) => {
  await page.goto('/galeria');
  const first = page.getByRole('button', { name: /^Ampliar imagen/ }).first();
  await first.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('01 /');
  await page.keyboard.press('ArrowRight');
  await expect(dialog).toContainText('02 /');
  await page.keyboard.press('ArrowLeft');
  await expect(dialog).toContainText('01 /');
  // focus stays inside the dialog
  for (let i = 0; i < 6; i++) await page.keyboard.press('Tab');
  expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(first).toBeFocused();
});

test('capacity tabs are keyboard operable', async ({ page }) => {
  await page.goto('/planear');
  const tab = page.getByRole('tab', { name: '50', exact: true });
  await tab.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: '150', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('El Arbolado');
});
