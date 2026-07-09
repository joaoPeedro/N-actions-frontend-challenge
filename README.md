# N Auctions Frontend Challenge

A React Router Framework application implementing a public vehicle marketplace experience.

This project demonstrates a production-oriented frontend architecture with:

* Server-side rendering and streaming data loading
* Feature-based architecture
* Reusable Design System with semantic Design Tokens
* MSW-powered API mocking
* Automated testing strategy

---

## Engineering Goals

The project focuses on:

* Maintainable feature-based architecture
* Separation between business logic and UI concerns
* Reusable and scalable frontend foundations
* Behaviour-focused automated testing

---

## Prerequisites

* **Node.js** 22.22+
* **Yarn 4.3.1** (managed through Corepack)

The project uses Yarn Berry with the `node-modules` linker.

---

## Setup

Enable Corepack:

```bash
corepack enable
```

Install dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

---

## Architecture Overview

The application follows a feature-based architecture:

```text
Route
  ↓
Feature
  ↓
Service
  ↓
API
```

Repository structure:

```text
apps/
└── marketplace/

packages/
├── design-system/
└── design-tokens/

docs/
```

Shared concerns such as formatting, analytics and API infrastructure are isolated from business features.

---

## Key Decisions

### React Router Framework

Used for:

* Server-side rendering
* Route-based data loading
* Streaming asynchronous content

### Design System

The UI foundation follows:

```text
Design Tokens
      ↓
CSS Variables
      ↓
Design System Components
      ↓
Application UI
```

Tokens define the visual language, while components implement it.

### Mocking Strategy

MSW provides deterministic API mocking shared across:

* Development
* Integration tests
* End-to-end tests

---

## Testing

The project follows a pragmatic testing pyramid:

| Test Level  | Framework                   |
| ----------- | --------------------------- |
| Unit        | Vitest                      |
| Component   | React Testing Library       |
| Integration | React Testing Library + MSW |
| End-to-End  | Playwright                  |

Run tests:

```bash
yarn test
```

Run E2E tests:

```bash
yarn playwright:install
yarn playwright test
```

---

## Storybook

Design System components are documented through Storybook.

Run:

```bash
yarn storybook
```

---

## Documentation

Additional documentation:

* [Architecture Overview](docs/architecture/architecture.md)
* [Testing Strategy](docs/engineering/testing-strategy.md)

---

## Future Improvements

Potential improvements:

* Client-side caching with stale-while-revalidate behaviour
* Visual regression testing
* Runtime theme switching
* CI pipeline integration
