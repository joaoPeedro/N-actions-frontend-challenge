import type { VehicleDetailsResult } from "@features/vehicle-details/services/vehicle-details.service";

import {
  CACHE_CONTROL,
  getCatalogueCacheControl,
  getVehicleDetailsCacheControl,
} from "./cache-control";

describe("getCatalogueCacheControl", () => {
  it("returns no-store for live sales", () => {
    expect(getCatalogueCacheControl("live")).toBe(CACHE_CONTROL.live);
  });

  it("returns short TTL for upcoming sales", () => {
    expect(getCatalogueCacheControl("upcoming")).toBe(CACHE_CONTROL.upcoming);
  });
});

describe("getVehicleDetailsCacheControl", () => {
  const availableLive: VehicleDetailsResult = {
    type: "available",
    sale: {
      id: "sale-1",
      title: "Live Sale",
      saleType: "public",
      state: "live",
      startDateTime: "2026-07-05T10:00:00Z",
      countryCode: "GB",
      locationType: "online",
      lotCount: 1,
    },
    lot: {
      id: "veh-1",
      saleId: "sale-1",
      lotNumber: "1",
      make: "Acme",
      model: "Roadster",
    },
  };

  const availableUpcoming: VehicleDetailsResult = {
    ...availableLive,
    sale: { ...availableLive.sale, state: "upcoming" },
  };

  it("returns no-store for available live vehicles", () => {
    expect(getVehicleDetailsCacheControl(availableLive)).toBe(CACHE_CONTROL.live);
  });

  it("returns short TTL for available upcoming vehicles", () => {
    expect(getVehicleDetailsCacheControl(availableUpcoming)).toBe(CACHE_CONTROL.upcoming);
  });

  it("returns no-store for not-found results", () => {
    expect(getVehicleDetailsCacheControl({ type: "not-found" })).toBe(CACHE_CONTROL.error);
  });

  it("returns no-store for unavailable results", () => {
    expect(getVehicleDetailsCacheControl({ type: "unavailable" })).toBe(CACHE_CONTROL.error);
  });
});
