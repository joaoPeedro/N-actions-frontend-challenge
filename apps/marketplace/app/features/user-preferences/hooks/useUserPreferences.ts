import { useCallback, useMemo } from "react";

import { useUserPreferencesStore } from "../store/user-preferences.store";

export function useUserPreferences() {
  const favouriteVehicleIds = useUserPreferencesStore(
    (state) => state.preferences.favouriteVehicleIds
  );
  const toggleFavouriteVehicle = useUserPreferencesStore(
    (state) => state.toggleFavouriteVehicle
  );

  const favouriteSet = useMemo(() => new Set(favouriteVehicleIds), [favouriteVehicleIds]);

  const isFavouriteVehicle = useCallback(
    (id: string) => favouriteSet.has(id),
    [favouriteSet]
  );

  return {
    favouriteVehicleIds,
    toggleFavouriteVehicle,
    isFavouriteVehicle,
  };
}
