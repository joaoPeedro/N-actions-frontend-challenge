import type { SaleContract } from "@shared/api/contracts/sale.contract";
import {
  fetchSaleContractById as sharedFetchSaleContractById,
  fetchSaleContracts as sharedFetchSaleContracts,
} from "@shared/api/endpoints/public-sales";

export async function fetchSaleContracts(): Promise<SaleContract[]> {
  return sharedFetchSaleContracts();
}

export async function fetchSaleContractById(id: string): Promise<SaleContract | undefined> {
  try {
    return await sharedFetchSaleContractById(id);
  } catch {
    return undefined;
  }
}
