import type { AnalyticsEvent } from "../analytics";

export function vehicleViewedEvent(payload: {
  vehicleId: string;
  saleId: string;
}): AnalyticsEvent {
  return {
    name: "Vehicle Viewed",
    payload,
  };
}

export function vehicleFavouritedEvent(payload: {
  vehicleId: string;
  favourited: boolean;
}): AnalyticsEvent {
  return {
    name: "Vehicle Favourited",
    payload,
  };
}
