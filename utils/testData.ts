/**
 * Centralised test data so credentials and fixtures live in one place.
 * saucedemo.com exposes several seeded accounts that all share one password.
 */
export const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performanceGlitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
  invalid: { username: 'no_such_user', password: 'wrong_password' },
} as const;

export const CHECKOUT_CUSTOMER = {
  firstName: 'Jane',
  lastName: 'Doe',
  postalCode: '76131',
} as const;

/** Products referenced by their saucedemo data-test id suffix. */
export const PRODUCTS = {
  backpack: 'sauce-labs-backpack',
  bikeLight: 'sauce-labs-bike-light',
  boltTshirt: 'sauce-labs-bolt-t-shirt',
} as const;
