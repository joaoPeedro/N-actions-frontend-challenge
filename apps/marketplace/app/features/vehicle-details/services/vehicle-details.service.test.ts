import { fetchSaleContractById } from "@features/public-sales/data/api/sales.api";
import type { SaleContract } from "@shared/api/contracts/sale.contract";
import type { VehicleDetailContract } from "@shared/api/contracts/vehicle-detail.contract";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { fetchVehicleDetailById } from "../data/api/vehicle-details.api";
import { getVehicleDetails } from "./vehicle-details.service";

vi.mock("@features/public-sales/data/api/sales.api", () => ({
  fetchSaleContractById: vi.fn(),
}));

vi.mock("../data/api/vehicle-details.api", () => ({
  fetchVehicleDetailById: vi.fn(),
  fetchVehicleDetailByIdOnly: vi.fn(),
}));

const mockFetchSaleContractById = vi.mocked(fetchSaleContractById);
const mockFetchVehicleDetailById = vi.mocked(fetchVehicleDetailById);

const publicSale: SaleContract = {
  id: "sale-1",
  title: "Public Sale",
  saleType: "public",
  state: "live",
  startDateTime: "2026-07-05T10:00:00Z",
  countryCode: "GB",
  locationType: "online",
  lotCount: 1,
};

const lot: VehicleDetailContract = {
  id: "lot-1",
  saleId: "sale-1",
  lotNumber: "1",
  make: "Acme",
  model: "Roadster",
};

describe("getVehicleDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns not-found when the sale does not exist", async () => {
    mockFetchSaleContractById.mockResolvedValue(undefined);
    mockFetchVehicleDetailById.mockResolvedValue(lot);

    const result = await getVehicleDetails("sale-1", "lot-1");

    expect(result).toEqual({ type: "not-found" });
    expect(mockFetchSaleContractById).toHaveBeenCalledWith("sale-1");
    expect(mockFetchVehicleDetailById).toHaveBeenCalledWith("sale-1", "lot-1");
  });

  it("returns unavailable when the sale is not public", async () => {
    mockFetchSaleContractById.mockResolvedValue({ ...publicSale, saleType: "private" });
    mockFetchVehicleDetailById.mockResolvedValue(lot);

    const result = await getVehicleDetails("sale-1", "lot-1");

    expect(result).toEqual({ type: "unavailable" });
  });

  it("returns not-found when the lot does not exist in the public sale", async () => {
    mockFetchSaleContractById.mockResolvedValue(publicSale);
    mockFetchVehicleDetailById.mockResolvedValue(null);

    const result = await getVehicleDetails("sale-1", "lot-1");

    expect(result).toEqual({ type: "not-found" });
  });

  it("returns available when the sale is public and the lot exists", async () => {
    mockFetchSaleContractById.mockResolvedValue(publicSale);
    mockFetchVehicleDetailById.mockResolvedValue(lot);

    const result = await getVehicleDetails("sale-1", "lot-1");

    expect(result).toEqual({
      type: "available",
      sale: publicSale,
      lot,
    });
  });
});
