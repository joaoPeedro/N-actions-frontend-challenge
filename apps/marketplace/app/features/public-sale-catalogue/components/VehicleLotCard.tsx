import { FavouriteButton } from "@features/user-preferences";
import { formatCurrency, formatNumber } from "@shared/formatting";
import { Link } from "react-router";

import { Stack, Surface, Text } from "@ds/design-system";

import type { VehicleLot } from "../domain/vehicle-lot";

import styles from "./VehicleLotCard.module.css";

// Candidate for DS? No.
// Candidate for Domain Shared Component? Yes (e.g. for Related Lots in PDP).

interface VehicleLotCardProps {
  lot: VehicleLot;
  saleId: string;
}

export function VehicleLotCard({ lot, saleId: _saleId }: VehicleLotCardProps) {
  const defaultPlaceholder = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=60";
  const imageUrl = lot.imageUrl || defaultPlaceholder;

  const formattedPrice = lot.currentPrice !== undefined
    ? formatCurrency(lot.currentPrice, { currency: lot.currency })
    : "N/A";

  const mileageText = lot.mileage !== undefined
    ? `${formatNumber(lot.mileage)} ${lot.mileageUnit || "mi"}`
    : "N/A";

  const titleText = lot.registrationYear ? `${lot.registrationYear} ${lot.make} ${lot.model}` : `${lot.make} ${lot.model}`;

  return (
    <Surface variant="card" radius="medium" className={styles.card}>
      <Link
        to={`/vehicles/${lot.id}`}
        className={styles.link}
        aria-label={`View details for ${titleText}`}
      >
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={titleText} className={styles.image} />
          <div className={styles.favouriteButtonWrapper}>
            <FavouriteButton vehicleId={lot.id} />
          </div>
        </div>
        <div className={styles.content}>
          <Stack gap="small">
             <Text as="h3" variant="h3">
              {titleText}
            </Text>
            <div className={styles.details}>
              <Text as="span" variant="caption" color="secondary">
                {mileageText}
              </Text>
            </div>
            <div className={styles.priceContainer}>
              <Stack direction="horizontal" justify="space-between" align="baseline" gap="none" fullWidth>
                <Text as="span" variant="overline" color="secondary">
                  Current Price
                </Text>
                <Text as="span" variant="price" color="action">
                  {formattedPrice}
                </Text>
              </Stack>
            </div>
          </Stack>
        </div>
      </Link>
    </Surface>
  );
}
