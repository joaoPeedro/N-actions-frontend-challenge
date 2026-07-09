import { SALE_IDS, VEHICLE_IDS } from "../../fixtures";
import { toHandlers } from "../create-handlers";
import { saleById, vehicleById } from "../select";
import type { MockDataScenario, MockScenarioMeta } from "../types";

/**
 * Catalogue with a vehicle that has no image URLs.
 *
 * @intent Validate placeholder image behaviour on VehicleLotCard.
 * @consumers Integration Tests, Storybook card placeholder examples
 */
export const missingImagesScenarioMeta: MockScenarioMeta = {
  intent: "Single vehicle lot without images to exercise card placeholder rendering.",
  consumers: ["Integration Tests", "Storybook"],
};

export const missingImagesScenarioData: MockDataScenario = {
  ...missingImagesScenarioMeta,
  sales: [saleById(SALE_IDS.fleet)],
  vehicles: [vehicleById(VEHICLE_IDS.toyotaYarisNoImage)],
};

export const missingImagesScenario = toHandlers(missingImagesScenarioData);
