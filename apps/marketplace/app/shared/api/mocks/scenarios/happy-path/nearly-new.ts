import { SALE_IDS } from "../../fixtures";
import { toHandlers } from "../create-handlers";
import { catalogueScenario } from "../select";
import type { MockDataScenario, MockScenarioMeta } from "../types";

/**
 * Nearly new warehouse clearance with very low mileage vehicles.
 *
 * @intent Validate low-mileage metadata and upcoming online sale presentation.
 * @consumers Storybook, integration tests for nearly-new catalogue flows
 */
export const nearlyNewScenarioMeta: MockScenarioMeta = {
  intent: "Low-mileage ex-demonstrator vehicles for nearly-new warehouse clearance.",
  consumers: ["Storybook", "Integration Tests", "E2E Tests"],
};

const catalogue = catalogueScenario(SALE_IDS.nearlyNew);

export const nearlyNewScenarioData: MockDataScenario = {
  ...nearlyNewScenarioMeta,
  ...catalogue,
};

export const nearlyNewScenario = toHandlers(nearlyNewScenarioData);
