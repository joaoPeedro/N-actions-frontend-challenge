import { create } from "zustand";
import { persist } from "zustand/middleware";

import { storageConfig } from "../persistence/storage";
import type { UserPreferencesState } from "../types/user-preferences";

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      preferences: {
        favouriteVehicleIds: [],
      },
      toggleFavouriteVehicle: (id) =>
        set((state) => {
          const ids = state.preferences.favouriteVehicleIds;
          const newIds = ids.includes(id)
            ? ids.filter((favId) => favId !== id)
            : [...ids, id];
          return {
            preferences: {
              ...state.preferences,
              favouriteVehicleIds: newIds,
            },
          };
        }),
    }),
    storageConfig
  )
);
