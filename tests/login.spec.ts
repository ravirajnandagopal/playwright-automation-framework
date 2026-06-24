import { test, expect } from '../fixtures/pages';
import { USERS } from '../utils/testData';

/**
 * Login test suite.
 * Covers the happy path plus the most important negative scenarios:
 * locked-out account, invalid credentials, and empty fields.
 */
test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('standard user logs in successfully', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('locked-out user sees a lockout error', async ({ loginPage }) => {
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
    await loginPage.expectOnLoginPage();
  });

  test('invalid credentials are rejected', async ({ loginPage }) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
    await loginPage.expectOnLoginPage();
  });

  test('missing password is rejected', async ({ loginPage }) => {
    await loginPage.login(USERS.standard.username, '');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Password is required');
  });

  test('missing username is rejected', async ({ loginPage }) => {
    await loginPage.login('', USERS.standard.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

  test('user can log back out', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectLoaded();
    await inventoryPage.logout();
    await loginPage.expectOnLoginPage();
  });
});
