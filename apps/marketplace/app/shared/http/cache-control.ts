import type { VehicleDetailsResult } from "@features/vehicle-details/services/vehicle-details.service";
import type { SaleStateContract } from "@shared/api/contracts/sale.contract";

export const CACHE_CONTROL = {
  calendar: "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
  live: "private, no-store",
  upcoming: "public, max-age=60, s-maxage=300",
  error: "private, no-store",
} as const;

export function getCatalogueCacheControl(state: SaleStateContract): string {
  return state === "live" ? CACHE_CONTROL.live : CACHE_CONTROL.upcoming;
}

export function getVehicleDetailsCacheControl(result: VehicleDetailsResult): string {
  if (result.type !== "available") {
    return CACHE_CONTROL.error;
  }

  return getCatalogueCacheControl(result.sale.state);
}
