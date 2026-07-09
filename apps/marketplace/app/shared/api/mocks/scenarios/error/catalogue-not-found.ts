import { delay, http, HttpResponse } from "msw";

import type { MockScenarioHandlers, MockScenarioMeta } from "../types";

/**
 * Catalogue sale lookup returns 404 Not Found.
 *
 * @intent Exercise route ErrorBoundary when a public sale does not exist.
 * @consumers Integration Tests for `/sales/:saleId` error handling
 */
export const catalogueNotFoundScenarioMeta: MockScenarioMeta = {
  intent: "Return 404 when fetching an unknown public sale by ID.",
  consumers: ["Integration Tests", "E2E Tests"],
};

export const catalogueNotFoundScenario: MockScenarioHandlers = [
  http.get("*/api/public-sales/:saleId", async () => {
    await delay();
    return new HttpResponse(null, { status: 404 });
  }),
];

catalogueNotFoundScenario.meta = catalogueNotFoundScenarioMeta;
