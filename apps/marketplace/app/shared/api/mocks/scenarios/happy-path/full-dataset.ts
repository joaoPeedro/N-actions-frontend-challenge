import type { MockDataScenario, MockScenarioMeta } from "../types";
import { createPublicSalesHandlers, createVehicleDetailHandlers, toHandlers } from "../create-handlers";
import { allSales, allVehicles, publicSalesOnly } from "../select";

/**
 * Complete mock dataset for local development and broad regression coverage.
 *
 * @intent Serve the full MOCK-001A fixture set through MSW without manual assembly.
 * @consumers MSW default handlers, yarn dev, smoke tests
 */
export const fullDatasetScenarioMeta: MockScenarioMeta = {
  intent: "Complete development dataset with all public and exclusive sales plus every vehicle lot.",
  consumers: ["MSW", "yarn dev", "smoke tests"],
};

export const fullDatasetScenarioData: MockDataScenario = {
  ...fullDatasetScenarioMeta,
  sales: allSales(),
  vehicles: allVehicles(),
};

export const fullDatasetScenario = toHandlers(fullDatasetScenarioData);

export const fullDatasetPublicSalesHandlers = createPublicSalesHandlers(fullDatasetScenarioData);
export const fullDatasetVehicleHandlers = createVehicleDetailHandlers(fullDatasetScenarioData.vehicles);

/**
 * Public sales calendar list — public sales only, all vehicles available for detail routes.
 *
 * @intent Exercise the Public Sales Calendar with realistic filterable catalogue metadata.
 * @consumers Integration tests for `/`, Storybook calendar examples
 */
export const publicCatalogueListScenarioMeta: MockScenarioMeta = {
  intent: "Calendar index with public sales only while retaining full vehicle detail coverage.",
  consumers: ["Integration Tests", "Storybook"],
};

export const publicCatalogueListScenarioData: MockDataScenario = {
  ...publicCatalogueListScenarioMeta,
  sales: publicSalesOnly(),
  vehicles: allVehicles(),
};

export const publicCatalogueListScenario = toHandlers(publicCatalogueListScenarioData);
