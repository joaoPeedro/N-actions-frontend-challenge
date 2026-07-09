// Happy path
export {
  commercialVehiclesScenario,
  commercialVehiclesScenarioData,
  commercialVehiclesScenarioMeta,
} from "./happy-path/commercial-vehicles";
export {
  electricVehiclesScenario,
  electricVehiclesScenarioData,
  electricVehiclesScenarioMeta,
} from "./happy-path/electric-vehicles";
export {
  fleetCatalogueScenario,
  fleetCatalogueScenarioData,
  fleetCatalogueScenarioMeta,
} from "./happy-path/fleet-catalogue";
export {
  fullDatasetPublicSalesHandlers,
  fullDatasetScenario,
  fullDatasetScenarioData,
  fullDatasetScenarioMeta,
  fullDatasetVehicleHandlers,
  publicCatalogueListScenario,
  publicCatalogueListScenarioData,
  publicCatalogueListScenarioMeta,
} from "./happy-path/full-dataset";
export {
  nearlyNewScenario,
  nearlyNewScenarioData,
  nearlyNewScenarioMeta,
} from "./happy-path/nearly-new";
export {
  premiumCatalogueScenario,
  premiumCatalogueScenarioData,
  premiumCatalogueScenarioMeta,
} from "./happy-path/premium-catalogue";

// Edge cases
export {
  emptyCatalogueScenario,
  emptyCatalogueScenarioData,
  emptyCatalogueScenarioMeta,
} from "./edge-cases/empty-catalogue";
export {
  longVehicleNamesScenario,
  longVehicleNamesScenarioData,
  longVehicleNamesScenarioMeta,
} from "./edge-cases/long-vehicle-names";
export {
  missingImagesScenario,
  missingImagesScenarioData,
  missingImagesScenarioMeta,
} from "./edge-cases/missing-images";

// Error
export {
  catalogueNotFoundScenario,
  catalogueNotFoundScenarioMeta,
} from "./error/catalogue-not-found";
export {
  serverErrorScenario,
  serverErrorScenarioMeta,
} from "./error/server-error";
export {
  vehicleNotFoundScenario,
  vehicleNotFoundScenarioMeta,
} from "./error/vehicle-not-found";

// Infrastructure
export {
  createPublicSalesHandlers,
  createVehicleDetailHandlers,
  toHandlers,
} from "./create-handlers";
export {
  allSales,
  allVehicles,
  catalogueScenario,
  publicSalesOnly,
  saleById,
  vehicleById,
  vehiclesForSale,
} from "./select";
export type {
  MockDataScenario,
  MockScenarioHandlers,
  MockScenarioMeta,
} from "./types";
