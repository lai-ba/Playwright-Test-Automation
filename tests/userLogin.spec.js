import { test, expect } from '@playwright/test';

test('Navigate to daily finance web', async ({ page }) => {

    await page.goto('https://dailyfinance.roadtocareer.net/login');
    let usernameTxt=page.getByRole("textbox",{name: "Email"});
    let passtxt=page.getByRole("textbox",{name: "Password"});

    await usernameTxt.fill("disneyfariarobo@gmail.com");
    await passtxt.fill("123456")
    await page.getByRole("button",{name: "LOGIN"}).click();
    await page.getByRole("button",{name: "Add Cost"}).click();

    let itemnametxt=page.getByRole("textbox",{name: "Item Name"});
    await itemnametxt.fill("Chicken");


    await page.getByRole('button', { name: '+' }).click();

    await page.getByRole("spinbutton", { name: "Amount" }).waitFor();
    await page.getByRole("spinbutton", { name: "Amount" }).fill("500");
    await page.getByRole("button",{ name: "Submit"}).click();
    await page.getByTestId('AccountCircleIcon').click();
    await page.waitForSelector('text=Profile', { state: 'visible', timeout: 5000 });
    await page.getByRole('menuitem', { name: 'Profile' }).click();
    
    await page.getByRole("button", { name: "EDIT"}).click();
    await page.waitForSelector('input.upload-input', { state: 'visible' });
    const imagePath =  'C:/Users/Asus/Downloads/barbie.jpg';
    await page.locator('input.upload-input').setInputFiles(imagePath);
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: "UPLOAD IMAGE"}).click();
    const profileMenuItem = page.getByRole('button', { name: 'account of current user' });
    await profileMenuItem.click();
    await page.getByRole("menuitem", { name: "Logout"}).click(); 
    


    await page.getByRole("link", { name: "Reset it here"}).click();
    let againEmail=page.getByRole("textbox", { name: "Email"});
    await againEmail.fill("eatandsleep76@gmail.com");
    await page.getByRole("button", { name: "SEND RESET LINK"}).click();
    
    await page.pause();
     








})