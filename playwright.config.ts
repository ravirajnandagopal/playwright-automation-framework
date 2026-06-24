import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration.
 * Docs: https://playwright.dev/docs/test-configuration
 *
 * Reporting + failure artifacts are wired here:
 *  - HTML report (open with `npm run report`)
 *  - JUnit XML + JSON for CI consumption
 *  - Screenshot, video, and trace captured only on failure to keep runs fast.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests within a file in parallel. */
  fullyParallel: true,
  /* Fail the build on CI if test.only is accidentally left in the source. */
  forbidOnly: !!process.env.CI,
  /* Retry failed tests on CI to absorb transient flakiness. */
  retries: process.env.CI ? 2 : 0,
  /* Limit workers on CI for stable, reproducible runs. */
  workers: process.env.CI ? 2 : undefined,

  /* Reporters: list for console, HTML for humans, JUnit/JSON for CI. */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  /* Shared settings for all projects. */
  use: {
    baseURL: 'https://www.saucedemo.com',
    /* Collect a trace when retrying a failed test. */
    trace: 'on-first-retry',
    /* Capture a screenshot only when a test fails. */
    screenshot: 'only-on-failure',
    /* Keep video only for failed tests. */
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  /* Cross-browser matrix. */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
