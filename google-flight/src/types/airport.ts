// src/types/airport.ts
export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  type: "airport" | "city";
}

export interface LocationSuggestion extends Airport {
  searchText: string;
  displayText: string;
}

export interface LocationSelectorState {
  isOriginPopupOpen: boolean;
  isDestinationPopupOpen: boolean;
  originQuery: string;
  destinationQuery: string;
  suggestions: LocationSuggestion[];
  isLoading: boolean;
}
