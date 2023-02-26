import { expect, test } from "@playwright/test";

test('Check if all product names start with Sauce Labs', async ({ browser }) => {
    // Automatic login
    const context = await browser.newContext({
        storageState:"./auth.json"
    })

    const page = await context.newPage();
    
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Title Verification
    const titleList = await page.locator('.inventory_item_name');
    const productTitleList = await titleList.allTextContents();

    for(const item of productTitleList){
        await expect(item.slice(0,10)).toBe('Sauce Labs');
    }

});