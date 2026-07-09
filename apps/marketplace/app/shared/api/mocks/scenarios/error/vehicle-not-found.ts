import { delay, http, HttpResponse } from "msw";

import type { MockScenarioHandlers, MockScenarioMeta } from "../types";

/**
 * Vehicle lookup returns 404 Not Found.
 *
 * @intent Exercise not-found handling when a vehicle does not exist.
 * @consumers Integration Tests for `/vehicles/:vehicleId` error handling
 */
export const vehicleNotFoundScenarioMeta: MockScenarioMeta = {
  intent: "Return 404 when fetching an unknown vehicle by ID.",
  consumers: ["Integration Tests", "E2E Tests"],
};

export const vehicleNotFoundScenario: MockScenarioHandlers = [
  http.get("*/api/vehicles/:vehicleId", async () => {
    await delay();
    return new HttpResponse(null, { status: 404 });
  }),
];

vehicleNotFoundScenario.meta = vehicleNotFoundScenarioMeta;
