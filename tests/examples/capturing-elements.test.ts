import { test } from "@playwright/test";

test(
  "Capturing captcha popup",
  {
    tag: ["@test", "@JIRAID=123123"],
    annotation: [
      { type: "issue", description: "123123" },
      { type: "issue", description: "123123" },
      { type: "issue", description: "123123" },
    ],
  },
  async ({ page }) => {
    // Setup the handler.
    await page.addLocatorHandler(page.getByRole("alertdialog"), async () => {
      console.log("cookie popup found");
      await page.getByRole("button", { name: "Allow All" }).click();
    });
    // Write the test as usual.
    await page.goto(
      "https://www.cookiepro.com/knowledge/how-do-i-test-cookie-blocking-implementation/"
    );
    await page.pause();
    await page
      .locator("#maincontent")
      .getByRole("link", { name: "Pricing" })
      .click();
    // await page.waitForTimeout(60000);
  }
);
