import { SALE_IDS } from "../../fixtures";
import { toHandlers } from "../create-handlers";
import { catalogueScenario } from "../select";
import type { MockDataScenario, MockScenarioMeta } from "../types";

/**
 * Empty catalogue with no registered vehicle lots.
 *
 * @intent Validate empty-state UI when a sale exists but has zero vehicles.
 * @consumers Integration Tests, E2E Tests, Storybook empty-state examples
 */
export const emptyCatalogueScenarioMeta: MockScenarioMeta = {
  intent: "Public sale with zero vehicles to exercise catalogue empty-state rendering.",
  consumers: ["Integration Tests", "E2E Tests", "Storybook"],
};

const catalogue = catalogueScenario(SALE_IDS.empty);

export const emptyCatalogueScenarioData: MockDataScenario = {
  ...emptyCatalogueScenarioMeta,
  ...catalogue,
};

export const emptyCatalogueScenario = toHandlers(emptyCatalogueScenarioData);
