// @vitest-environment jsdom
import { fetch, Headers, Request, Response } from "undici";

Object.assign(globalThis, {
  fetch: fetch as typeof globalThis.fetch,
  Request: Request as typeof globalThis.Request,
  Response: Response as typeof globalThis.Response,
  Headers: Headers as typeof globalThis.Headers,
});

import { SALE_IDS } from "@shared/api/mocks/fixtures";
import { catalogueNotFoundScenario } from "@shared/api/mocks/scenarios";
import { server } from "@shared/api/mocks/server";
import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";

import PublicSaleCatalogueRoute, {
  ErrorBoundary,
  loader,
} from "../sales.$saleId";

import "@testing-library/jest-dom/vitest";

const PUBLIC_SALE_PATH = `/sales/${SALE_IDS.fleet}`;
const PUBLIC_SALE_TITLE = "July Fleet Auction";
const UNKNOWN_SALE_PATH = "/sales/unknown-sale";
const PRIVATE_SALE_PATH = "/sales/private-collector-de-2026";
const PRIVATE_SALE_TITLE = "Private Collector Showcase";

function renderCatalogueAt(path: string) {
  const Stub = createRoutesStub([
    {
      id: "sale-catalogue",
      path: "/sales/:saleId",
      Component: PublicSaleCatalogueRoute,
      loader,
      ErrorBoundary,
    },
  ]);

  return render(<Stub initialEntries={[path]} />);
}

describe("public sale access boundary", () => {
  it("renders a public catalogue", async () => {
    renderCatalogueAt(PUBLIC_SALE_PATH);

    expect(
      await screen.findByRole("heading", { name: PUBLIC_SALE_TITLE }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("region", { name: "Vehicle Lots Catalog" }),
    ).toBeInTheDocument();
    expect(
      (await screen.findAllByRole("link", { name: /View details for/i })).length,
    ).toBeGreaterThan(0);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("returns unavailable for an unknown sale", async () => {
    server.use(...catalogueNotFoundScenario);

    renderCatalogueAt(UNKNOWN_SALE_PATH);

    expect(
      await screen.findByRole("heading", { name: "404 - Not Found" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "The public sale you are looking for does not exist in our system.",
    );
    expect(
      screen.queryByRole("heading", { name: PUBLIC_SALE_TITLE }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("region", { name: "Vehicle Lots Catalog" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /View details for/i }),
    ).not.toBeInTheDocument();
  });

  it("does not expose private catalogue information", async () => {
    renderCatalogueAt(PRIVATE_SALE_PATH);

    expect(
      await screen.findByRole("heading", { name: "404 - Not Found" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "The public sale you are looking for does not exist in our system.",
    );
    expect(screen.queryByText(PRIVATE_SALE_TITLE)).not.toBeInTheDocument();
    expect(screen.queryByText(/exclusive/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("region", { name: "Vehicle Lots Catalog" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /View details for/i }),
    ).not.toBeInTheDocument();
  });
});
