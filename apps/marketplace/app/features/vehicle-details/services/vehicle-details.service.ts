import { fetchSaleContractById } from "@features/public-sales/data/api/sales.api";
import type { SaleContract } from "@shared/api/contracts/sale.contract";
import type { VehicleDetailContract } from "@shared/api/contracts/vehicle-detail.contract";

import {
  fetchVehicleDetailById,
  fetchVehicleDetailByIdOnly,
} from "../data/api/vehicle-details.api";

export type VehicleDetailsResult =
  | { type: "available"; sale: SaleContract; lot: VehicleDetailContract }
  | { type: "unavailable" }
  | { type: "not-found" };

export async function getVehicleDetails(
  saleId: string,
  lotId: string,
): Promise<VehicleDetailsResult> {
  // 1. Fetch sale and lot in parallel
  const [sale, lot] = await Promise.all([
    fetchSaleContractById(saleId),
    fetchVehicleDetailById(saleId, lotId),
  ]);

  // 2. If the sale does not exist, return not-found
  if (!sale) {
    return { type: "not-found" };
  }

  // 3. If the sale exists but is not public, return unavailable
  if (sale.saleType !== "public") {
    return { type: "unavailable" };
  }

  // 4. If the lot doesn't exist in this public sale, return not-found
  if (!lot) {
    return { type: "not-found" };
  }

  // 5. Otherwise, the vehicle is public and available
  return {
    type: "available",
    sale,
    lot,
  };
}

export async function getVehicleDetailsByVehicleId(
  vehicleId: string,
): Promise<VehicleDetailsResult> {
  const lotContract = await fetchVehicleDetailByIdOnly(vehicleId);
  if (!lotContract) {
    return { type: "not-found" };
  }

  return getVehicleDetails(lotContract.saleId, vehicleId);
}
