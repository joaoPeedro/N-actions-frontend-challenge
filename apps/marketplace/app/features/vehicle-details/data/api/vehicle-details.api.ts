import type { VehicleDetailContract } from "@shared/api/contracts/vehicle-detail.contract";
import { fetchVehicleDetailByIdOnly as sharedFetchVehicleDetailByIdOnly } from "@shared/api/endpoints/vehicles";

export async function fetchVehicleDetailById(saleId: string, lotId: string): Promise<VehicleDetailContract | null> {
  try {
    const lot = await sharedFetchVehicleDetailByIdOnly(lotId);
    if (lot?.saleId === saleId) {
      return lot;
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchVehicleDetailByIdOnly(lotId: string): Promise<VehicleDetailContract | null> {
  try {
    return await sharedFetchVehicleDetailByIdOnly(lotId);
  } catch {
    return null;
  }
}