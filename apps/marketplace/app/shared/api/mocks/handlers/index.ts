import { publicSalesHandlers } from "./public-sales.handlers";
import { vehiclesHandlers } from "./vehicles.handlers";

export const handlers = [
  ...publicSalesHandlers,
  ...vehiclesHandlers,
];
