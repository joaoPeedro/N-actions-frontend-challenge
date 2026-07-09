import { publicSaleViewedEvent } from "./events/sale.events";
import { vehicleFavouritedEvent, vehicleViewedEvent } from "./events/vehicle.events";
import { ConsoleProvider } from "./providers/console.provider";
import { NoopProvider } from "./providers/noop.provider";

export interface AnalyticsEvent {
  name: string;
  payload: Record<string, unknown>;
}

export interface AnalyticsProvider {
  track(event: AnalyticsEvent): void;
}

const provider: AnalyticsProvider = import.meta.env.DEV
  ? new ConsoleProvider()
  : new NoopProvider();

function track(event: AnalyticsEvent): void {
  provider.track(event);
}

export const analytics = {
  vehicleViewed(payload: { vehicleId: string; saleId: string }): void {
    track(vehicleViewedEvent(payload));
  },

  vehicleFavouriteToggled(payload: { vehicleId: string; favourited: boolean }): void {
    track(vehicleFavouritedEvent(payload));
  },

  saleViewed(payload: { saleId: string }): void {
    track(publicSaleViewedEvent(payload));
  },
};
