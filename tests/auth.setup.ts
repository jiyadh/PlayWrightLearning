import { test as setup, expect } from "@playwright/test";

setup("Create customer 01 auth", async ({ page, context }) => {
  const email = "customer@practicesoftwaretesting.com";
  const password = "welcome01";
  const customer01AuthFile = ".auth/customer01.json";

  // Navigate to login page
  await page.goto("https://practicesoftwaretesting.com/auth/login");

  // Fill in email and password
  await page.getByTestId("email").fill(email);
  await page.getByTestId("password").fill(password);
  await page.getByTestId("login-submit").click();

  // Verify login success
  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");

  // Save authentication state
  await context.storageState({ path: customer01AuthFile });
});
