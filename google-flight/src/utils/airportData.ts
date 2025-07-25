// src/utils/airportData.ts
import type { Airport, LocationSuggestion } from "@/types/airport";

// Mock airport data - in a real app, this would come from an API
export const MOCK_AIRPORTS: Airport[] = [
  // Estados Unidos
  {
    code: "JFK",
    name: "John F. Kennedy International Airport",
    city: "New York",
    country: "United States",
    type: "airport",
  },
  {
    code: "LAX",
    name: "Los Angeles International Airport",
    city: "Los Angeles",
    country: "United States",
    type: "airport",
  },
  {
    code: "MIA",
    name: "Miami International Airport",
    city: "Miami",
    country: "United States",
    type: "airport",
  },
  {
    code: "ORD",
    name: "O'Hare International Airport",
    city: "Chicago",
    country: "United States",
    type: "airport",
  },
  // Reino Unido
  {
    code: "LHR",
    name: "Heathrow Airport",
    city: "London",
    country: "United Kingdom",
    type: "airport",
  },
  // Francia
  {
    code: "CDG",
    name: "Charles de Gaulle Airport",
    city: "Paris",
    country: "France",
    type: "airport",
  },
  // Japón
  {
    code: "NRT",
    name: "Narita International Airport",
    city: "Tokyo",
    country: "Japan",
    type: "airport",
  },
  // Australia
  {
    code: "SYD",
    name: "Sydney Kingsford Smith Airport",
    city: "Sydney",
    country: "Australia",
    type: "airport",
  },
  // Emiratos Árabes Unidos
  {
    code: "DXB",
    name: "Dubai International Airport",
    city: "Dubai",
    country: "United Arab Emirates",
    type: "airport",
  },
  // Singapur
  {
    code: "SIN",
    name: "Singapore Changi Airport",
    city: "Singapore",
    country: "Singapore",
    type: "airport",
  },
  // Alemania
  {
    code: "FRA",
    name: "Frankfurt Airport",
    city: "Frankfurt",
    country: "Germany",
    type: "airport",
  },
  // España
  {
    code: "MAD",
    name: "Adolfo Suárez Madrid-Barajas Airport",
    city: "Madrid",
    country: "Spain",
    type: "airport",
  },
  {
    code: "BCN",
    name: "Barcelona-El Prat Airport",
    city: "Barcelona",
    country: "Spain",
    type: "airport",
  },
  // México
  {
    code: "MEX",
    name: "Mexico City International Airport",
    city: "Mexico City",
    country: "Mexico",
    type: "airport",
  },
  {
    code: "CUN",
    name: "Cancún International Airport",
    city: "Cancún",
    country: "Mexico",
    type: "airport",
  },
  // Argentina
  {
    code: "EZE",
    name: "Ezeiza International Airport",
    city: "Buenos Aires",
    country: "Argentina",
    type: "airport",
  },
  // Brasil
  {
    code: "GRU",
    name: "São Paulo/Guarulhos International Airport",
    city: "São Paulo",
    country: "Brazil",
    type: "airport",
  },
  {
    code: "GIG",
    name: "Rio de Janeiro/Galeão International Airport",
    city: "Rio de Janeiro",
    country: "Brazil",
    type: "airport",
  },
  // Ciudades (para búsquedas por ciudad)
  {
    code: "NYC",
    name: "New York",
    city: "New York",
    country: "United States",
    type: "city",
  },
  {
    code: "LON",
    name: "London",
    city: "London",
    country: "United Kingdom",
    type: "city",
  },
  {
    code: "PAR",
    name: "Paris",
    city: "Paris",
    country: "France",
    type: "city",
  },
  {
    code: "TYO",
    name: "Tokyo",
    city: "Tokyo",
    country: "Japan",
    type: "city",
  },
  {
    code: "ROM",
    name: "Rome",
    city: "Rome",
    country: "Italy",
    type: "city",
  },
];

export const searchAirports = (
  query: string
): Promise<LocationSuggestion[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query.trim()) {
        resolve([]);
        return;
      }

      const searchTerm = query.toLowerCase();

      const filtered = MOCK_AIRPORTS.filter(
        (airport) =>
          airport.code.toLowerCase().includes(searchTerm) ||
          airport.name.toLowerCase().includes(searchTerm) ||
          airport.city.toLowerCase().includes(searchTerm) ||
          airport.country.toLowerCase().includes(searchTerm)
      )
        .slice(0, 8) // Limit to 8 results like Google Flights
        .map((airport) => ({
          ...airport,
          searchText: query,
          displayText:
            airport.type === "city"
              ? `${airport.city}, ${airport.country}`
              : `${airport.city} (${airport.code})`,
        }));

      resolve(filtered);
    }, 200); // Simulate API delay
  });
};

export const getPopularAirports = (): LocationSuggestion[] => {
  const popular = [
    "JFK",
    "LAX",
    "LHR",
    "CDG",
    "MAD",
    "BCN",
    "NYC",
    "LON",
    "PAR",
  ];

  const result = MOCK_AIRPORTS.filter((airport) =>
    popular.includes(airport.code)
  ).map((airport) => ({
    ...airport,
    searchText: "",
    displayText:
      airport.type === "city"
        ? `${airport.city}, ${airport.country}`
        : `${airport.city} (${airport.code})`,
  }));

  return result;
};

export const getLocationDisplayText = (location: string): string => {
  if (!location) return "";

  const airport = MOCK_AIRPORTS.find(
    (a) => a.code === location || a.city === location || a.name === location
  );

  if (airport) {
    return airport.type === "city"
      ? `${airport.city}, ${airport.country}`
      : `${airport.city} (${airport.code})`;
  }

  return location;
};
