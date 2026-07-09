export interface UserPreferences {
  favouriteVehicleIds: string[];
}

export interface UserPreferencesState {
  preferences: UserPreferences;
  toggleFavouriteVehicle: (id: string) => void;
}
