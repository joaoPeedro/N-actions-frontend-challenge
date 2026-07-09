export interface VehicleLot {
  id: string;
  make: string;
  model: string;
  registrationYear?: number;
  currentPrice?: number;
  currency?: string;
  mileage?: number;
  mileageUnit?: "km" | "mi";
  imageUrl?: string;
}
