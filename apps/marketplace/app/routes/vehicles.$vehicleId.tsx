import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { data } from "react-router";

import { getVehicleDetailsByVehicleId } from "../features/vehicle-details/services/vehicle-details.service";
import { getVehicleDetailsCacheControl } from "@shared/http";

export async function loader({ params }: LoaderFunctionArgs) {
  const { vehicleId } = params;
  if (!vehicleId) {
    throw new Response("Vehicle ID is required.", { status: 400 });
  }

  const result = await getVehicleDetailsByVehicleId(vehicleId);

  return data(result, {
    headers: { "Cache-Control": getVehicleDetailsCacheControl(result) },
  });
}

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

// Re-export the view component and ErrorBoundary from the nested route module
export { default, ErrorBoundary } from "./sales.$saleId.lots.$lotId";
