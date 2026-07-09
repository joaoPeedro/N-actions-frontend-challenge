import type { AnalyticsEvent, AnalyticsProvider } from "../analytics";

export class NoopProvider implements AnalyticsProvider {
  track(_event: AnalyticsEvent): void {
    // Intentionally performs no action
  }
}
