import { defineConfig, devices } from '@playwright/test';
import { DefaultUserOption } from './fixtures';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<DefaultUserOption>({
  testDir: './tests/tests-junior',
  // testDir: './tests/tests-junior',
  /* Run tests in files in parallel */
  fullyParallel: false,
  workers: 1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html'],
    // ['./misc/reporters/slowStepReporter.ts'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://shopdemo-alex-hot.koyeb.app',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: {
      mode: 'on-first-retry'
    },
    headless: process.env.CI ? true : false,
  },
  // globalSetup: require.resolve('./misc/cacheWarmer.ts'),
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // viewport: { width: 1920, height: 1080 },
        defaultUser: {
          email: 'xotabu4@gmail.com',
          password: 'xotabu4@gmail.com'
        }
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
  ],
});
