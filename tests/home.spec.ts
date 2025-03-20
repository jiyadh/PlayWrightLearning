import { test, expect } from "@playwright/test";

// Home Page without auth
test.describe("Home Page without auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visual test", async ({ page }) => {
    await expect(page).toHaveScreenshot("homepage-noAuth-user.png");
  });

  test("check sign in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("check Title", async ({ page }) => {
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
  });

  test("to check items grid in the homepage", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    expect(await productGrid.getByRole("link").count()).toBe(9);
  });

  test("to search 'thor hammer' and validate the result", async ({ page }) => {
    await page.getByTestId("search-query").fill("thor hammer");
    await page.getByTestId("search-submit").click();
    const searchResultGrid = page.getByTestId("search_completed");
    await expect(searchResultGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  });
});

// Home Page with auth customer 1
test.describe("Home Page with auth customer 1", () => {
  test.use({ storageState: ".auth/customer01.json" });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visual test", async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot("homepage-ValidAuth-user.png", {
      mask: [page.getByTitle('Practice Software Testing - Toolshop')]
    });
  });

  test("check customer01 is signed in", async ({ page }) => {
    await expect(page.locator('[data-test="nav-menu"]')).toContainText("Jane Doe");
    await expect(page.locator('[data-test="nav-my-account"]')).toContainText("My account");
  });

  test("check Title", async ({ page }) => {
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
  });

  test("to check items grid in the homepage", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    expect(await productGrid.getByRole("link").count()).toBe(9);
  });

  test("to search 'thor hammer' and validate the result", async ({ page }) => {
    await page.getByTestId("search-query").fill("thor hammer");
    await page.getByTestId("search-submit").click();
    const searchResultGrid = page.getByTestId("search_completed");
    await expect(searchResultGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  });
});
