import { SALE_IDS } from "../../fixtures";
import { toHandlers } from "../create-handlers";
import { catalogueScenario } from "../select";
import type { MockDataScenario, MockScenarioMeta } from "../types";

/**
 * Commercial vans and pickups from Danish fleet operators.
 *
 * @intent Validate commercial body styles, DKK pricing and physical sale metadata.
 * @consumers Storybook, integration tests for commercial catalogue flows
 */
export const commercialVehiclesScenarioMeta: MockScenarioMeta = {
  intent: "Commercial vans and pickups for fleet and trade buyer scenarios.",
  consumers: ["Storybook", "Integration Tests", "E2E Tests"],
};

const catalogue = catalogueScenario(SALE_IDS.commercial);

export const commercialVehiclesScenarioData: MockDataScenario = {
  ...commercialVehiclesScenarioMeta,
  ...catalogue,
};

export const commercialVehiclesScenario = toHandlers(commercialVehiclesScenarioData);
