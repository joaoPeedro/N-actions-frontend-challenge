import type { VehicleLotContract } from "@shared/api/contracts/vehicle-lot.contract";

import type { VehicleLot } from "../domain/vehicle-lot";

export function mapVehicleLotContract(contract: VehicleLotContract): VehicleLot {
  return {
    id: contract.id,
    make: contract.make,
    model: contract.model,
    registrationYear: contract.registrationYear,
    currentPrice: contract.currentPrice,
    currency: contract.currency,
    mileage: contract.mileage,
    mileageUnit: contract.mileageUnit,
    imageUrl: contract.imageUrls?.[0],
  };
}

export function mapVehicleLotContracts(contracts: VehicleLotContract[]): VehicleLot[] {
  return contracts.map(mapVehicleLotContract);
}
