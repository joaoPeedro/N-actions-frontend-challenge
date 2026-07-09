import { VehicleLotCardSkeleton } from "./VehicleLotCardSkeleton";
import gridStyles from "./VehicleLotGrid.module.css";

const SKELETON_CARD_COUNT = 8;

export function VehicleLotGridSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading vehicle lots"
      className={gridStyles.grid}
    >
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
        <VehicleLotCardSkeleton key={index} />
      ))}
    </section>
  );
}
