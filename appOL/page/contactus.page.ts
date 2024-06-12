import { Page, expect } from "@playwright/test";
import { AppPage } from "../abstract";

export const ContactUs = (page: Page) => {
  const fullNameInput = page.getByPlaceholder("You Full Name");
  const emailInput = page.getByPlaceholder("Your Email Address");
  const messageInput = page.getByPlaceholder("Please Describe Your Message");
  const submitButton = page.getByRole("button", { name: "Submit" });

  return {
    ...AppPage(page),
    pagePath: "/contact",

    async expectLoaded() {
      await expect(fullNameInput).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(messageInput).toBeVisible();
      await expect(submitButton).toBeVisible();
    },

    async submitContactUsForm(options: {
      fullName: string;
      email: string;
      message: string;
    }) {
      await this.expectLoaded();
      await fullNameInput.fill(options.fullName);
      await emailInput.fill(options.email);
      await messageInput.fill(options.message);
      await submitButton.click();
    },
  };
};
