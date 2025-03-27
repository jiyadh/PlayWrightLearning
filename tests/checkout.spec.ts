import { test, expect } from '@playwright/test';

test.describe("Checkout Functionality", () => {
    test.use({ storageState: ".auth/customer01.json" });

    test.beforeEach(async ({ page }) => {
        await page.goto("https://practicesoftwaretesting.com/");
    });

    test('checkout', async ({ page }) => {
        // Select the first 'Pliers' product
        await page.getByAltText('Pliers', { exact: true }).first().click();
        
        // Add the product to the cart
        await page.getByTestId("add-to-cart").click();
        
        // Navigate to the cart
        await page.getByTestId("nav-cart").click();
        
        // Proceed to checkout step 1
        await page.getByTestId("proceed-1").click();
        
        // Verify and proceed to checkout step 2
        await expect(page.getByTestId("proceed-2")).toContainText('Proceed to checkout');
        await page.getByTestId("proceed-2").click();
        
        // Proceed to checkout step 3
        await page.locator('app-address div').filter({ hasText: 'Proceed to checkout' }).nth(3).click();
        
        // Fill in the address details
        await page.getByTestId('state').fill('cvdxgf');
        await page.getByTestId("country").fill('Austriad');
        await page.getByTestId("postal_code").fill('cvcvc');
        
        // Proceed to payment method selection
        await page.getByTestId("proceed-3").click();
        
        // Select payment method and finish the checkout
        await page.getByTestId("payment-method").selectOption('cash-on-delivery');
        await page.getByTestId("finish").click();
        
        // Wait for the payment success message
        await page.waitForLoadState('networkidle');
        await page.waitForSelector('div.alert.alert-success div[data-test="payment-success-message"]');
        
        // Verify the payment success message
        expect(page.getByTestId("payment-success-message")).toBeVisible();
        expect(page.getByText("Payment was successful")).toBeVisible();
        
        // Finish the checkout process
        await page.getByTestId("finish").click();
        
        // Verify the order confirmation message
       // expect(page.getByText('Thanks for your order! Your')).toBeVisible();
    });
});

