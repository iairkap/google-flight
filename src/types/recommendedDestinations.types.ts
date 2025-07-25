import type { RecommendedFlight } from "@/hooks/useRecommendedFlights";
import type { FavoriteDestination } from "@/store/flightStore";

export interface RecommendedDestinationsProps {
  flights?: RecommendedFlight[];
  onFlightClick?: (flight: RecommendedFlight) => void;
  showNoResultsMessage?: boolean;
  className?: string;
}

export interface RecommendedDestinationsData {
  favoriteDestinations: FavoriteDestination[];
  userLocation: {
    city: string;
    country: string;
    coordinates?: [number, number];
  } | null;
  isLocationAvailable: boolean;
  recommendedFlights: RecommendedFlight[];
}

export interface RecommendedDestinationsEmptyStateProps {
  message?: string;
  userLocation?: {
    city?: string;
    country?: string;
    lat?: number;
    lng?: number;
  } | null;
}
