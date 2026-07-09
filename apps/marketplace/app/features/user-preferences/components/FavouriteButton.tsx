import { analytics } from "@shared/analytics";

import { Button } from "@ds/design-system";

import { useHydrated } from "../hooks/useHydrated";
import { useUserPreferences } from "../hooks/useUserPreferences";

import styles from "./FavouriteButton.module.css";

interface FavouriteButtonProps {
  vehicleId: string;
}

export function FavouriteButton({ vehicleId }: FavouriteButtonProps) {
  const { isFavouriteVehicle, toggleFavouriteVehicle } = useUserPreferences();
  const hydrated = useHydrated();

  const isFav = hydrated ? isFavouriteVehicle(vehicleId) : false;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavouriteVehicle(vehicleId);
    analytics.vehicleFavouriteToggled({ vehicleId, favourited: !isFav });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      toggleFavouriteVehicle(vehicleId);
      analytics.vehicleFavouriteToggled({ vehicleId, favourited: !isFav });
    }
  };

  return (
    <Button
      iconOnly
      variant="secondary"
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
      aria-pressed={isFav}
      className={isFav ? styles.active : undefined}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill={isFav ? "var(--ds-color-action-danger)" : "none"}
        stroke={isFav ? "var(--ds-color-action-danger)" : "currentColor"}
        strokeWidth="2"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </Button>
  );
}
