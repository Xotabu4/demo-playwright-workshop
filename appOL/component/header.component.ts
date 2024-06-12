import { Page, expect } from "@playwright/test";

export const Header = (page: Page) => {
  const shopLink = page.getByRole("link", { name: "Shop" });
  const cartLink = page.getByRole("button", { name: "your cart" });

  return {
    async expectLoaded(
      message = "Expected Header to be loaded"
    ): Promise<void> {
      await expect(shopLink, message).toBeVisible();
    },

    async openCart() {
      await cartLink.click();
    },

    async openShop() {
      await shopLink.click();
    },
  };
};
