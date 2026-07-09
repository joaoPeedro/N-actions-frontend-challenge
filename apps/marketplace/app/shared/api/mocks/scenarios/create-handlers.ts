import { delay, http, HttpResponse } from "msw";
import type { RequestHandler } from "msw";

import type { VehicleLotContract } from "@shared/api/contracts/vehicle-lot.contract";

import type { MockDataScenario } from "./types";

const DEFAULT_VEHICLES_DELAY_MS = 600;

export function createPublicSalesHandlers(
  data: Pick<MockDataScenario, "sales" | "vehicles">,
  options?: { vehiclesDelayMs?: number },
): RequestHandler[] {
  const vehiclesDelayMs = options?.vehiclesDelayMs ?? DEFAULT_VEHICLES_DELAY_MS;

  return [
    http.get("*/api/public-sales", async () => {
      await delay();
      return HttpResponse.json(data.sales);
    }),

    http.get("*/api/public-sales/:saleId", async ({ params }) => {
      await delay();
      const { saleId } = params;
      const sale = data.sales.find((entry) => entry.id === saleId);
      if (!sale) {
        return new HttpResponse(null, { status: 404 });
      }
      return HttpResponse.json(sale);
    }),

    http.get("*/api/public-sales/:saleId/vehicles", async ({ params }) => {
      await delay(vehiclesDelayMs);
      const { saleId } = params;
      const lots = data.vehicles.filter((lot) => lot.saleId === saleId);
      return HttpResponse.json(lots);
    }),
  ];
}

export function createVehicleDetailHandlers(
  vehicles: VehicleLotContract[],
): RequestHandler[] {
  return [
    http.get("*/api/vehicles/:vehicleId", async ({ params }) => {
      await delay();
      const { vehicleId } = params;
      const lot = vehicles.find((entry) => entry.id === vehicleId);
      if (!lot) {
        return new HttpResponse(null, { status: 404 });
      }
      return HttpResponse.json(lot);
    }),
  ];
}

export function toHandlers(
  data: MockDataScenario,
  options?: { vehiclesDelayMs?: number },
): RequestHandler[] {
  return [
    ...createPublicSalesHandlers(data, options),
    ...createVehicleDetailHandlers(data.vehicles),
  ];
}
