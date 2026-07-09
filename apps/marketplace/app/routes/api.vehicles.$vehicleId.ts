import type { LoaderFunctionArgs } from "react-router";

import { getVehicleDetailsByVehicleId } from "../features/vehicle-details/services/vehicle-details.service";

export async function loader({ params }: LoaderFunctionArgs) {
  const { vehicleId } = params;
  if (!vehicleId) {
    return new Response("Vehicle ID is required.", { status: 400 });
  }

  try {
    const data = await getVehicleDetailsByVehicleId(vehicleId);
    return Response.json(data);
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
