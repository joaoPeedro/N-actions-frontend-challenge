import type { SaleContract } from "@shared/api/contracts/sale.contract";
import type { VehicleLotContract } from "@shared/api/contracts/vehicle-lot.contract";

import publicSales from "./public-sales.json";
import vehicles from "./vehicles.json";

export const publicSalesFixture = publicSales as SaleContract[];
export const vehiclesFixture = vehicles as VehicleLotContract[];

export const SALE_IDS = {
  fleet: "fleet-auction-july-2026",
  premiumEv: "premium-ev-spring-2026",
  commercial: "commercial-fleet-copenhagen",
  luxury: "luxury-collection-summer",
  nearlyNew: "nearly-new-warehouse",
  empty: "empty-catalogue-preview",
} as const;

export const VEHICLE_IDS = {
  toyotaYarisNoImage: "toyota-yaris-001",
  mercedesLongName: "mercedes-cla-amg-longname-001",
  fordFiestaBudget: "ford-fiesta-001",
  porscheCayennePremium: "porsche-cayenne-001",
} as const;
