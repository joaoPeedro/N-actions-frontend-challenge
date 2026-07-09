import type { SaleContract } from "@shared/api/contracts/sale.contract";

export function mapPublicSaleContract(contract: SaleContract): SaleContract {
  return contract;
}

export function mapPublicSaleContracts(contracts: SaleContract[]): SaleContract[] {
  return contracts;
}
