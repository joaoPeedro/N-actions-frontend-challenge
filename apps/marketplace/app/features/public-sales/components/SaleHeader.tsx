import type { SaleContract } from "@shared/api/contracts/sale.contract";
import { PageTitleSection } from "@shared/components/layout";
import { formatDate } from "@shared/formatting";

import { Badge, Stack, Text } from "@ds/design-system";

import styles from "./SaleHeader.module.css";

interface SaleHeaderProps {
  sale: SaleContract;
}

export function SaleHeader({ sale }: SaleHeaderProps) {
  return (
    <Stack className={styles.container}>
      <Stack direction="horizontal" justify="space-between" align="start" fullWidth>
        <PageTitleSection bordered={false}>
          <Text as="h1" variant="h1">
            {sale.title}
          </Text>
          {sale.description && (
            <Text as="p" variant="body" color="secondary">
              {sale.description}
            </Text>
          )}
        </PageTitleSection>
        <Stack direction="horizontal" gap="small">
          <Badge variant={sale.state === "live" ? "danger" : "primary"}>{sale.state}</Badge>
          <Badge variant="neutral">{sale.saleType}</Badge>
        </Stack>
      </Stack>

      <div className={styles.meta}>
        <Stack direction="horizontal" gap="large" wrap={true}>
          <Text as="span" variant="caption" color="secondary">
            <strong>Schedule:</strong>{" "}
            <span className={styles.date}>{formatDate(sale.startDateTime)}</span>
            {sale.endDateTime && (
              <>
                {" - "}
                <span className={styles.date}>{formatDate(sale.endDateTime)}</span>
              </>
            )}
          </Text>
          {sale.location && (
            <Text as="span" variant="caption" color="secondary">
              <strong>Location:</strong> {sale.location} ({sale.locationType})
            </Text>
          )}
          <Text as="span" variant="caption" color="secondary">
            <strong>Lots Available:</strong> {sale.lotCount}
          </Text>
        </Stack>
      </div>
    </Stack>
  );
}
