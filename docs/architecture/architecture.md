# Architecture Overview

## Goals

The application was designed with the following principles:

- Keep business features isolated and easy to evolve.
- Separate domain behavior from UI primitives.
- Prefer simple, explicit abstractions over unnecessary complexity.
- Make the application easy to test and maintain.

---

# Application Structure

The repository follows a feature-based architecture.

```text
apps/
└── marketplace/
    └── app/
        ├── routes/
        ├── features/
        └── shared/

packages/
├── design-system/
└── design-tokens/
```

## Routes

Routes are responsible for:

- defining application entry points;
- loading required data;
- composing features.

Routes should avoid containing business logic.

---

## Features

Features own domain-specific behavior.

Example:

```text
features/
└── public-sales/
    ├── components/
    ├── data/
    ├── mappers/
    └── services/
```

A feature contains:

- UI components;
- domain services;
- data access;

---

## Shared Layer

Shared contains reusable cross-cutting concerns.

Examples:

```text
shared/
├── api/
├── analytics/
├── formatting/
├── http/
└── feedback/
```

Shared code should not depend on business features.

---

# Data Flow

The application follows a clear data flow:

```text
Route

↓

Loader

↓

Service

↓

API Boundary

↓

UI
```

## Loaders

Loaders handle route-level data requirements.

They are responsible for:

- requesting data needed for rendering;
- handling route errors;
- providing data to the UI.

---

## Services

Services isolate business-oriented data access.

They prevent routes and components from depending directly on API contracts.

---

# Rendering Strategy

The application uses server-side rendering through React Router Framework.

Initial page content is rendered on the server.

For asynchronous content, streaming is used where it improves perceived performance.

Example:

```text
Page Shell

↓

Stream Vehicle Collection

↓

Render Vehicle Grid
```

The goal is to display meaningful content as early as possible while keeping the implementation simple.

---

Scalability

The current implementation intentionally focuses on the needs of this challenge while keeping clear extension points for future evolution.

# Design Tokens

Design Tokens are the single source of truth for visual values.
Define the visual language:

colors;
typography;
spacing;
semantic values.

The project currently ships with a single brand theme, but the structure allows additional brands to be introduced by defining new ResolvedTheme objects and generating the corresponding CSS variables without changing application components.

Brand Theme
↓
Resolved Theme
↓
CSS Variables
↓
Design System

# Design System

The Design System remains domain-agnostic.

Components are built using semantic tokens rather than brand-specific values, allowing the same components to be reused across different visual identities.

New components can be added incrementally without affecting application features.

The Design System implements the visual language through reusable components.

Components consume semantic tokens instead of defining raw values.

> Tokens describe the design. The Design System executes the design.

---

Scalability

The current implementation intentionally focuses on the requirements of this challenge while preserving clear evolution paths.

Multi-brand capability

The Design System and Design Tokens are structured to support additional brands in the future.

A new brand can be introduced by defining new theme objects and generating the corresponding CSS variables without changing application components.

Brand Theme

↓

Resolved Theme

↓

CSS Variables

↓

Design System

↓

Application UI

The current implementation ships with a single theme because additional brands are not required.

---

# Feature Architecture

Business functionality is organised by feature rather than technical layer.

New domains can be introduced alongside existing features without impacting shared infrastructure.

Shared Infrastructure

Cross-cutting concerns such as:

- API infrastructure
- HTTP caching
- formatting
- analytics

are centralised in the Shared layer, encouraging reuse while keeping business features independent.

---

# Mocking Strategy

MSW is used as the API boundary during development and testing.

The same deterministic mock data supports:

- local development;
- integration tests;
- end-to-end tests.

Mock scenarios are organised around business behaviour rather than individual requests.

Example:

```text
premiumCatalogueScenario

emptyCatalogueScenario

catalogueNotFoundScenario
```

This keeps tests expressive and close to user scenarios.

---

# Testing Approach

Testing follows a pragmatic testing pyramid:

```text
Unit

↓

Component

↓

Integration

↓

End-to-End
```

Tests focus on behaviour rather than implementation details.

Different test levels provide different confidence:

- Unit tests validate isolated logic.
- Component tests validate UI behaviour.
- Integration tests validate feature flows.
- End-to-End tests validate complete user journeys.

See:

[Testing Strategy](../engineering/testing-strategy.md)

---

# Caching Strategy

HTTP caching is applied according to data freshness requirements.

Cache policies are defined based on domain behaviour:

| Data                      | Strategy              |
| ------------------------- | --------------------- |
| Public catalogue calendar | Cacheable             |
| Upcoming sales            | Cacheable             |
| Live sales                | No cache              |
| Vehicle details           | Depends on sale state |

Live auction data avoids caching to prevent stale information.

Cache behaviour is centralised through shared HTTP utilities.

---

# Server State Strategy

Server data is loaded through React Router loaders.

The application uses server-side rendering for initial data and streaming for progressive content loading.
TanStack Query for polling, background revalidation.

Current responsibilities:

| Responsibility        | Solution                         |
| --------------------- | -------------------------------- |
| Initial data loading  | React Router Loaders             |
| Progressive rendering | React Router Streaming (`Await`) |
| HTTP caching          | Cache-Control headers            |
| User preferences      | Client-side state                |
| Polling               | TanStack Query                   |

The current implementation does not require client-side server state management beyond the initial server render.

Future requirements can evolve incrementally:

| Requirement                 | Potential Solution       |
| --------------------------- | ------------------------ |
| Optimistic updates          | TanStack Query           |
| Live one-way updates        | Server-Sent Events (SSE) |
| Bidirectional communication | WebSockets               |

React Router remains responsible for the initial server render, while TanStack Query would naturally complement the architecture for client-side data synchronisation if future requirements demand it.

For example:

- **Server-Sent Events (SSE)** for one-way live updates such as auction prices or sale status.
- **WebSockets** for bidirectional communication, such as live bidding.

---

Analytics Strategy

Analytics is treated as a cross-cutting concern and is isolated from business features.

The application exposes domain-oriented analytics events instead of coupling features to a specific analytics provider.

id="analyticsflow"
Feature

↓

Analytics Events

↓

Analytics Service

↓

Analytics Provider

Examples:

saleViewed

vehicleViewed

Features are responsible for describing meaningful user actions, while the analytics layer handles event delivery.

---

# User Preferences

User preferences represent client-side application state rather than business data.

Examples include:

- preferred locale;
- currency;
- sorting preferences;
- display options.

Preferences are intentionally isolated from domain features so they can evolve independently from business functionality.

The current implementation keeps the model intentionally small while providing a clear extension point for future user-specific settings.

---

# Future Considerations

Potential future improvements:

- Client-side stale-while-revalidate caching.
- Runtime theme switching.
- Visual regression testing.
- CI/CD pipeline integration.

These are intentionally not part of the current implementation to keep the solution focused and maintainable.
