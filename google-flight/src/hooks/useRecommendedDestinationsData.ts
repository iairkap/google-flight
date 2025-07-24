import { useFlightStore } from "@/store/flightStore";
import { useRecommendedFlights } from "@/hooks/useRecommendedFlights";
import { useUserLocation } from "@/hooks/useLocation";
import type { RecommendedDestinationsData } from "@/types/recommendedDestinations.types";

export const useRecommendedDestinationsData =
  (): RecommendedDestinationsData => {
    const { favoriteDestinations } = useFlightStore();
    const { userLocation, isLocationAvailable } = useUserLocation();
    const recommendedFlights = useRecommendedFlights(
      userLocation,
      favoriteDestinations
    );

    return {
      favoriteDestinations,
      userLocation,
      isLocationAvailable,
      recommendedFlights,
    };
  };
