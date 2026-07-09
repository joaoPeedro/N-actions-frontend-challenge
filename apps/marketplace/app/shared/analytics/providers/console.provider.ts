import type { AnalyticsEvent, AnalyticsProvider } from "../analytics";

export class ConsoleProvider implements AnalyticsProvider {
  track(event: AnalyticsEvent): void {
    console.warn(`[Analytics] ${event.name}`, event.payload);
  }
}
