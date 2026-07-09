import { analytics } from "@shared/analytics";
import { Suspense, useEffect, useRef } from "react";
import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { Await, data, isRouteErrorResponse, Link, useLoaderData } from "react-router";

import { Stack, Surface, Text } from "@ds/design-system";

import { VehicleLotGrid } from "../features/public-sale-catalogue/components/VehicleLotGrid";
import { VehicleLotGridSkeleton } from "../features/public-sale-catalogue/components/VehicleLotGridSkeleton";
import { fetchVehicleLotsBySaleId } from "../features/public-sale-catalogue/data/api/public-sale-catalogue.api";
import { mapVehicleLotContracts } from "../features/public-sale-catalogue/mappers/vehicle-lot.mapper";
import { SaleHeader } from "../features/public-sales/components/SaleHeader";
import { getPublicSaleById } from "../features/public-sales/services/public-sales.service";
import { ErrorState } from "../shared/feedback/ErrorState";
import { getCatalogueCacheControl } from "@shared/http";

import styles from "./VehicleDetailsPage.module.css";

export async function loader({ params }: LoaderFunctionArgs) {
  const { saleId } = params;
  if (!saleId) {
    throw new Response("Missing Sale ID", { status: 400 });
  }

  const sale = await getPublicSaleById(saleId);
  if (!sale) {
    throw new Response("Public Sale Not Found", { status: 404, statusText: "Not Found" });
  }

  const lots = fetchVehicleLotsBySaleId(saleId).then(mapVehicleLotContracts);

  return data(
    { sale, lots },
    { headers: { "Cache-Control": getCatalogueCacheControl(sale.state) } },
  );
}

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export default function PublicSaleCatalogueRoute() {
  const { sale, lots } = useLoaderData<typeof loader>();

  const hasTracked = useRef(false);
  useEffect(() => {
    if (hasTracked.current) return;

    analytics.saleViewed({ saleId: sale.id });
    hasTracked.current = true;
  }, [sale.id]);

  return (
    <div className={styles.pageWrapper}>
      <Stack gap="large">
        <Stack direction="horizontal" justify="start" align="center" >
          <Link to="/" className={styles.headerLink}>
            &larr; Back to Public Sales
          </Link>
        </Stack>
        <main>
          <Stack gap="large">
            <SaleHeader sale={sale} />
            <Suspense fallback={<VehicleLotGridSkeleton />}>
              <Await resolve={lots}>
                {(resolvedLots) => (
                  <VehicleLotGrid lots={resolvedLots} saleId={sale.id} />
                )}
              </Await>
            </Suspense>
          </Stack>
        </main>
      </Stack>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let heading = "Error";
  let message = "We encountered an error loading this catalogue. Please try again later.";

  if (isRouteErrorResponse(error)) {
    heading = `${error.status} - ${error.statusText || "Error"}`;
    message =
      error.status === 404
        ? "The public sale you are looking for does not exist in our system."
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
