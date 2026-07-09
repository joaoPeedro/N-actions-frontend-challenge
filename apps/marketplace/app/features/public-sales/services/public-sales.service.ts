import type { SaleContract } from "@shared/api/contracts/sale.contract";

import { fetchSaleContractById, fetchSaleContracts } from "../data/api/sales.api";
import { mapPublicSaleContract, mapPublicSaleContracts } from "../mappers/public-sales.mapper";

export interface PublicSalesFilters {
  state?: string;
  countryCode?: string;
  locationType?: string;
}

export async function getPublicSales(filters?: PublicSalesFilters): Promise<SaleContract[]> {
  const contracts = await fetchSaleContracts();
  const { state, countryCode, locationType } = filters ?? {};

  const filtered = contracts.filter((c) => {
    if (c.saleType !== "public") return false;
    if (state && c.state !== state) return false;
    if (countryCode && c.countryCode !== countryCode) return false;
    if (locationType && c.locationType !== locationType) return false;

    return true;
  });

  return mapPublicSaleContracts(filtered);
}

export async function getPublicSaleById(id: string): Promise<SaleContract | null> {
  const contract = await fetchSaleContractById(id);
  // Business Rule: If contract exists but is not public, return null
  if (contract?.saleType !== "public") {
    return null;
  }
  return mapPublicSaleContract(contract);
}
