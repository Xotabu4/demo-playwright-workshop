import type { Page } from "@playwright/test";

export const AppPage = (page: Page) => ({
  /**
   * Path to the page can be relative to the baseUrl defined in playwright.config.ts
   * or absolute (on your own risk)
   */
  pagePath: "/",

  expectLoaded(): never {
    throw new TypeError(`expectLoaded must be implemented`);
  },
  /**
   * Opens the page in the browser and expectLoaded should pass
   */
  async open(path?: string) {
    await page.goto(path ?? this.pagePath);
  },
});
