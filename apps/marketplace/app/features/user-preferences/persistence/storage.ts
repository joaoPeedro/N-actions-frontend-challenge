import type { PersistOptions } from "zustand/middleware";

import type { UserPreferencesState } from "../types/user-preferences";

export const USER_PREFERENCES_STORAGE_KEY = "user-preferences-storage";

export const storageConfig: PersistOptions<UserPreferencesState> = {
  name: USER_PREFERENCES_STORAGE_KEY,
  version: 1,
};
