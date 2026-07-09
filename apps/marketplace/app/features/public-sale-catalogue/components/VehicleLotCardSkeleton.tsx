import { Stack, Surface } from "@ds/design-system";

import styles from "./VehicleLotCardSkeleton.module.css";

export function VehicleLotCardSkeleton() {
  return (
    <Surface
      variant="card"
      radius="medium"
      className={styles.card}
      aria-hidden="true"
    >
      <div className={styles.imageContainer}>
        <div className={`${styles.favouritePlaceholder} ${styles.shimmer}`} />
      </div>
      <div className={styles.content}>
        <Stack gap="small">
          <div className={`${styles.titleBar} ${styles.shimmer}`} />
          <div className={`${styles.subtitleBar} ${styles.shimmer}`} />
          <div className={styles.priceContainer}>
            <div className={`${styles.priceBar} ${styles.shimmer}`} />
          </div>
        </Stack>
      </div>
    </Surface>
  );
}
