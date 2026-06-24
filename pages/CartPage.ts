import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for the shopping cart page.
 */
export class CartPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShopping: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShopping = page.locator('[data-test="continue-shopping"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async itemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async expectContainsProduct(productName: string): Promise<void> {
    await expect(this.page.locator('.inventory_item_name', { hasText: productName })).toBeVisible();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
