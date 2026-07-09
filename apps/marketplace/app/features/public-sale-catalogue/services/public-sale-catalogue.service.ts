import { getPublicSaleById } from "@features/public-sales/services/public-sales.service";
import type { SaleContract } from "@shared/api/contracts/sale.contract";

import { fetchVehicleLotsBySaleId } from "../data/api/public-sale-catalogue.api";
import type { VehicleLot } from "../domain/vehicle-lot";
import { mapVehicleLotContracts } from "../mappers/vehicle-lot.mapper";

export async function getSaleCatalogue(saleId: string): Promise<{ sale: SaleContract | undefined; lots: VehicleLot[] }> {
  const sale = await getPublicSaleById(saleId);
  if (!sale) {
    return { sale: undefined, lots: [] };
  }

  const contracts = await fetchVehicleLotsBySaleId(saleId);
  const lots = mapVehicleLotContracts(contracts);

  return { sale, lots };
}
