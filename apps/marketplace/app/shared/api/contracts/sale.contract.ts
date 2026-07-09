export type SaleTypeContract = "public" | "private" | "exclusive";
export type SaleStateContract = "live" | "upcoming";
export type SaleLocationTypeContract = "online" | "in-person" | "hybrid";

export interface SaleContract {
  id: string;
  title: string;
  description?: string;
  saleType: SaleTypeContract;
  state: SaleStateContract;
  startDateTime: string;
  endDateTime?: string;
  countryCode: string;
  location?: string;
  locationType: SaleLocationTypeContract;
  lotCount: number;
  heroImageUrl?: string;
}
