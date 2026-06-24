import { test, expect } from '../fixtures/pages';
import { USERS, CHECKOUT_CUSTOMER, PRODUCTS } from '../utils/testData';

/**
 * Checkout flow test suite.
 * Drives the full purchase journey: login -> add to cart -> cart ->
 * customer info -> overview -> confirmation, plus a validation case.
 */
test.describe('Checkout flow', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('complete a purchase end to end', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    expect(await inventoryPage.getCartCount()).toBe(1);

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectContainsProduct('Sauce Labs Backpack');
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCustomerInformation(
      CHECKOUT_CUSTOMER.firstName,
      CHECKOUT_CUSTOMER.lastName,
      CHECKOUT_CUSTOMER.postalCode,
    );

    await checkoutPage.expectOnOverview();
    const total = await checkoutPage.getDisplayedTotal();
    expect(total).toContain('Total');

    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });

  test('purchase multiple items', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);
    await inventoryPage.addProductToCart(PRODUCTS.boltTshirt);
    expect(await inventoryPage.getCartCount()).toBe(3);

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    expect(await cartPage.itemCount()).toBe(3);
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCustomerInformation(
      CHECKOUT_CUSTOMER.firstName,
      CHECKOUT_CUSTOMER.lastName,
      CHECKOUT_CUSTOMER.postalCode,
    );
    await checkoutPage.expectOnOverview();
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });

  test('checkout requires customer information', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    // Continue without entering any details.
    await checkoutPage.continueWithoutInfo();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('First Name is required');
  });
  
  test('removing an item empties the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    expect(await cartPage.itemCount()).toBe(1);

    await cartPage.removeProduct(PRODUCTS.backpack);
    expect(await cartPage.itemCount()).toBe(0);
  });
});
