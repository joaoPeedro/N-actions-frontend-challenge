import type { SaleContract } from "@shared/api/contracts/sale.contract";
import { formatDateTime } from "@shared/formatting";
import { Link } from "react-router";

import { Stack, Surface, Text } from "@ds/design-system";

import styles from "./SaleSummary.module.css";

interface SaleSummaryProps {
  sale: SaleContract;
}

export function SaleSummary({ sale }: SaleSummaryProps) {
  const formattedStart = formatDateTime(sale.startDateTime);
  const formattedEnd = sale.endDateTime ? formatDateTime(sale.endDateTime) : null;
  const isLive = sale.state === "live";

  return (
    <Surface variant="card" radius="medium" className={styles.container}>
      <Stack gap="medium">
        <Text as="h3" variant="body-bold">
          Sale Information
        </Text>
        <Stack gap="small">
          <div className={styles.infoRow}>
            <Text as="span" variant="caption" color="secondary">
              Sale Title
            </Text>
            <Link to={`/sales/${sale.id}`} className={styles.saleLink}>
              {sale.title}
            </Link>
          </div>
          <div className={styles.infoRow}>
            <Text as="span" variant="caption" color="secondary">
              Status
            </Text>
            <Stack direction="horizontal" gap="small" align="center">
              <span className={`${styles.badge} ${isLive ? styles.live : styles.upcoming}`} />
              <Text as="span" variant="body-semibold" transform="capitalize">
                {sale.state}
              </Text>
            </Stack>
          </div>
          <div className={styles.infoRow}>
            <Text as="span" variant="caption" color="secondary">
              Starts
            </Text>
            <Text as="span" variant="body-semibold">
              {formattedStart}
            </Text>
          </div>
          {formattedEnd && (
            <div className={styles.infoRow}>
              <Text as="span" variant="caption" color="secondary">
                Ends
              </Text>
              <Text as="span" variant="body-semibold">
                {formattedEnd}
              </Text>
            </div>
          )}
          {sale.location && (
            <div className={styles.infoRow}>
              <Text as="span" variant="caption" color="secondary">
                Location
              </Text>
              <Text as="span" variant="body-semibold" transform="capitalize">
                {sale.locationType} ({sale.location})
              </Text>
            </div>
          )}
        </Stack>
      </Stack>
    </Surface>
  );
}
