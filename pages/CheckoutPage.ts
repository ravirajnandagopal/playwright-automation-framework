import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object covering the three-step checkout flow:
 * (1) customer information, (2) order overview, (3) confirmation.
 */
export class CheckoutPage extends BasePage {
  // Step one: customer information
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueButton: Locator;
  private readonly errorMessage: Locator;

  // Step two: overview
  private readonly finishButton: Locator;
  private readonly subtotalLabel: Locator;
  private readonly totalLabel: Locator;

  // Step three: confirmation
  private readonly completeHeader: Locator;
  private readonly backHome: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    this.finishButton = page.locator('[data-test="finish"]');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.totalLabel = page.locator('.summary_total_label');

    this.completeHeader = page.locator('.complete-header');
    this.backHome = page.locator('[data-test="back-to-products"]');
  }

  async fillCustomerInformation(first: string, last: string, postal: string): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
    await this.continueButton.click();
  }

  async continueWithoutInfo(): Promise<void> {
    await this.continueButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await expect(this.errorMessage).toBeVisible();
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  async expectOnOverview(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.finishButton).toBeVisible();
  }

  async getDisplayedTotal(): Promise<string> {
    return (await this.totalLabel.textContent())?.trim() ?? '';
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
