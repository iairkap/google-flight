// src/store/flightStore.ts
import { create } from "zustand";
import { Dayjs } from "dayjs";
import {
  generateMockFlights,
  getFavoriteDestinations,
  locationToAirportMap,
} from "../utils/mockFlightData";

// Interfaces for API data structures
interface MockDataResponse {
  status: boolean;
  timestamp: number;
  data: {
    itinerary: {
      legs: MockLeg[];
      pricingOptions: MockPricingOption[];
    };
  };
}

interface MockLeg {
  id: string;
  origin: MockAirport;
  destination: MockAirport;
  segments: MockSegment[];
  duration: number;
  stopCount: number;
  departure: string;
  arrival: string;
  dayChange: number;
}

interface MockAirport {
  id: string;
  name: string;
  displayCode: string;
  city: string;
}

interface MockSegment {
  id: string;
  origin: MockAirport;
  destination: MockAirport;
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
}

interface MockPricingOption {
  agents: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  totalPrice: number;
}

interface ApiDataResponse {
  data?: {
    itineraries?: ApiItinerary[];
  };
}

interface ApiItinerary {
  legs?: Array<{
    carriers?: {
      marketing?: Array<{ name?: string }>;
    };
    segments?: Array<{ flightNumber?: string }>;
    origin?: { displayCode?: string };
    destination?: { displayCode?: string };
    departure?: string;
    arrival?: string;
    durationInMinutes?: number;
    stopCount?: number;
  }>;
  price?: { raw?: number };
}

export interface FlightSearchData {
  origin: string;
  destination: string;
  departureDate: Dayjs | null;
  returnDate: Dayjs | null;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  travelClass: string;
  tripType: "roundtrip" | "oneway";
}

export interface FlightResult {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  stops: number;
}

export interface FavoriteDestination {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  image: string;
  description: string;
  coordinates: [number, number];
}

export interface UserLocation {
  city: string;
  country: string;
  countryCode: string;
  detected: boolean;
  coordinates?: [number, number];
}

interface FlightStore {
  // Search data
  searchData: FlightSearchData;
  updateSearchData: (data: Partial<FlightSearchData>) => void;

  // Configuration
  useMockData: boolean;
  setUseMockData: (value: boolean) => void;

  // App initialization
  isInitializing: boolean;
  setIsInitializing: (value: boolean) => void;

  // Results
  results: FlightResult[];
  isLoading: boolean;
  error: string | null;

  // Favorite destinations
  favoriteDestinations: FavoriteDestination[];
  setFavoriteDestinations: (destinations: FavoriteDestination[]) => void;

  // User location
  userLocation: UserLocation | null;
  setUserLocation: (location: UserLocation) => void;
  detectUserLocation: () => Promise<void>;

  // API actions
  searchFlights: () => Promise<void>;
  clearResults: () => void;
  setError: (error: string | null) => void;
}

export const useFlightStore = create<FlightStore>((set, get) => ({
  // Initial search data
  searchData: {
    origin: "Buenos Aires",
    destination: "Eastern Europe",
    departureDate: null,
    returnDate: null,
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    travelClass: "Economy",
    tripType: "roundtrip",
  },

  // Configuration
  useMockData: true, // Default to mock data to save API calls
  setUseMockData: (value) => set({ useMockData: value }),

  // App initialization
  isInitializing: true, // Start with true to show loader initially
  setIsInitializing: (value) => set({ isInitializing: value }),

  // Initial state
  results: [],
  isLoading: false,
  error: null,

  // Favorite destinations - obtenidos del mock data
  favoriteDestinations: getFavoriteDestinations(),
  setFavoriteDestinations: (destinations) =>
    set({ favoriteDestinations: destinations }),

  // User location
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
  detectUserLocation: async () => {
    set({ isInitializing: true }); // Set initializing state

    try {
      // First try browser geolocation
      if ("geolocation" in navigator) {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: false,
              timeout: 10000,
              maximumAge: 300000, // 5 minutes
            });
          }
        );

        // Use reverse geocoding with coordinates
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Try using a free reverse geocoding service
          const geocodeResponse = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );

          if (geocodeResponse.ok) {
            const geocodeData = await geocodeResponse.json();
            const userLocation: UserLocation = {
              city: geocodeData.city || geocodeData.locality || "Unknown",
              country: geocodeData.countryName || "Unknown",
              countryCode: geocodeData.countryCode || "XX",
              detected: true,
              coordinates: [lat, lon],
            };
            set({ userLocation });
            set({ isInitializing: false }); // Stop initialization
            return;
          }
        } catch {
          // Silently handle reverse geocoding errors
        }
      }

      // Fallback to IP geolocation
      const response = await fetch("https://ipapi.co/json/");
      if (response.ok) {
        const data = await response.json();
        const userLocation: UserLocation = {
          city: data.city || "Unknown",
          country: data.country_name || "Unknown",
          countryCode: data.country_code || "XX",
          detected: true,
          coordinates: [data.latitude, data.longitude],
        };
        set({ userLocation });
        set({ isInitializing: false }); // Stop initialization
      } else {
        throw new Error("IP geolocation failed");
      }
    } catch {
      // Set a more realistic default location
      const defaultLocation: UserLocation = {
        city: "Buenos Aires", // More realistic default
        country: "Argentina",
        countryCode: "AR",
        detected: false,
        coordinates: [-34.6118, -58.396], // Coordenadas de Buenos Aires
      };
      set({ userLocation: defaultLocation });
    } finally {
      // Always set initializing to false when done
      set({ isInitializing: false });
    }
  },

  // Update search data
  updateSearchData: (data) =>
    set((state) => {
      const newSearchData = { ...state.searchData, ...data };
      return {
        searchData: newSearchData,
      };
    }),

  // Search flights using either Mock Data or Sky Scrapper API
  searchFlights: async () => {
    const { searchData, useMockData } = get();

    // Validation
    if (
      !searchData.origin ||
      !searchData.destination ||
      !searchData.departureDate
    ) {
      set({ error: "Please fill in all required fields" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      let transformedResults: FlightResult[];

      if (useMockData) {
        // Use mock data

        const departureFormatted =
          searchData.departureDate.format("YYYY-MM-DD");

        // Map origin/destination to airport codes for mock data
        const originCode = mapLocationToAirportCode(searchData.origin);
        const destinationCode = mapLocationToAirportCode(
          searchData.destination
        );

        const mockData = generateMockFlights(
          originCode,
          destinationCode,
          departureFormatted
        );

        // Transform mock data to our format
        transformedResults = transformMockDataToFlightResults(
          mockData,
          departureFormatted
        );
      } else {
        // Use real API

        const departureFormatted =
          searchData.departureDate.format("YYYY-MM-DD");
        const returnFormatted = searchData.returnDate?.format("YYYY-MM-DD");

        // Sky Scrapper API endpoint (v2)
        const baseUrl =
          "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights";

        // For now, using example airport codes - we'll need to implement proper mapping
        const originSkyId =
          searchData.origin === "Buenos Aires" ? "BAIR" : "LOND";
        const destinationSkyId =
          searchData.destination === "Eastern Europe" ? "PRAG" : "NYCA";
        const originEntityId =
          searchData.origin === "Buenos Aires" ? "27544008" : "27544008";
        const destinationEntityId =
          searchData.destination === "Eastern Europe" ? "27537542" : "27537542";

        const params = new URLSearchParams({
          originSkyId,
          destinationSkyId,
          originEntityId,
          destinationEntityId,
          cabinClass: searchData.travelClass.toLowerCase().replace(" ", ""),
          adults: searchData.passengers.adults.toString(),
          children: searchData.passengers.children.toString(),
          infants: searchData.passengers.infants.toString(),
          sortBy: "best",
          currency: "USD",
          market: "en-US",
          countryCode: "US",
          ...(searchData.departureDate && { date: departureFormatted }),
          ...(returnFormatted && { returnDate: returnFormatted }),
        });

        const url = `${baseUrl}?${params.toString()}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY || "",
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        // Transform API response to our format
        transformedResults = transformApiDataToFlightResults(
          data,
          departureFormatted
        );
      }

      set({ results: transformedResults, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to search flights",
        isLoading: false,
      });
    }
  },

  // Clear results
  clearResults: () => set({ results: [], error: null }),

  // Set error
  setError: (error) => set({ error }),
}));

// Helper function to map location names to airport codes (usa configuración centralizada)
function mapLocationToAirportCode(location: string): string {
  return locationToAirportMap[location] || "MAD"; // Default fallback
}

// Transform mock data to FlightResult format
function transformMockDataToFlightResults(
  mockData: MockDataResponse,
  departureDate: string
): FlightResult[] {
  if (!mockData?.data?.itinerary?.legs) {
    return [];
  }

  return mockData.data.itinerary.legs.map((leg: MockLeg, index: number) => {
    const segment = leg.segments?.[0];
    const pricing = mockData.data.itinerary.pricingOptions?.[index];

    return {
      id: leg.id || `flight-${index}`,
      airline: segment?.marketingCarrier?.name || "Unknown Airline",
      flightNumber: segment?.flightNumber || "",
      departure: {
        airport: segment?.origin?.displayCode || leg.origin?.displayCode || "",
        time: segment?.departure || leg.departure || "",
        date: departureDate,
      },
      arrival: {
        airport:
          segment?.destination?.displayCode ||
          leg.destination?.displayCode ||
          "",
        time: segment?.arrival || leg.arrival || "",
        date: departureDate,
      },
      duration: leg.duration
        ? `${Math.floor(leg.duration / 60)}h ${leg.duration % 60}m`
        : "",
      price: pricing?.totalPrice || Math.floor(Math.random() * 600) + 300,
      stops: leg.stopCount || 0,
    };
  });
}

// Transform API data to FlightResult format
function transformApiDataToFlightResults(
  apiData: ApiDataResponse,
  departureDate: string
): FlightResult[] {
  if (!apiData?.data?.itineraries) {
    return [];
  }

  return apiData.data.itineraries.map(
    (itinerary: ApiItinerary, index: number) => ({
      id: `flight-${index}`,
      airline: itinerary.legs?.[0]?.carriers?.marketing?.[0]?.name || "Unknown",
      flightNumber: itinerary.legs?.[0]?.segments?.[0]?.flightNumber || "",
      departure: {
        airport: itinerary.legs?.[0]?.origin?.displayCode || "",
        time: itinerary.legs?.[0]?.departure || "",
        date: departureDate,
      },
      arrival: {
        airport: itinerary.legs?.[0]?.destination?.displayCode || "",
        time: itinerary.legs?.[0]?.arrival || "",
        date: departureDate,
      },
      duration: itinerary.legs?.[0]?.durationInMinutes
        ? `${Math.floor(itinerary.legs[0].durationInMinutes / 60)}h ${
            itinerary.legs[0].durationInMinutes % 60
          }m`
        : "",
      price: itinerary.price?.raw || 0,
      stops: itinerary.legs?.[0]?.stopCount || 0,
    })
  );
}
