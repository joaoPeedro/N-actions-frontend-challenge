import type { VehicleLot } from "../domain/vehicle-lot";
import { VehicleLotCard } from "./VehicleLotCard";

import styles from "./VehicleLotGrid.module.css";

interface VehicleLotGridProps {
  lots: VehicleLot[];
  saleId: string;
}

export function VehicleLotGrid({ lots, saleId }: VehicleLotGridProps) {
  if (lots.length === 0) {
    return (
      <div className={styles.emptyState} role="region" aria-label="Empty Catalogue">
        <p>No vehicles are currently registered in this public sale catalogue.</p>
      </div>
    );
  }

  return (
    <section aria-label="Vehicle Lots Catalog" className={styles.grid}>
      {lots.map((lot) => (
        <VehicleLotCard key={lot.id} lot={lot} saleId={saleId} />
      ))}
    </section>
  );
}
