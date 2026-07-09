import { useRef } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { Form, isRouteErrorResponse, useLoaderData } from "react-router";

import { Button, Select, SELECT_EMPTY_VALUE, Stack, Text } from "@ds/design-system";

import { ErrorState, PublicSalesList } from "../features/public-sales/components/PublicSalesList";
import { getPublicSales } from "../features/public-sales/services/public-sales.service";
import { PageTitleSection } from "@shared/components/layout";
import { CACHE_CONTROL } from "@shared/http";

import styles from "../features/public-sales/components/PublicSalesCalendar.module.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const state = url.searchParams.get("state") || undefined;
  const countryCode = url.searchParams.get("countryCode") || undefined;
  const locationType = url.searchParams.get("locationType") || undefined;

  const sales = await getPublicSales({ state, countryCode, locationType });
  return { 
    sales, 
    filters: { state, countryCode, locationType } 
  };
}

export function headers() {
  return { "Cache-Control": CACHE_CONTROL.calendar };
}

export default function Index() {
  const { sales, filters } = useLoaderData<typeof loader>();
  const formRef = useRef<HTMLFormElement>(null);

  const submitFilters = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className={styles.pageWrapper}>
      <Stack gap="large">
        <PageTitleSection>
          <Text as="h1" variant="h1">
            Public Sales Calendar
          </Text>
          <Text as="p" variant="body" color="secondary">
            Browse active and upcoming auctions and sales events.
          </Text>
        </PageTitleSection>
        
        <Form
          ref={formRef}
          method="get"
          className={styles.filterBar}
          role="search"
          aria-label="Filter Public Sales"
        >
          <div className={styles.filterGroup}>
            <Select
              id="filter-state"
              label="Status"
              name="state"
              key={`filter-state-${filters.state ?? ""}`}
              defaultValue={filters.state ?? SELECT_EMPTY_VALUE}
              emptyValue={SELECT_EMPTY_VALUE}
              onValueChange={submitFilters}
              placeholder="All Statuses"
            >
              <Select.Item value={SELECT_EMPTY_VALUE}>All Statuses</Select.Item>
              <Select.Item value="live">Live / Current</Select.Item>
              <Select.Item value="upcoming">Upcoming</Select.Item>
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              id="filter-country"
              label="Country"
              name="countryCode"
              key={`filter-country-${filters.countryCode ?? ""}`}
              defaultValue={filters.countryCode ?? SELECT_EMPTY_VALUE}
              emptyValue={SELECT_EMPTY_VALUE}
              onValueChange={submitFilters}
              placeholder="All Countries"
            >
              <Select.Item value={SELECT_EMPTY_VALUE}>All Countries</Select.Item>
              <Select.Item value="US">United States (US)</Select.Item>
              <Select.Item value="GB">United Kingdom (GB)</Select.Item>
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              id="filter-location"
              label="Location Type"
              name="locationType"
              key={`filter-location-${filters.locationType ?? ""}`}
              defaultValue={filters.locationType ?? SELECT_EMPTY_VALUE}
              emptyValue={SELECT_EMPTY_VALUE}
              onValueChange={submitFilters}
              placeholder="All Types"
            >
              <Select.Item value={SELECT_EMPTY_VALUE}>All Types</Select.Item>
              <Select.Item value="online">Online</Select.Item>
              <Select.Item value="in-person">In-Person</Select.Item>
              <Select.Item value="hybrid">Hybrid</Select.Item>
            </Select>
          </div>

          <noscript>
            <div className={styles.filterGroup}>
              <label htmlFor="filter-state-fallback" className={styles.filterLabel}>Status</label>
              <select
                id="filter-state-fallback"
                name="state"
                defaultValue={filters.state || ""}
              >
                <option value="">All Statuses</option>
                <option value="live">Live / Current</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="filter-country-fallback" className={styles.filterLabel}>Country</label>
              <select
                id="filter-country-fallback"
                name="countryCode"
                defaultValue={filters.countryCode || ""}
              >
                <option value="">All Countries</option>
                <option value="US">United States (US)</option>
                <option value="GB">United Kingdom (GB)</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="filter-location-fallback" className={styles.filterLabel}>Location Type</label>
              <select
                id="filter-location-fallback"
                name="locationType"
                defaultValue={filters.locationType || ""}
              >
                <option value="">All Types</option>
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <Button type="submit" variant="primary">
              Apply Filters
            </Button>
          </noscript>
        </Form>

        <main role="main">
          <PublicSalesList sales={sales} />
        </main>
      </Stack>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "We encountered an error loading the calendar. Please try again later.";
  if (isRouteErrorResponse(error)) {
    message = `Error ${error.status}: ${error.statusText || "Something went wrong"}`;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className={styles.pageWrapper}>
      <ErrorState message={message} />
    </div>
  );
}
