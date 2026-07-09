import type { VehicleLotContract } from "@shared/api/contracts/vehicle-lot.contract";
import { fetchVehicleLotsBySaleId as sharedFetchVehicleLotsBySaleId } from "@shared/api/endpoints/public-sales";

export async function fetchVehicleLotsBySaleId(saleId: string): Promise<VehicleLotContract[]> {
  return sharedFetchVehicleLotsBySaleId(saleId);
}
