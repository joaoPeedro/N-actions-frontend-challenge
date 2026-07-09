# Testing Strategy

## Philosophy

Tests should validate behaviour and business requirements, not implementation details.

The goal is confidence through the right level of testing, not maximum coverage.

---

## Testing Pyramid

```text
              End-to-End
                  ▲
                  │
             Integration
                  ▲
                  │
              Component
                  ▲
                  │
                Unit
```

---

## Unit Tests

**Purpose:** Validate isolated, deterministic logic.

Examples:

* Formatting utilities
* Cache control helpers
* Design token transformations

Technology:

* Vitest

---

## Component Tests

**Purpose:** Validate reusable UI components and interactions.

Examples:

* Design System components
* Accessibility behaviour

Technology:

* React Testing Library

---

## Integration Tests

**Purpose:** Validate application flows across real boundaries.

Covered areas:

* Route loading
* Services
* API mocking
* Error states
* Feature behaviour

Technology:

* React Testing Library
* React Router
* MSW

---

## End-to-End Tests

**Purpose:** Validate critical user journeys in a real browser.

Example:

```text
Public Sales

↓

Catalogue

↓

Vehicle Details

↓

Back to Catalogue
```

Technology:

* Playwright

---

## Mock Strategy

MSW provides deterministic API mocks shared between development and tests.

Mocks are organised by business scenarios:

```text
premiumCatalogueScenario

emptyCatalogueScenario

catalogueNotFoundScenario
```

---

## Principles

* Prefer behaviour over implementation.
* Keep tests deterministic.
* Mock external systems only.
* Use accessible queries.
* Choose the simplest test level that provides confidence.

---

## Commands

Run tests:

```bash
yarn test
```

Run E2E:

```bash
yarn playwright test
```
