import type { SaleContract } from "@shared/api/contracts/sale.contract";
import type { VehicleLotContract } from "@shared/api/contracts/vehicle-lot.contract";
import type { RequestHandler } from "msw";

export interface MockScenarioMeta {
  /** Business intent — what this scenario represents */
  intent: string;
  /** Primary consumers: Integration Tests, E2E, Storybook, MSW */
  consumers: readonly string[];
}

export interface MockDataScenario extends MockScenarioMeta {
  sales: SaleContract[];
  vehicles: VehicleLotContract[];
}

export type MockScenarioHandlers = RequestHandler[] & { meta?: MockScenarioMeta };
