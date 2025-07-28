import { test, expect, request as playwrightRequest } from '@playwright/test';

const baseURL = "https://gmail.googleapis.com";
const token = "your_valid_token_here"; // Make sure it's valid

test('Read Gmail and reset password via link', async ({ page }) => {
  // Step 1: Create request context
  const requestContext = await playwrightRequest.newContext({
    baseURL,
    extraHTTPHeaders: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });

  // Step 2: Get latest email
  const listRes = await requestContext.get('/gmail/v1/users/me/messages');
  const listJson = await listRes.json();
  const emailId = listJson.messages?.[0]?.id;

  if (!emailId) {
    console.error("❌ No email messages found.");
    return;
  }

  // Step 3: Read the latest message
  const messageRes = await requestContext.get(`/gmail/v1/users/me/messages/${emailId}`);
  const messageJson = await messageRes.json();
  const snippet = messageJson.snippet;

  // Step 4: Extract reset URL from snippet
  const resetLinkMatch = snippet.match(/https:\/\/[^\s]+/);
  if (!resetLinkMatch) {
    console.error("❌ Reset link not found in snippet.");
    return;
  }

  const resetUrl = resetLinkMatch[0];
  console.log("🔗 Reset URL:", resetUrl);

  // Step 5: Navigate to the reset URL
  await page.goto(resetUrl);

  // Step 6: Fill in new password
  await page.getByLabel('New Password').fill('MyNewSecurePass123!');
  await page.getByLabel('Confirm Password').fill('MyNewSecurePass123!');

  // Step 7: Click reset button
  await page.getByRole('button', { name: /Reset Password/i }).click();

  // Step 8: Confirm success by checking redirection or toast
  await expect(page).toHaveURL(/.*login/i);
});
