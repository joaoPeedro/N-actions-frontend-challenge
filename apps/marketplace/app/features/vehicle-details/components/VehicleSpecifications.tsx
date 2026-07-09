import { formatDate, formatNumber } from "@shared/formatting";

import { Stack, Surface, Text } from "@ds/design-system";

import styles from "./VehicleSpecifications.module.css";

interface VehicleSpecificationsProps {
  make: string;
  model: string;
  lotNumber: string;
  registrationDate?: string;
  registrationYear?: number;
  mileage?: number;
  mileageUnit?: string;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  colour?: string;
  countryCode?: string;
}

export function VehicleSpecifications({
  make,
  model,
  lotNumber,
  registrationDate,
  registrationYear,
  mileage,
  mileageUnit,
  fuelType,
  transmission,
  bodyType,
  colour,
  countryCode,
}: VehicleSpecificationsProps) {
  const formattedMileage = mileage !== undefined
    ? `${formatNumber(mileage)} ${mileageUnit || "mi"}`
    : null;

  const formattedRegistrationDate = registrationDate
    ? formatDate(registrationDate)
    : undefined;

  // Build specifications list dynamically, omitting any property that doesn't exist
  const specs = [
    { label: "Make", value: make },
    { label: "Model", value: model },
    { label: "Lot Number", value: lotNumber },
    ...(formattedRegistrationDate ? [{ label: "Registration Date", value: formattedRegistrationDate }] : []),
    ...(!registrationDate && registrationYear !== undefined ? [{ label: "Registration Year", value: registrationYear.toString() }] : []),
    ...(formattedMileage ? [{ label: "Mileage", value: formattedMileage }] : []),
    ...(fuelType ? [{ label: "Fuel Type", value: fuelType }] : []),
    ...(transmission ? [{ label: "Transmission", value: transmission }] : []),
    ...(bodyType ? [{ label: "Body Type", value: bodyType }] : []),
    ...(colour ? [{ label: "Colour", value: colour }] : []),
    ...(countryCode ? [{ label: "Country", value: countryCode }] : []),
  ].filter((spec) => spec.value !== undefined && spec.value !== null && spec.value !== "");

  return (
    <Stack gap="medium">
      <Text as="h2" variant="h2">
        Specifications
      </Text>
      <Surface variant="card" radius="medium" padding="large" className={styles.specsSurface}>
        <div className={styles.specsGrid}>
          {specs.map((spec, idx) => (
            <div key={idx} className={styles.specItem}>
              <Text as="span" variant="caption" color="secondary" className={styles.specLabel}>
                {spec.label}
              </Text>
              <Text as="span" variant="body-semibold" className={styles.specValue}>
                {spec.value}
              </Text>
            </div>
          ))}
        </div>
      </Surface>
    </Stack>
  );
}
