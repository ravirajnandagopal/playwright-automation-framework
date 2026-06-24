import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for the product inventory page shown after a successful login.
 */
export class InventoryPage extends BasePage {
  private readonly title: Locator;
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText('Products');
  }

  /** Adds a product to the cart by its data-test id suffix, e.g. 'sauce-labs-backpack'. */
  async addProductToCart(productId: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      return Number((await this.cartBadge.textContent())?.trim() ?? '0');
    }
    return 0;
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
