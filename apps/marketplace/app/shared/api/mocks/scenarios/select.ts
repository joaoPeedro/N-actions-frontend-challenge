import {
  publicSalesFixture,
  vehiclesFixture,
} from "../fixtures";

export function allSales() {
  return publicSalesFixture;
}

export function allVehicles() {
  return vehiclesFixture;
}

export function publicSalesOnly() {
  return publicSalesFixture.filter((sale) => sale.saleType === "public");
}

export function saleById(saleId: string) {
  const sale = publicSalesFixture.find((entry) => entry.id === saleId);
  if (!sale) {
    throw new Error(`Sale fixture not found: ${saleId}`);
  }
  return sale;
}

export function vehiclesForSale(saleId: string) {
  return vehiclesFixture.filter((vehicle) => vehicle.saleId === saleId);
}

export function vehicleById(vehicleId: string) {
  const vehicle = vehiclesFixture.find((entry) => entry.id === vehicleId);
  if (!vehicle) {
    throw new Error(`Vehicle fixture not found: ${vehicleId}`);
  }
  return vehicle;
}

export function catalogueScenario(saleId: string) {
  return {
    sales: [saleById(saleId)],
    vehicles: vehiclesForSale(saleId),
  };
}
