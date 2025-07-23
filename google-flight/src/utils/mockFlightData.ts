// src/utils/mockFlightData.ts
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
      destinationImage: getCityImage(destination),
      originImage: getCityImage(origin),
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
  const airports: Record<string, string> = {
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
  return airports[code] || `${code} Airport`;
}

function getCityName(code: string): string {
  const cities: Record<string, string> = {
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
  return cities[code] || code;
}

function getCityImage(code: string): string {
  const cityImages: Record<string, string> = {
    // Buenos Aires
    EZE: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Buenos_Aires_Collage.png/800px-Buenos_Aires_Collage.png",

    // Madrid
    MAD: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Madrid_Skyline_from_Torre_Espacio_2.jpg/800px-Madrid_Skyline_from_Torre_Espacio_2.jpg",

    // Paris
    CDG: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/800px-Tour_Eiffel_Wikimedia_Commons.jpg",

    // London
    LHR: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Montage_L.jpg/800px-London_Montage_L.jpg",

    // New York
    JFK: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Manhattan_at_Dusk_by_slonecker.jpg/800px-Manhattan_at_Dusk_by_slonecker.jpg",

    // Rome
    FCO: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Rome_Montage_2017.png/800px-Rome_Montage_2017.png",

    // Amsterdam
    AMS: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/KeizersgrachtReguliersgrachtAmsterdam.jpg/800px-KeizersgrachtReguliersgrachtAmsterdam.jpg",

    // Frankfurt
    FRA: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Frankfurt_skyline_2015.jpg/800px-Frankfurt_skyline_2015.jpg",

    // Barcelona
    BCN: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Skyline_Barcelona.jpg/800px-Skyline_Barcelona.jpg",

    // Milan
    MXP: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Piazza_del_Duomo_%28Milano%29.jpg/800px-Piazza_del_Duomo_%28Milano%29.jpg",

    // Vienna
    VIE: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Wien_-_Skyline_bei_Nacht.jpg/800px-Wien_-_Skyline_bei_Nacht.jpg",

    // London Gatwick (usamos imagen de Londres)
    LGW: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Montage_L.jpg/800px-London_Montage_L.jpg",

    // Singapore
    SIN: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Singapore_Panorama_v2.jpg/800px-Singapore_Panorama_v2.jpg",
  };
  return (
    cityImages[code] ||
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Airplane_silhouette.svg/800px-Airplane_silhouette.svg.png"
  ); // Default travel image
}
