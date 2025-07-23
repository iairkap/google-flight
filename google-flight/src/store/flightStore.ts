// src/store/flightStore.ts
import { create } from "zustand";
import { Dayjs } from "dayjs";
import { generateMockFlights } from "../utils/mockFlightData";

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
}

export interface UserLocation {
  city: string;
  country: string;
  countryCode: string;
  detected: boolean;
}

interface FlightStore {
  // Search data
  searchData: FlightSearchData;
  updateSearchData: (data: Partial<FlightSearchData>) => void;

  // Configuration
  useMockData: boolean;
  setUseMockData: (value: boolean) => void;

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

  // Initial state
  results: [],
  isLoading: false,
  error: null,

  // Favorite destinations - initialized with default destinations
  favoriteDestinations: [
    {
      id: "london",
      name: "London",
      code: "LHR",
      city: "London",
      country: "United Kingdom",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Montage_L.jpg/800px-London_Montage_L.jpg",
      description:
        "Historic city with iconic landmarks like Big Ben and the Tower Bridge",
    },
    {
      id: "newyork",
      name: "New York",
      code: "JFK",
      city: "New York",
      country: "United States",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Manhattan_at_Dusk_by_slonecker.jpg/800px-Manhattan_at_Dusk_by_slonecker.jpg",
      description:
        "The city that never sleeps, famous for Times Square and Central Park",
    },
    {
      id: "paris",
      name: "Paris",
      code: "CDG",
      city: "Paris",
      country: "France",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/800px-Tour_Eiffel_Wikimedia_Commons.jpg",
      description:
        "City of lights with the Eiffel Tower and world-class museums",
    },
    {
      id: "singapore",
      name: "Singapore",
      code: "SIN",
      city: "Singapore",
      country: "Singapore",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Singapore_Panorama_v2.jpg/800px-Singapore_Panorama_v2.jpg",
      description:
        "Modern city-state known for its gardens, cuisine, and architecture",
    },
  ],
  setFavoriteDestinations: (destinations) =>
    set({ favoriteDestinations: destinations }),

  // User location
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
  detectUserLocation: async () => {
    try {
      // Try to get location using IP geolocation
      const response = await fetch("https://ipapi.co/json/");
      if (response.ok) {
        const data = await response.json();
        const userLocation: UserLocation = {
          city: data.city || "Unknown",
          country: data.country_name || "Unknown",
          countryCode: data.country_code || "XX",
          detected: true,
        };
        set({ userLocation });
        console.log("🌍 User location detected:", userLocation);
      } else {
        throw new Error("Failed to fetch location");
      }
    } catch (error) {
      console.warn("⚠️ Could not detect user location:", error);
      // Set default location
      const defaultLocation: UserLocation = {
        city: "Unknown",
        country: "Unknown",
        countryCode: "XX",
        detected: false,
      };
      set({ userLocation: defaultLocation });
    }
  },

  // Update search data
  updateSearchData: (data) =>
    set((state) => {
      const newSearchData = { ...state.searchData, ...data };
      console.log("🔄 Store Update - updateSearchData called with:", data);
      console.log("📊 Store Update - Previous searchData:", state.searchData);
      console.log("📊 Store Update - New searchData:", newSearchData);
      return {
        searchData: newSearchData,
      };
    }),

  // Search flights using either Mock Data or Sky Scrapper API
  searchFlights: async () => {
    const { searchData, useMockData } = get();

    console.log("🚀 SEARCH BUTTON CLICKED!");
    console.log("📋 Current searchData in store:", searchData);
    console.log("⚙️ Using mock data:", useMockData);

    // Validation
    if (
      !searchData.origin ||
      !searchData.destination ||
      !searchData.departureDate
    ) {
      console.log("❌ Validation failed - missing required fields");
      set({ error: "Please fill in all required fields" });
      return;
    }

    console.log("✅ Validation passed - proceeding with search");
    set({ isLoading: true, error: null });

    try {
      let transformedResults: FlightResult[];

      if (useMockData) {
        // Use mock data
        console.log("📦 Using mock data for flight search");

        const departureFormatted =
          searchData.departureDate.format("YYYY-MM-DD");

        // Map origin/destination to airport codes for mock data
        const originCode = mapLocationToAirportCode(searchData.origin);
        const destinationCode = mapLocationToAirportCode(
          searchData.destination
        );

        console.log("🗺️ Mapped locations:");
        console.log("   - Origin:", searchData.origin, "->", originCode);
        console.log(
          "   - Destination:",
          searchData.destination,
          "->",
          destinationCode
        );

        const mockData = generateMockFlights(
          originCode,
          destinationCode,
          departureFormatted
        );
        console.log("📊 Generated mock data:", mockData);

        // Transform mock data to our format
        transformedResults = transformMockDataToFlightResults(
          mockData,
          departureFormatted
        );
      } else {
        // Use real API
        console.log("🌐 Using real API for flight search");

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
        console.log("📤 API Request URL:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY || "",
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
          },
        });

        console.log("📥 API Response Status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.log("❌ API Error Response:", errorText);
          throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("📦 Full API Response:", data);

        // Transform API response to our format
        transformedResults = transformApiDataToFlightResults(
          data,
          departureFormatted
        );
      }

      console.log("🔄 Transformed Results:", transformedResults);
      console.log("📈 Results Count:", transformedResults.length);

      set({ results: transformedResults, isLoading: false });
      console.log("✅ Store updated with results successfully!");
    } catch (error) {
      console.error("❌ Flight search error:", error);
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

// Helper function to map location names to airport codes
function mapLocationToAirportCode(location: string): string {
  const locationMap: Record<string, string> = {
    "Buenos Aires": "EZE",
    "Eastern Europe": "MAD", // Default to Madrid
    Madrid: "MAD",
    Paris: "CDG",
    London: "LHR",
    "New York": "JFK",
    Rome: "FCO",
    Amsterdam: "AMS",
    Frankfurt: "FRA",
    Barcelona: "BCN",
    Milan: "MXP",
    Vienna: "VIE",
  };
  return locationMap[location] || "MAD"; // Default fallback
}

// Transform mock data to FlightResult format
function transformMockDataToFlightResults(
  mockData: MockDataResponse,
  departureDate: string
): FlightResult[] {
  if (!mockData?.data?.itinerary?.legs) {
    console.warn("⚠️ Invalid mock data structure");
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
    console.warn("⚠️ Invalid API data structure");
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
