export interface VehicleDetailContract {
  id: string;
  saleId: string;
  lotNumber: string;
  make: string;
  model: string;
  derivative?: string;
  registrationYear?: number;
  registrationDate?: string;
  mileage?: number;
  mileageUnit?: "km" | "mi";
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  colour?: string;
  countryCode?: string;
  imageUrls?: string[];
  currentPrice?: number;
  buyNowPrice?: number;
  currency?: string;
  saleStartDateTime?: string;
  saleEndDateTime?: string;
  specification?: Record<string, string | number | boolean | null>;
  equipment?: string[];
}
