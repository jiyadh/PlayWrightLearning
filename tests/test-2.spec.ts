import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Community' }).click();
  await page.getByRole('link', { name: 'Ambassador page' }).click();
  await expect(page.locator('section')).toContainText('Butch Mayhew');
  await expect(page.getByRole('article')).toMatchAriaSnapshot(`- paragraph: We are more than excited to introduce to you our awesome Playwright Ambassadors and hope you enjoy the incredible content they are creating.`);
});