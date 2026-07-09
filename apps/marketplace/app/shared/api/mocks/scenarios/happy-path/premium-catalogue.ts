import { SALE_IDS } from "../../fixtures";
import { toHandlers } from "../create-handlers";
import { catalogueScenario } from "../select";
import type { MockDataScenario, MockScenarioMeta } from "../types";

/**
 * Premium luxury catalogue with BMW, Mercedes-Benz, Porsche and Audi.
 *
 * @intent Exercise high-value vehicle cards and luxury sale metadata.
 * @consumers Storybook VehicleLotGrid, integration tests for `/sales/:saleId`
 */
export const premiumCatalogueScenarioMeta: MockScenarioMeta = {
  intent: "Luxury manufacturer catalogue with premium pricing and concierge sale metadata.",
  consumers: ["Storybook", "Integration Tests", "E2E Tests"],
};

const catalogue = catalogueScenario(SALE_IDS.luxury);

export const premiumCatalogueScenarioData: MockDataScenario = {
  ...premiumCatalogueScenarioMeta,
  ...catalogue,
};

export const premiumCatalogueScenario = toHandlers(premiumCatalogueScenarioData);
