// src/hooks/useRecommendedFlights.ts
import { useState, useEffect } from "react";
import type { FavoriteDestination, UserLocation } from "@/store/flightStore";

export interface RecommendedFlight {
  id: string;
  destination: {
    city: string;
    code: string;
    image: string;
  };
  price: number;
  dateRange: string;
  flightDuration: string;
}

export const useRecommendedFlights = (
  userLocation: UserLocation | null,
  favoriteDestinations: FavoriteDestination[]
) => {
  const [recommendedFlights, setRecommendedFlights] = useState<
    RecommendedFlight[]
  >([]);

  useEffect(() => {
    if (userLocation && favoriteDestinations.length > 0) {
      // Generate recommended flights based on user location
      const flights = favoriteDestinations
        .slice(0, 4)
        .map((destination, index) => {
          // Generate random dates for the next 30-90 days
          const startDate = new Date();
          startDate.setDate(
            startDate.getDate() + Math.floor(Math.random() * 30) + 7
          );
          const endDate = new Date(startDate);
          endDate.setDate(
            endDate.getDate() + Math.floor(Math.random() * 7) + 3
          );

          // Format date as "Nov 24 - 2 Dec"
          const formatDate = (date: Date) => {
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          };

          const dateRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;

          // Generate random price based on destination and distance
          const basePrice = 300 + index * 150;
          const price = basePrice + Math.floor(Math.random() * 200);

          // Generate flight duration based on approximate distance
          const flightHours = Math.floor(Math.random() * 8) + 2; // 2-10 hours
          const flightMinutes = Math.floor(Math.random() * 60);
          const flightDuration = `${flightHours}h ${flightMinutes}m`;

          return {
            id: `recommended-${destination.id}`,
            destination: {
              city: destination.city,
              code: destination.code,
              image: destination.image,
            },
            price,
            dateRange,
            flightDuration,
          };
        });

      setRecommendedFlights(flights);
    } else {
      setRecommendedFlights([]);
    }
  }, [userLocation, favoriteDestinations]);

  return recommendedFlights;
};
