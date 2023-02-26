import { expect, test } from "@playwright/test";

test.describe('Login Tests', () => {
    test('Log in with valid credentials', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(await page.title()).toBe('Swag Labs');

        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');

        await page.locator('[data-test="login-button"]').click();
        await expect(await page.url()).toBe('https://www.saucedemo.com/inventory.html');

        const productsTitle = await page.locator('.header_secondary_container > span');
        await expect(productsTitle).toHaveText('Products')
    
    });

    test('Logging in with invalid credentials', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(await page.title()).toBe('Swag Labs');

        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce123');

        await page.locator('[data-test="login-button"]').click();
    
        const errorText = await page.getByText('Epic sadface: Username and password do not match any user in this service');
        await expect(errorText).toBeVisible();
    
    });

})