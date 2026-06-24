import { Page } from '@playwright/test';

/**
 * BasePage holds behaviour shared by every page object:
 * the Playwright `page` handle and small navigation helpers.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async currentUrl(): Promise<string> {
    return this.page.url();
  }
}
