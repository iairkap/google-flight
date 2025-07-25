export interface ExploreDestinationsSectionProps {
  title?: string;
  mapHeight?: string;
  showPrices?: boolean;
  className?: string;
}

export interface ExploreDestinationsData {
  userLocation: {
    city: string;
    country: string;
    coordinates?: [number, number];
  } | null;
  isLocationAvailable: boolean;
}
