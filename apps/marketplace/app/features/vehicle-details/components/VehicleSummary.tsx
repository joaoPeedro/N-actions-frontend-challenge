import { FavouriteButton } from "@features/user-preferences";
import { formatNumber } from "@shared/formatting";

import { Stack, Text } from "@ds/design-system";

import styles from "./VehicleSummary.module.css";

interface VehicleSummaryProps {
  vehicleId: string;
  make: string;
  model: string;
  lotNumber: string;
  mileage?: number;
  mileageUnit?: string;
  derivative?: string;
}

export function VehicleSummary({
  vehicleId,
  make,
  model,
  lotNumber,
  mileage,
  mileageUnit,
  derivative,
}: VehicleSummaryProps) {
  const mileageText = mileage !== undefined
    ? `${formatNumber(mileage)} ${mileageUnit || "mi"}`
    : "";

  // Title: Make Model Derivative (e.g. BMW 320d M Sport)
  const fullTitle = [make, model, derivative].filter(Boolean).join(" ");

  return (
    <Stack gap="small">
      <Stack direction="horizontal" align="center" justify="space-between" gap="small">
        <Text as="span" variant="overline" color="secondary" className={styles.lotBadge}>
          Lot #{lotNumber}
        </Text>
        <FavouriteButton vehicleId={vehicleId} />
      </Stack>
      <Text as="h1" variant="h1">
        {fullTitle}
      </Text>
      {mileageText && (
        <Text as="span" variant="body-semibold" color="secondary">
          {mileageText}
        </Text>
      )}
    </Stack>
  );
}
