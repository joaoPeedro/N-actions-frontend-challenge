import { delay, http, HttpResponse } from "msw";

import type { MockScenarioHandlers, MockScenarioMeta } from "../types";

/**
 * Vehicle list endpoint returns 500 Internal Server Error.
 *
 * @intent Exercise streamed catalogue error propagation when vehicle fetch fails.
 * @consumers Integration Tests for Suspense/Await error boundaries
 */
export const serverErrorScenarioMeta: MockScenarioMeta = {
  intent: "Return 500 when loading vehicles for a catalogue sale.",
  consumers: ["Integration Tests", "E2E Tests"],
};

export const serverErrorScenario: MockScenarioHandlers = [
  http.get("*/api/public-sales/:saleId/vehicles", async () => {
    await delay(600);
    return new HttpResponse(null, { status: 500 });
  }),
];

serverErrorScenario.meta = serverErrorScenarioMeta;
