import { formatCurrency } from "@shared/formatting";

import { Stack, Text } from "@ds/design-system";

interface VehiclePriceProps {
  currentPrice?: number;
  buyNowPrice?: number;
  currency?: string;
}

export function VehiclePrice({ currentPrice, buyNowPrice, currency }: VehiclePriceProps) {
  return (
    <Stack direction="horizontal" gap="large" wrap={true} align="start">
      {currentPrice !== undefined && (
        <Stack gap="small">
          <Text
            as="span"
            variant="overline"
            color="secondary"
          >
            Current Price
          </Text>
          <Text as="span" variant="display-price" color="action">
            {formatCurrency(currentPrice, { currency })}
          </Text>
        </Stack>
      )}

      {buyNowPrice !== undefined && (
        <Stack gap="small">
          <Text
            as="span"
            variant="overline"
            color="secondary"
          >
            Buy It Now
          </Text>
          <Text as="span" variant="display-price" color="success">
            {formatCurrency(buyNowPrice, { currency })}
          </Text>
        </Stack>
      )}
    </Stack>
  );
}
