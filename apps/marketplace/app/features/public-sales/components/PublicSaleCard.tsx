import type { SaleContract } from "@shared/api/contracts/sale.contract";
import { formatDate } from "@shared/formatting";
import { Link } from "react-router";

import { Badge, Stack, Surface, Text } from "@ds/design-system";

import styles from "./PublicSalesCalendar.module.css";

interface PublicSaleCardProps {
  sale: SaleContract;
}

export function PublicSaleCard({ sale }: PublicSaleCardProps) {
  const defaultPlaceholder = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=60";
  const imageUrl = sale.heroImageUrl || defaultPlaceholder;

  return (
    <Surface variant="card" radius="medium" className={styles.card}>
      <Link 
        to={`/sales/${sale.id}`} 
        className={styles.link}
        aria-label={`View catalog for ${sale.title}`}
      >
        <div className={styles.imageContainer}>
          <img 
            src={imageUrl} 
            alt={sale.title} 
            className={styles.image} 
          />
          <div className={styles.badges}>
            <Badge variant={sale.state === "live" ? "danger" : "primary"}>{sale.state}</Badge>
            <Badge variant="neutral">{sale.saleType}</Badge>
          </div>
        </div>
        
        <div className={styles.content}>
          <Stack gap="small">
            <Text as="h2" variant="h3">
              {sale.title}
            </Text>
            {sale.description && (
              <Text as="p" variant="body" color="secondary">
                {sale.description}
              </Text>
            )}
            
            <div className={styles.meta}>
              <Stack direction="horizontal" justify="space-between" align="center" fullWidth>
                <Text as="span" variant="caption" color="secondary">
                  Starts: <span className={styles.date}>{formatDate(sale.startDateTime)}</span>
                </Text>
                <Text as="span" variant="body-semibold" color="primary">
                  {sale.lotCount} {sale.lotCount === 1 ? "Vehicle" : "Vehicles"}
                </Text>
              </Stack>
            </div>
          </Stack>
        </div>
      </Link>
    </Surface>
  );
}
