import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://practicesoftwaretesting.com/');
  
  // Click on sign-in
  await page.locator('[data-test="nav-sign-in"]').click();

  // Fill in email and password
  await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
  await page.locator('[data-test="password"]').fill('welcome01');

  // Submit login form
  await page.locator('[data-test="login-submit"]').click();

  // Verify login success
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
  await expect(page.locator('[data-test="nav-my-account"]')).toContainText('My account');

  // Logout
  await page.getByTestId('nav-menu').click();
  await page.getByTestId('nav-sign-out').click();
});