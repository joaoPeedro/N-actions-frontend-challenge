import { SALE_IDS, VEHICLE_IDS } from "../../fixtures";
import { toHandlers } from "../create-handlers";
import { saleById, vehicleById } from "../select";
import type { MockDataScenario, MockScenarioMeta } from "../types";

/**
 * Catalogue with an unusually long vehicle marketing title.
 *
 * @intent Validate text truncation and responsive card layout with long derivatives.
 * @consumers Integration Tests, Storybook typography edge cases
 */
export const longVehicleNamesScenarioMeta: MockScenarioMeta = {
  intent: "Vehicle with an extended derivative name to exercise truncation and wrapping.",
  consumers: ["Integration Tests", "Storybook"],
};

export const longVehicleNamesScenarioData: MockDataScenario = {
  ...longVehicleNamesScenarioMeta,
  sales: [saleById(SALE_IDS.luxury)],
  vehicles: [vehicleById(VEHICLE_IDS.mercedesLongName)],
};

export const longVehicleNamesScenario = toHandlers(longVehicleNamesScenarioData);
