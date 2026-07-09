import type { SaleContract } from "@shared/api/contracts/sale.contract";

import { Stack, Surface, Text } from "@ds/design-system";

import { PublicSaleCard } from "./PublicSaleCard";

import styles from "./PublicSalesCalendar.module.css";

interface PublicSalesListProps {
  sales: SaleContract[];
}

export function EmptyState() {
  return (
    <Surface variant="card" radius="medium" className={styles.empty} role="status">
      <Stack gap="small" align="center">
        <Text as="h3" variant="h3">
          No Public Sales Available
        </Text>
        <Text as="p" variant="body" color="secondary">
          There are currently no active or upcoming public sales in the calendar. Please check back later.
        </Text>
      </Stack>
    </Surface>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <Surface variant="subtle" radius="medium" className={styles.error} role="alert">
      <Stack gap="small" align="center">
        <Text as="h3" variant="h3" inheritColor>
          Error Loading Calendar
        </Text>
        <Text as="p" variant="body" inheritColor>
          {message}
        </Text>
      </Stack>
    </Surface>
  );
}

export function PublicSalesList({ sales }: PublicSalesListProps) {
  if (sales.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className={styles.container} aria-label="Available Public Sales Calendar">
      <div className={styles.list}>
        {sales.map((sale) => (
          <PublicSaleCard key={sale.id} sale={sale} />
        ))}
      </div>
    </section>
  );
}
