// @vitest-environment jsdom
import { fetch, Headers, Request, Response } from "undici";

Object.assign(globalThis, {
  fetch: fetch as typeof globalThis.fetch,
  Request: Request as typeof globalThis.Request,
  Response: Response as typeof globalThis.Response,
  Headers: Headers as typeof globalThis.Headers,
});

import { VEHICLE_IDS } from "@shared/api/mocks/fixtures";
import { vehicleNotFoundScenario } from "@shared/api/mocks/scenarios";
import { server } from "@shared/api/mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";

import VehicleDetailsRoute, {
  ErrorBoundary,
  loader as vehicleLoader,
} from "../vehicles.$vehicleId";

import "@testing-library/jest-dom/vitest";

const VEHICLE_PATH = `/vehicles/${VEHICLE_IDS.fordFiestaBudget}`;
const VEHICLE_TITLE = "Ford Fiesta 1.0 EcoBoost Zetec";
const UNKNOWN_VEHICLE_PATH = "/vehicles/unknown";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function renderVehicleAt(path: string) {
  const Stub = createRoutesStub([
    {
      id: "vehicle-details",
      path: "/vehicles/:vehicleId",
      Component: VehicleDetailsRoute,
      loader: vehicleLoader,
      ErrorBoundary,
    },
  ]);

  return render(
    <QueryClientProvider client={queryClient}>
      <Stub initialEntries={[path]} />
    </QueryClientProvider>,
  );
}

describe("vehicle details route", () => {
  it("renders vehicle details for an existing vehicle", async () => {
    renderVehicleAt(VEHICLE_PATH);

    expect(
      await screen.findByRole("heading", { name: VEHICLE_TITLE }),
    ).toBeInTheDocument();
    expect(screen.getByText("Current Price")).toBeInTheDocument();
    expect(screen.getByText(/£/)).toBeInTheDocument();
    expect(screen.getByText(/800/)).toBeInTheDocument();
    expect(screen.getAllByText(/125/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/mi/).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("img", { name: /Ford Fiesta.*View 1/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Vehicle Not Found" }),
    ).not.toBeInTheDocument();
  });

  it("returns not found for an unknown vehicle", async () => {
    server.use(...vehicleNotFoundScenario);

    renderVehicleAt(UNKNOWN_VEHICLE_PATH);

    expect(
      await screen.findByRole("heading", { name: "Vehicle Not Found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The vehicle lot you are looking for does not exist in our catalog."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to Public Sales" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: VEHICLE_TITLE }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Current Price")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: /Ford Fiesta/i }),
    ).not.toBeInTheDocument();
  });
});
