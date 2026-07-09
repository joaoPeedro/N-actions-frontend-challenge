import { http } from "../client/http";
import type { SaleContract } from "../contracts/sale.contract";
import type { VehicleLotContract } from "../contracts/vehicle-lot.contract";

export async function fetchSaleContracts(): Promise<SaleContract[]> {
  return http.get<SaleContract[]>("/api/public-sales");
}

export async function fetchSaleContractById(id: string): Promise<SaleContract> {
  return http.get<SaleContract>(`/api/public-sales/${id}`);
}

export async function fetchVehicleLotsBySaleId(saleId: string): Promise<VehicleLotContract[]> {
  return http.get<VehicleLotContract[]>(`/api/public-sales/${saleId}/vehicles`);
}
