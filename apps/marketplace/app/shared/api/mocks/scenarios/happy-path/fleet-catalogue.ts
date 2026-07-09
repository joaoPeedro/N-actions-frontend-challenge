import { SALE_IDS } from "../../fixtures";
import { toHandlers } from "../create-handlers";
import { catalogueScenario } from "../select";
import type { MockDataScenario, MockScenarioMeta } from "../types";

/**
 * Mixed fleet catalogue with hatchbacks, saloons and SUVs.
 *
 * @intent General-purpose catalogue browsing with varied manufacturers and price points.
 * @consumers Storybook VehicleLotGrid, integration tests for `/sales/:saleId`
 */
export const fleetCatalogueScenarioMeta: MockScenarioMeta = {
  intent: "Mixed fleet auction catalogue for general browsing and grid layout tests.",
  consumers: ["Storybook", "Integration Tests", "E2E Tests"],
};

const catalogue = catalogueScenario(SALE_IDS.fleet);

export const fleetCatalogueScenarioData: MockDataScenario = {
  ...fleetCatalogueScenarioMeta,
  ...catalogue,
};

export const fleetCatalogueScenario = toHandlers(fleetCatalogueScenarioData);
