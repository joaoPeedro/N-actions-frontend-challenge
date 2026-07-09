import { SALE_IDS } from "../../fixtures";
import { toHandlers } from "../create-handlers";
import { catalogueScenario } from "../select";
import type { MockDataScenario, MockScenarioMeta } from "../types";

/**
 * Electric-only catalogue with premium EV manufacturers.
 *
 * @intent Validate EV-specific metadata, pricing and battery specification display.
 * @consumers Storybook, integration tests for electric catalogue flows
 */
export const electricVehiclesScenarioMeta: MockScenarioMeta = {
  intent: "Battery-electric vehicle catalogue with Tesla, BMW, Audi and Hyundai lots.",
  consumers: ["Storybook", "Integration Tests", "E2E Tests"],
};

const catalogue = catalogueScenario(SALE_IDS.premiumEv);

export const electricVehiclesScenarioData: MockDataScenario = {
  ...electricVehiclesScenarioMeta,
  ...catalogue,
};

export const electricVehiclesScenario = toHandlers(electricVehiclesScenarioData);
