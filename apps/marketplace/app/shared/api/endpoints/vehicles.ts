import { http } from "../client/http";
import type { VehicleDetailContract } from "../contracts/vehicle-detail.contract";

export async function fetchVehicleDetailByIdOnly(vehicleId: string): Promise<VehicleDetailContract> {
  return http.get<VehicleDetailContract>(`/api/vehicles/${vehicleId}`);
}
