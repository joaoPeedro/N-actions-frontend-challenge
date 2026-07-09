import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("sales/:saleId", "routes/sales.$saleId.tsx"),
  route("sales/:saleId/lots/:lotId", "routes/sales.$saleId.lots.$lotId.tsx"), // touched to reload dev server
  route("vehicles/:vehicleId", "routes/vehicles.$vehicleId.tsx"), // touched to reload
  route("api/vehicles/:vehicleId", "routes/api.vehicles.$vehicleId.ts"),
] satisfies RouteConfig;
