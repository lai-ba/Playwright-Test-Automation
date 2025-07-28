import { test, expect } from '@playwright/test';

test('Navigate to daily finance web', async ({ page }) => {

     await page.goto('https://dailyfinance.roadtocareer.net/register');
     let firstNameTxt=page.getByRole("textbox",{name : " First Name"});
     let lastNameTxt=page.getByRole("textbox",{name: "Last Name"});
     let emailTxt=page.getByRole("textbox",{name: "Email"});
     let passwordTxt=page.getByRole("textbox",{name: "Password"});
     let phoneNumberTxt=page.getByRole("textbox",{name: "Phone Number"});
     let addressTxt=page.getByRole("textbox",{name: "Address"});

     await firstNameTxt.fill("Faria");
     await lastNameTxt.fill("laiba");
     await emailTxt.fill("disneyfariarobo@gmail.com");
     await passwordTxt.fill("123456");
     await phoneNumberTxt.fill("01231186590");
     await addressTxt.fill("Dhaka,Bangladesh");
     await page.locator('input[type="radio"][value="Female"]').check({ force: true });
     await page.locator('input[type="checkbox"]').scrollIntoViewIfNeeded();
     await page.getByRole("checkbox").check();
     await page.getByRole("button",{name: "REGISTER"}).click();
     await page.waitForSelector('.Toastify__toast-body',{ timeout: 5000});
     await expect(page.locator('.Toastify__toast-body')).toHaveText(/registered successfully!/);
     

     await page.pause()
     

})