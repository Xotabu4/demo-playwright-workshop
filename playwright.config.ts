import { defineConfig, devices } from "@playwright/test";

// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<DefaultUserOption>({
  testDir: "./tests",
  fullyParallel: true,
  workers: "90%",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html"]],
  use: {
    baseURL: "https://shopdemo-alex-hot.koyeb.app",

    trace: {
      mode: "on-first-retry",
    },
    headless: process.env.CI ? true : false,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
