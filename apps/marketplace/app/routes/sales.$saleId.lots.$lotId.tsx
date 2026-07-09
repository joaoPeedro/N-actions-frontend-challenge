import { analytics } from "@shared/analytics";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRef } from "react";
import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { data, isRouteErrorResponse, Link, useLoaderData } from "react-router";

import { Stack, Surface, Text } from "@ds/design-system";

import { SaleSummary } from "../features/vehicle-details/components/SaleSummary";
import { VehicleGallery } from "../features/vehicle-details/components/VehicleGallery";
import { VehiclePrice } from "../features/vehicle-details/components/VehiclePrice";
import { VehicleSpecifications } from "../features/vehicle-details/components/VehicleSpecifications";
import { VehicleSummary } from "../features/vehicle-details/components/VehicleSummary";
import { getVehicleDetails } from "../features/vehicle-details/services/vehicle-details.service";
import { ErrorState } from "../shared/feedback/ErrorState";
import { getVehicleDetailsCacheControl } from "@shared/http";
import { seconds } from "../shared/utils/time";

import styles from "./VehicleDetailsPage.module.css";

export async function loader({ params }: LoaderFunctionArgs) {
  const { saleId, lotId } = params;
  if (!saleId || !lotId) {
    throw new Response("Missing parameters", { status: 400 });
  }

  const result = await getVehicleDetails(saleId, lotId);

  return data(result, {
    headers: { "Cache-Control": getVehicleDetailsCacheControl(result) },
  });
}

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export default function VehicleDetailsRoute() {
  const initialData = useLoaderData<typeof loader>();

  const { data } = useQuery({
    queryKey:
      initialData.type === "available"
        ? ["vehicle", initialData.sale.id, initialData.lot.id]
        : ["vehicle", initialData.type],
    queryFn: async () => {
      if (initialData.type !== "available") {
        return initialData;
      }
      return getVehicleDetails(initialData.sale.id, initialData.lot.id);
    },
    initialData: () => initialData,
    // Poll dynamic values (like bid price/sale status) every 5 seconds ONLY if the sale is live
    refetchInterval:
      initialData.type === "available" && initialData.sale.state === "live" ? seconds(5) : false,
    // Refresh potentially stale auction data whenever the user returns to the application
  });
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    if (data.type === "available") {
      analytics.vehicleViewed({ vehicleId: data.lot.id, saleId: data.sale.id });

      hasTracked.current = true;
    }
  }, [data]);

  if (data.type === "not-found") {
    return (
      <div className={styles.stateContainer}>
        <Stack gap="large" align="center">
          <Text as="h1" variant="h1">
            Vehicle Not Found
          </Text>
          <Text as="p" variant="body" color="secondary">
            The vehicle lot you are looking for does not exist in our catalog.
          </Text>
          <Link to="/" className={styles.backButton}>
            Back to Public Sales
          </Link>
        </Stack>
      </div>
    );
  }

  if (data.type === "unavailable") {
    return (
      <div className={styles.stateContainer}>
        <Stack gap="large" align="center">
          <Text as="h1" variant="h1">
            Vehicle Unavailable
          </Text>
          <Text as="p" variant="body" color="secondary">
            This vehicle is not currently available for public viewing.
          </Text>
          <Link to="/" className={styles.backButton}>
            Back to Public Sales
          </Link>
        </Stack>
      </div>
    );
  }

  const { sale, lot } = data;
  const vehicleName = [lot.make, lot.model, lot.derivative].filter(Boolean).join(" ");

  return (
    <div className={styles.pageWrapper}>
      <Stack gap="large">
        <Stack direction="horizontal" justify="start" align="center" >
          <Link to={`/sales/${sale.id}`} className={styles.headerLink}>
            &larr; Back to {sale.title}
          </Link>
        </Stack>
        <main>
          <Stack gap="large">
            <div className={styles.columnsLayout}>
              {/* Left Column: Gallery */}
              <div className={styles.leftColumn}>
                <VehicleGallery imageUrls={lot.imageUrls ?? []} vehicleName={vehicleName} />
              </div>

              {/* Right Column: Pricing, actions & sale info */}
              <div className={styles.rightColumn}>
                <Stack gap="large">
                  <VehicleSummary
                    vehicleId={lot.id}
                    make={lot.make}
                    model={lot.model}
                    lotNumber={lot.lotNumber}
                    mileage={lot.mileage}
                    mileageUnit={lot.mileageUnit}
                    derivative={lot.derivative}
                  />
                  <div className={styles.priceContainer}>
                    <VehiclePrice
                      currentPrice={lot.currentPrice}
                      buyNowPrice={lot.buyNowPrice}
                      currency={lot.currency}
                    />
                  </div>
                  <SaleSummary sale={sale} />
                </Stack>
              </div>
            </div>

            <hr className={styles.divider} />

            {/* Specifications */}
            <VehicleSpecifications
              make={lot.make}
              model={lot.model}
              lotNumber={lot.lotNumber}
              registrationDate={lot.registrationDate}
              registrationYear={lot.registrationYear}
              mileage={lot.mileage}
              mileageUnit={lot.mileageUnit}
              fuelType={lot.fuelType}
              transmission={lot.transmission}
              bodyType={lot.bodyType}
              colour={lot.colour}
              countryCode={lot.countryCode}
            />

            {/* Equipment */}
            {lot.equipment && lot.equipment.length > 0 && (
              <Stack gap="medium">
                <Text as="h2" variant="h2">
                  Equipment
                </Text>
                <Surface variant="card" radius="medium" className={styles.equipmentCard}>
                  <ul className={styles.equipmentList}>
                    {lot.equipment.map((item) => (
                      <li key={item}>
                        <Text as="span" variant="body-semibold">
                          {item}
                        </Text>
                      </li>
                    ))}
                  </ul>
                </Surface>
              </Stack>
            )}
          </Stack>
        </main>
      </Stack>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let heading = "Error";
  let message = "We encountered an error loading this lot. Please try again later.";

  if (isRouteErrorResponse(error)) {
    heading = `${error.status} - ${error.statusText || "Error"}`;
    message =
      error.status === 404
        ? "The vehicle lot or sale you are looking for does not exist in our system."
        : "Something went wrong loading this page.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className={styles.stateContainer}>
      <Stack gap="medium" align="center">
        <Text as="h1" variant="h1" color="danger">
          {heading}
        </Text>
        <Surface fullWidth maxWidth="medium">
          <ErrorState message={message} />
        </Surface>
        <Link to="/" className={styles.backButton}>
          Back to Public Sales
        </Link>
      </Stack>
    </div>
  );
}
