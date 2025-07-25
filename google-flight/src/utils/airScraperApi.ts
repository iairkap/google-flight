// src/utils/airScraperApi.ts
import { mockFlightResponse, generateMockFlights } from "./mockFlightData";

export interface AirScraperSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  cabinClass: string;
  adults: number;
  sortBy: string;
  currency: string;
  market: string;
  countryCode: string;
  date: string;
  returnDate?: string;
}

export interface AirScraperResponse {
  status: boolean;
  timestamp: number;
  data: {
    itinerary: {
      legs: Array<{
        id: string;
        origin: {
          id: string;
          name: string;
          displayCode: string;
          city: string;
        };
        destination: {
          id: string;
          name: string;
          displayCode: string;
          city: string;
        };
        segments: Array<{
          id: string;
          origin: {
            id: string;
            name: string;
            displayCode: string;
            city: string;
          };
          destination: {
            id: string;
            name: string;
            displayCode: string;
            city: string;
          };
          duration: number;
          dayChange: number;
          flightNumber: string;
          departure: string;
          arrival: string;
          marketingCarrier: {
            id: string;
            name: string;
            displayCode: string;
            displayCodeType: string;
            logo: string;
            altId: string;
          };
        }>;
        duration: number;
        stopCount: number;
        departure: string;
        arrival: string;
        dayChange: number;
      }>;
      pricingOptions: Array<{
        agents: Array<{
          id: string;
          name: string;
          price: number;
        }>;
        totalPrice: number;
      }>;
    };
  };
}

// HARDCODED IMPLEMENTATION - Uses mock data to preserve API request limits
export const searchFlights = async (
  params: AirScraperSearchParams
): Promise<AirScraperResponse> => {
  // Simulate API delay for realistic UX
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 1000)
  );

  // Use the provided hardcoded response or generate dynamic flights
  const useProvidedData = Math.random() > 0.5; // 50% chance to use your provided data

  if (useProvidedData) {
    return mockFlightResponse as AirScraperResponse;
  } else {
    return generateMockFlights(
      params.originSkyId,
      params.destinationSkyId,
      params.date
    ) as AirScraperResponse;
  }
};
