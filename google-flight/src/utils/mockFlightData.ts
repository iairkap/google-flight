// src/utils/mockFlightData.ts
// import { getCityImageFromUnsplash } from './unsplashApi'; // Para uso futuro

// Cache para imágenes ya obtenidas de Unsplash (para uso futuro)
// const imageCache: Record<string, string> = {};

// Configuración central de destinos populares (siguiendo principio de Single Responsibility)
export const popularDestinationsConfig = [
  {
    id: "london",
    name: "London",
    code: "LHR",
    city: "London",
    country: "United Kingdom",
    description:
      "Historic city with iconic landmarks like Big Ben and the Tower Bridge",
    coordinates: [51.5074, -0.1278] as [number, number],
  },
  {
    id: "newyork",
    name: "New York",
    code: "JFK",
    city: "New York",
    country: "United States",
    description:
      "The city that never sleeps, famous for Times Square and Central Park",
    coordinates: [40.7128, -74.006] as [number, number],
  },
  {
    id: "paris",
    name: "Paris",
    code: "CDG",
    city: "Paris",
    country: "France",
    description: "City of lights with the Eiffel Tower and world-class museums",
    coordinates: [48.8566, 2.3522] as [number, number],
  },
  {
    id: "singapore",
    name: "Singapore",
    code: "SIN",
    city: "Singapore",
    country: "Singapore",
    description:
      "Modern city-state known for its gardens, cuisine, and architecture",
    coordinates: [1.3521, 103.8198] as [number, number],
  },
  {
    id: "madrid",
    name: "Madrid",
    code: "MAD",
    city: "Madrid",
    country: "Spain",
    description: "Vibrant capital with world-class museums and beautiful parks",
    coordinates: [40.4168, -3.7038] as [number, number],
  },
  {
    id: "rome",
    name: "Rome",
    code: "FCO",
    city: "Rome",
    country: "Italy",
    description:
      "Eternal city with ancient history and magnificent architecture",
    coordinates: [41.9028, 12.4964] as [number, number],
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    code: "AMS",
    city: "Amsterdam",
    country: "Netherlands",
    description: "Beautiful canals, world-class museums, and vibrant culture",
    coordinates: [52.3676, 4.9041] as [number, number],
  },
  {
    id: "frankfurt",
    name: "Frankfurt",
    code: "FRA",
    city: "Frankfurt",
    country: "Germany",
    description: "Financial hub with modern skyline and rich cultural heritage",
    coordinates: [50.1109, 8.6821] as [number, number],
  },
  {
    id: "barcelona",
    name: "Barcelona",
    code: "BCN",
    city: "Barcelona",
    country: "Spain",
    description:
      "Stunning architecture, beautiful beaches, and vibrant nightlife",
    coordinates: [41.3851, 2.1734] as [number, number],
  },
  {
    id: "milan",
    name: "Milan",
    code: "MXP",
    city: "Milan",
    country: "Italy",
    description: "Fashion capital with stunning Gothic cathedral and La Scala",
    coordinates: [45.4642, 9.19] as [number, number],
  },
  {
    id: "vienna",
    name: "Vienna",
    code: "VIE",
    city: "Vienna",
    country: "Austria",
    description: "Imperial palaces, classical music, and elegant coffee houses",
    coordinates: [48.2082, 16.3738] as [number, number],
  },
];

// Configuración de destinos favoritos (mantenemos compatibilidad)
export const favoriteDestinationsConfig = popularDestinationsConfig.slice(0, 4);

// Función para obtener destinos favoritos con imágenes de Unsplash
export const getFavoriteDestinations = () => {
  return favoriteDestinationsConfig.map((destination) => ({
    ...destination,
    image: getCityImageSync(destination.code),
  }));
};

// Función para obtener todos los destinos populares con imágenes
export const getPopularDestinations = () => {
  return popularDestinationsConfig.map((destination) => ({
    ...destination,
    image: getCityImageSync(destination.code),
  }));
};

// Configuración central de aeropuertos y ciudades
export const airportsConfig: Record<string, string> = {
  EZE: "Ezeiza International Airport",
  MAD: "Madrid-Barajas Airport",
  CDG: "Charles de Gaulle Airport",
  LHR: "Heathrow Airport",
  JFK: "John F. Kennedy International Airport",
  FCO: "Leonardo da Vinci Airport",
  AMS: "Amsterdam Airport Schiphol",
  FRA: "Frankfurt Airport",
  BCN: "Barcelona-El Prat Airport",
  MXP: "Milan Malpensa Airport",
  VIE: "Vienna International Airport",
  LGW: "London Gatwick Airport",
  SIN: "Singapore Changi Airport",
};

export const citiesConfig: Record<string, string> = {
  EZE: "Buenos Aires",
  MAD: "Madrid",
  CDG: "Paris",
  LHR: "London",
  JFK: "New York",
  FCO: "Rome",
  AMS: "Amsterdam",
  FRA: "Frankfurt",
  BCN: "Barcelona",
  MXP: "Milan",
  VIE: "Vienna",
  LGW: "London",
  SIN: "Singapore",
};

// Mapeo para el store (centralizado)
export const locationToAirportMap: Record<string, string> = {
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

export const mockFlightResponse = {
  status: true,
  timestamp: 1691009267165,
  data: {
    itinerary: {
      legs: [
        {
          id: "13542-2402201235--30598-0-12712-2402201550",
          origin: {
            id: "13542",
            name: "London Gatwick",
            displayCode: "LGW",
            city: "London",
          },
          destination: {
            id: "12712",
            name: "New York John F. Kennedy",
            displayCode: "JFK",
            city: "New York",
          },
          segments: [
            {
              id: "13542-12712-2402201235-2402201550--30598",
              origin: {
                id: "13542",
                name: "London Gatwick",
                displayCode: "LGW",
                city: "London",
              },
              destination: {
                id: "12712",
                name: "New York John F. Kennedy",
                displayCode: "JFK",
                city: "New York",
              },
              duration: 495,
              dayChange: 0,
              flightNumber: "Z0701",
              departure: "2024-02-20T12:35:00",
              arrival: "2024-02-20T15:50:00",
              marketingCarrier: {
                id: "-30598",
                name: "Norse Atlantic Airways (UK)",
                displayCode: "Z0",
                displayCodeType: "IATA",
                logo: "https://logos.skyscnr.com/images/airlines/favicon/I).png",
                altId: "I)",
              },
            },
          ],
          duration: 495,
          stopCount: 0,
          departure: "2024-02-20T12:35:00",
          arrival: "2024-02-20T15:50:00",
          dayChange: 0,
        },
      ],
      pricingOptions: [
        {
          agents: [
            {
              id: "arus",
              name: "Mytrip",
              price: 270.99,
            },
          ],
          totalPrice: 270.99,
        },
        {
          agents: [
            {
              id: "edus",
              name: "eDreams",
              price: 272.81,
            },
          ],
          totalPrice: 272.81,
        },
        {
          agents: [
            {
              id: "xpus",
              name: "Expedia",
              price: 277.98,
            },
          ],
          totalPrice: 277.98,
        },
        {
          agents: [
            {
              id: "skyp",
              name: "Kiwi.com",
              price: 280,
            },
          ],
          totalPrice: 280,
        },
      ],
    },
  },
};

// Generate multiple flight variations for different routes
export const generateMockFlights = (
  origin: string,
  destination: string,
  departureDate: string
) => {
  const airlines = [
    { name: "Lufthansa", code: "LH", id: "lh" },
    { name: "Air France", code: "AF", id: "af" },
    { name: "British Airways", code: "BA", id: "ba" },
    { name: "KLM", code: "KL", id: "kl" },
    { name: "Iberia", code: "IB", id: "ib" },
  ];

  const basePrice = Math.floor(Math.random() * 600) + 300; // $300-$900
  const flightCount = Math.floor(Math.random() * 3) + 3; // 3-5 flights

  const legs = Array.from({ length: flightCount }, (_, index) => {
    const airline = airlines[index % airlines.length];
    const flightNumber = `${airline.code}${
      Math.floor(Math.random() * 9000) + 1000
    }`;
    const duration = Math.floor(Math.random() * 300) + 180; // 3-8 hours
    const stops = Math.random() > 0.7 ? 1 : 0; // 30% chance of 1 stop

    // Generate departure time (6 AM to 10 PM)
    const depHour = Math.floor(Math.random() * 16) + 6;
    const depMinute = Math.floor(Math.random() * 60);
    const departure = `${departureDate}T${String(depHour).padStart(
      2,
      "0"
    )}:${String(depMinute).padStart(2, "0")}:00`;

    // Calculate arrival time
    const depTime = new Date(departure);
    const arrTime = new Date(depTime.getTime() + duration * 60000);
    const arrival = arrTime.toISOString().slice(0, 19);

    return {
      id: `flight-${index + 1}`,
      origin: {
        id: origin,
        name: getAirportName(origin),
        displayCode: origin,
        city: getCityName(origin),
      },
      destination: {
        id: destination,
        name: getAirportName(destination),
        displayCode: destination,
        city: getCityName(destination),
      },
      segments: [
        {
          id: `segment-${index + 1}`,
          origin: {
            id: origin,
            name: getAirportName(origin),
            displayCode: origin,
            city: getCityName(origin),
          },
          destination: {
            id: destination,
            name: getAirportName(destination),
            displayCode: destination,
            city: getCityName(destination),
          },
          duration: duration,
          dayChange: 0,
          flightNumber: flightNumber,
          departure: departure,
          arrival: arrival,
          marketingCarrier: {
            id: airline.id,
            name: airline.name,
            displayCode: airline.code,
            displayCodeType: "IATA",
            logo: `https://logos.skyscnr.com/images/airlines/favicon/${airline.code}.png`,
            altId: airline.code,
          },
        },
      ],
      duration: duration,
      stopCount: stops,
      departure: departure,
      arrival: arrival,
      dayChange: 0,
      // Add destination image for UI display
      destinationImage: getCityImageSync(destination),
      originImage: getCityImageSync(origin),
    };
  });

  const pricingOptions = legs.map((_, index) => ({
    agents: [
      {
        id: `agent-${index}`,
        name: ["Expedia", "Booking.com", "Kayak", "Skyscanner", "Momondo"][
          index % 5
        ],
        price: basePrice + index * 20 + Math.floor(Math.random() * 50),
      },
    ],
    totalPrice: basePrice + index * 20 + Math.floor(Math.random() * 50),
  }));

  return {
    status: true,
    timestamp: Date.now(),
    data: {
      itinerary: {
        legs: legs,
        pricingOptions: pricingOptions,
      },
    },
  };
};

function getAirportName(code: string): string {
  return airportsConfig[code] || `${code} Airport`;
}

function getCityName(code: string): string {
  return citiesConfig[code] || code;
}

function getCityImageSync(code: string): string {
  const fallbackImages: Record<string, string> = {
    EZE: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&auto=format&fit=crop&q=60", // Buenos Aires
    MAD: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&auto=format&fit=crop&q=60", // Madrid
    CDG: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop&q=60", // Paris - Eiffel Tower
    LHR: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=60", // London
    LGW: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=60", // London
    JFK: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop&q=60", // New York
    FCO: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&auto=format&fit=crop&q=60", // Rome
    AMS: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&auto=format&fit=crop&q=60", // Amsterdam
    FRA: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&auto=format&fit=crop&q=60", // Frankfurt
    BCN: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&auto=format&fit=crop&q=60", // Barcelona
    MXP: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&auto=format&fit=crop&q=60", // Milan
    VIE: "https://images.unsplash.com/photo-1516550893923-42d954725656?w=800&auto=format&fit=crop&q=60", // Vienna
    SIN: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=60", // Singapore
  };

  return (
    fallbackImages[code] ||
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop&q=60"
  );
}
