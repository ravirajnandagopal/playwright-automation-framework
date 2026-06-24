# Playwright Automation Framework

This project automates the testing of an online shopping website. It covers the login and checkout flows of the demo site [saucedemo.com](https://www.saucedemo.com), using Playwright with TypeScript and the Page Object Model.

![Playwright Tests](https://github.com/ravirajnandagopal/playwright-automation-framework/actions/workflows/playwright.yml/badge.svg)

### Checkout (`tests/checkout.spec.ts`)
- Complete a single-item purchase end to end
- Purchase multiple items
- Checkout requires customer information (validation)
- Removing an item empties the cart

## What I learned

Building this project taught me:

- How to set up Playwright from scratch — installing dependencies with `npm install` and the browsers with `npx playwright install`.
- How to run a test suite and read the results, including the HTML report.
- How to write a test using the Page Object Model — and where test code lives versus where the page interactions are defined.
- Why actions are `await`ed and why tests cover failure cases, like a locked-out user, not just the happy path.

## License

MIT