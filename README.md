# Playwright Automation Framework

End-to-end UI test automation built with **Playwright** and **TypeScript**, using the **Page Object Model**. The suite exercises the login and full checkout flow of the public demo site [saucedemo.com](https://www.saucedemo.com).

![Playwright Tests](https://github.com/YOUR_USERNAME/playwright-automation-framework/actions/workflows/playwright.yml/badge.svg)

## Features

- **Page Object Model** — UI locators and actions are isolated in `pages/`, keeping tests readable and maintainable.
- **Custom fixtures** — page objects are injected into each test (`fixtures/pages.ts`), so specs stay focused on behaviour.
- **Login tests** — happy path plus locked-out, invalid-credentials, and empty-field negative cases.
- **Checkout flow tests** — the complete purchase journey (add to cart → cart → customer info → overview → confirmation), multi-item orders, and form validation.
- **Cross-browser** — runs on Chromium, Firefox, and WebKit.
- **Rich reporting** — HTML report plus JUnit and JSON output for CI.
- **Failure artifacts** — screenshots, video, and traces are captured **only on failure** to keep runs fast and aid debugging.
- **CI ready** — GitHub Actions workflow runs the matrix on every push and pull request.

## Tech stack

| Concern        | Choice                          |
| -------------- | ------------------------------- |
| Test runner    | `@playwright/test`              |
| Language       | TypeScript                      |
| Pattern        | Page Object Model + fixtures    |
| Target app     | saucedemo.com                   |
| CI             | GitHub Actions                  |

## Project structure

```
playwright-automation-framework/
├── pages/                 # Page objects (POM)
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/
│   └── pages.ts           # Injects page objects into tests
├── tests/
│   ├── login.spec.ts
│   └── checkout.spec.ts
├── utils/
│   └── testData.ts        # Centralised users / customer data
├── playwright.config.ts   # Reporters, retries, failure artifacts, browser matrix
├── tsconfig.json
├── package.json
└── .github/workflows/playwright.yml
```

## Getting started

### Prerequisites

- Node.js 18+ (20 recommended)

### Install

```bash
npm install
npx playwright install
```

### Run the tests

```bash
npm test                 # all tests, all browsers
npm run test:login       # login suite only
npm run test:checkout    # checkout suite only
npm run test:headed      # watch the browser
npm run test:ui          # Playwright UI mode
npm run test:debug       # step-through debugger
```

### View the report

```bash
npm run report
```

The HTML report opens in your browser. On failure, expand a test to see the screenshot, video, and trace. Open a trace directly with:

```bash
npx playwright show-trace test-results/<path-to-trace>.zip
```

## Test coverage

### Login (`tests/login.spec.ts`)
- Standard user logs in successfully
- Locked-out user sees a lockout error
- Invalid credentials are rejected
- Missing password / username is rejected
- User can log back out

### Checkout (`tests/checkout.spec.ts`)
- Complete a single-item purchase end to end
- Purchase multiple items
- Checkout requires customer information (validation)

## Reporting & failure artifacts

Configured in `playwright.config.ts`:

- **HTML** report → `playwright-report/`
- **JUnit XML** → `test-results/junit-results.xml` (for CI dashboards)
- **JSON** → `test-results/results.json`
- **Screenshot** → on failure only
- **Video** → retained on failure
- **Trace** → captured on first retry

## CI/CD

`.github/workflows/playwright.yml` runs the suite across Chromium, Firefox, and WebKit on every push and pull request, then uploads the HTML report (always) and failure artifacts (on failure) for download from the Actions run.

> Replace `YOUR_USERNAME` in the badge URL above after pushing to GitHub.

## License

MIT
