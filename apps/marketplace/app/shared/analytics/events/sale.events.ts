import type { AnalyticsEvent } from "../analytics";

export function publicSaleViewedEvent(payload: { saleId: string }): AnalyticsEvent {
  return {
    name: "Public Sale Viewed",
    payload,
  };
}
