# Google Flights Clone - Application Documentation

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & Design Patterns](#architecture--design-patterns)
4. [SOLID Principles Implementation](#solid-principles-implementation)
5. [Component Architecture](#component-architecture)
6. [State Management](#state-management)
7. [Custom Hooks](#custom-hooks)
8. [Material-UI Implementation](#material-ui-implementation)
9. [Data Management Strategy](#data-management-strategy)
10. [API Integration & Hardcoded Data](#api-integration--hardcoded-data)
11. [Image Management with Unsplash](#image-management-with-unsplash)
12. [File Structure](#file-structure)
13. [Key Features](#key-features)
14. [Development & Build](#development--build)

## Overview

This application is a Google Flights clone built with React, TypeScript, and Material-UI. It provides a modern, responsive interface for flight search functionality with interactive maps, destination recommendations, and a comprehensive user experience that mirrors Google Flights' design and functionality.

The application follows modern React patterns with TypeScript for type safety, implements SOLID design principles, and uses a combination of real APIs and hardcoded data to provide a robust demonstration of flight booking capabilities.

## Technology Stack

### Core Technologies

- **React 19.1.0** - Frontend framework with latest features
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Fast build tool and development server
- **Material-UI (MUI) 7.2.0** - React component library for Material Design

### State Management

- **Zustand 5.0.6** - Lightweight state management solution

### UI & Styling

- **@mui/material** - Core Material-UI components
- **@mui/icons-material** - Material Design icons
- **@emotion/react & @emotion/styled** - CSS-in-JS styling solution

### Maps & Geolocation

- **React Leaflet 5.0.0** - Interactive maps with markers
- **Leaflet 1.9.4** - Map library for destination visualization

### Date Management

- **Day.js 1.11.13** - Lightweight date manipulation
- **@mui/x-date-pickers-pro** - Advanced date picker components

### Routing

- **React Router DOM 7.7.0** - Client-side routing

## Architecture & Design Patterns

### Component-Based Architecture

The application follows a modular component architecture with clear separation of concerns:

```
src/
├── components/          # Reusable UI components
├── pages/              # Page-level components
├── hooks/              # Custom React hooks
├── store/              # State management (Zustand)
├── types/              # TypeScript type definitions
├── styles/             # Styled components and themes
├── utils/              # Utility functions
├── data/               # Static data and configurations
└── constants/          # Application constants
```

### Design Patterns Used

1. **Container/Presentational Pattern** - Separation of logic and presentation
2. **Custom Hooks Pattern** - Reusable stateful logic
3. **Compound Components** - Complex components broken into smaller, manageable pieces
4. **Provider Pattern** - State management through Zustand store
5. **Facade Pattern** - Simplified interfaces for complex subsystems

## SOLID Principles Implementation

### Single Responsibility Principle (SRP)

Each component has a single, well-defined responsibility:

- **`FlightCard`** - Only displays flight information
- **`LocationSelector`** - Only handles location input and selection
- **`DateSelector`** - Only manages date selection
- **`SearchButton`** - Only handles search trigger functionality

### Open/Closed Principle (OCP)

Components are open for extension but closed for modification:

- **Base component props interfaces** allow extension without modifying core components
- **Custom hooks** can be extended with additional functionality
- **Theme configuration** allows styling changes without component modification

```typescript
// Example: BaseComponentProps allows extension
export interface BaseComponentProps {
  className?: string;
}

export interface FlightCardProps extends BaseComponentProps {
  flight: FlightResult;
  onSelect?: (flight: FlightResult) => void;
}
```

### Liskov Substitution Principle (LSP)

Subcomponents can replace parent components without breaking functionality:

- **Location selector components** (`LocationField`, `LocationPopup`) are interchangeable
- **Flight result components** can be substituted with different implementations
- **Date picker components** follow consistent interfaces

### Interface Segregation Principle (ISP)

Interfaces are split into smaller, specific contracts:

```typescript
// Specific interfaces for different concerns
export interface FlightSearchState {
  origin: string;
  destination: string;
  departureDate: Dayjs | null;
  returnDate: Dayjs | null;
}

export interface FlightResultsProps {
  className?: string;
}

export interface MapProps extends BaseComponentProps {
  height?: string;
  showPrices?: boolean;
}
```

### Dependency Inversion Principle (DIP)

High-level modules don't depend on low-level modules:

- **Components depend on abstractions** (TypeScript interfaces) rather than concrete implementations
- **Store interactions** are abstracted through custom hooks
- **API calls** are abstracted through service layers

```typescript
// High-level component depends on abstraction
export const useFlightSearch = () => {
  const { searchData, updateSearchData } = useFlightStore(); // Abstraction
  // Implementation details hidden
};
```

## Component Architecture

### Core Components

#### 1. Search Components

- **`SearchBar`** - Main search interface container
- **`SearchBarTop`** - Trip type, passenger, and class selection
- **`SearchBarBottom`** - Origin, destination, and date selection
- **`LocationSelector`** - Location input with autocomplete
- **`DateSelector`** - Date range picker interface
- **`SearchButton`** - Search trigger with loading states

#### 2. Results Components

- **`FlightResults`** - Flight search results container
- **`FlightCard`** - Individual flight display
- **`FlightList`** - List of flight results
- **`Loader`** - Loading states and animations

#### 3. Destination Components

- **`PopularDestinations`** - Scrollable destination cards
- **`RecommendedDestinations`** - Personalized recommendations
- **`DestinationsMap`** - Interactive map with markers
- **`ExploreDestinationsSection`** - Exploration interface

#### 4. Information Components

- **`FAQ`** - Frequently asked questions accordion
- **`UsefulToolsSection`** - Feature highlights and tools
- **`HelpSection`** - User assistance interface

#### 5. Layout Components

- **`HeroSection`** - Main banner with background
- **`GoogleTopBar`** - Navigation header
- **`PageSection`** - Content section wrapper

### Component Composition

Components follow a composition-over-inheritance pattern:

```typescript
// Example: HeroSection composition
const HeroSection: React.FC<HeroSectionProps> = ({
  children,
  title = "Flights",
  backgroundImageUrl,
  className,
}) => {
  return (
    <Box sx={heroSectionWrapperStyles} className={className}>
      <HeroBackground title={title} backgroundImageUrl={backgroundImageUrl} />
      <HeroContent>{children}</HeroContent>
    </Box>
  );
};
```

## State Management

### Zustand Store Implementation

The application uses Zustand for state management with a single store pattern:

```typescript
interface FlightStore {
  // Search data
  searchData: FlightSearchData;
  updateSearchData: (data: Partial<FlightSearchData>) => void;

  // Results
  results: FlightResult[];
  isLoading: boolean;
  error: string | null;

  // User data
  userLocation: UserLocation | null;
  favoriteDestinations: FavoriteDestination[];

  // Actions
  searchFlights: () => Promise<void>;
  detectUserLocation: () => Promise<void>;
}
```

### Store Features

- **Automatic location detection** using browser geolocation and IP fallback
- **Flight search** with mock data and API integration
- **Persistent user preferences** and favorite destinations
- **Error handling** and loading states
- **Real-time updates** for search parameters

## Custom Hooks

### Data Management Hooks

1. **`useFlightSearch`** - Flight search form state and actions
2. **`useLocation`** - User location detection and management
3. **`useRecommendedFlights`** - Personalized flight recommendations
4. **`useFAQState`** - FAQ accordion state management
5. **`useLocationSelector`** - Location input and suggestion handling

### UI Interaction Hooks

1. **`usePopularDestinationsScroll`** - Horizontal scrolling for destination cards
2. **`useRecommendedDestinationsData`** - Data aggregation for recommendations

### Example Hook Implementation

```typescript
export const useFlightSearch = () => {
  const { searchData, updateSearchData } = useFlightStore();

  const handleSwapLocations = () => {
    updateSearchData({
      origin: searchData.destination,
      destination: searchData.origin,
    });
  };

  return {
    // State
    origin: searchData.origin,
    destination: searchData.destination,
    departureDate: searchData.departureDate,
    returnDate: searchData.returnDate,

    // Actions
    setOrigin: (origin: string) => updateSearchData({ origin }),
    setDestination: (destination: string) => updateSearchData({ destination }),
    handleSwapLocations,
  };
};
```

## Material-UI Implementation

### Design System Integration

The application implements Google's Material Design through Material-UI with custom theming:

#### 1. Color System

```typescript
export const COLORS = {
  primary: "#1976d2", // Google Blue
  secondary: "#f50057", // Accent Pink
  background: {
    default: "#ffffff", // Clean white background
    paper: "#f5f5f5", // Card backgrounds
  },
  text: {
    primary: "#202124", // Google's text color
    secondary: "#5f6368", // Muted text
  },
};
```

#### 2. Typography System

```typescript
export const TYPOGRAPHY = {
  fontSizes: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "24px",
    "2xl": "32px",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export const GOOGLE_FONTS = {
  primary: '"Google Sans", Roboto, "Helvetica Neue", Arial, sans-serif',
  secondary: 'Roboto, "Helvetica Neue", Arial, sans-serif',
};
```

#### 3. Component Styling Approach

**Styled System Objects (SxProps)**:

```typescript
export const flightCardStyles: SxProps<Theme> = {
  mb: 2,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: 2,
    borderColor: "primary.main",
  },
};
```

**Benefits of this approach**:

- **Theme consistency** - All components use the same design tokens
- **Responsive design** - Built-in breakpoint system
- **Type safety** - Full TypeScript support for styles
- **Performance** - Optimized CSS-in-JS with Emotion

#### 4. Key Material-UI Components Used

- **Layout**: `Box`, `Container`, `Grid`, `Stack`
- **Navigation**: `AppBar`, `Button`, `IconButton`, `Menu`
- **Data Display**: `Card`, `Typography`, `Chip`, `Avatar`
- **Inputs**: `TextField`, `Select`, `Button`, `Checkbox`
- **Feedback**: `Alert`, `CircularProgress`, `LinearProgress`
- **Surfaces**: `Paper`, `Accordion`, `Dialog`

#### 5. Responsive Design Implementation

**Custom Media Queries Strategy**:

The application implements a custom responsive design approach using CSS media queries instead of Material-UI's breakpoint system for more precise control at the 768px breakpoint:

```typescript
// Custom media queries at 768px breakpoint
sx={{
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)', // Desktop: four columns
  gap: '16px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr'           // Mobile: single column
  }
}}
```

**Mobile-First Responsive Components**:

```typescript
// RecommendedFlightCard - Horizontal layout for mobile
sx={{
  height: '100%',
  cursor: 'pointer',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'row',      // Horizontal card layout
    height: 'auto'
  }
}}

// Image sizing with responsive width
sx={{
  width: 'calc(100% - 16px)',
  '@media (max-width: 768px)': {
    width: '40%',              // 40% width for mobile
    height: '120px',
    flexShrink: 0
  }
}}
```

**Container Responsive Behavior**:

```typescript
// Home page container with mobile spacing
sx={{
  maxWidth: { xs: '100%', sm: '768px', lg: '1024px' },
  '@media (max-width: 768px)': {
    marginTop: '3rem'          // Mobile-specific top spacing
  }
}}
```

## Data Management Strategy

### Multi-Source Data Architecture

The application implements a hybrid data strategy combining multiple sources:

#### 1. Static Configuration Data

```typescript
// Destination configurations
export const favoriteDestinations = [
  {
    id: "madrid",
    name: "Madrid",
    code: "MAD",
    city: "Madrid",
    country: "Spain",
    coordinates: [40.4168, -3.7038],
    description: "Vibrant capital with world-class museums",
  },
  // ... more destinations
];
```

#### 2. Mock Flight Data Generator

```typescript
export const generateMockFlights = (
  origin: string,
  destination: string,
  departureDate: string
): MockDataResponse => {
  // Dynamic flight generation with realistic data
  const airlines = ["Iberia", "Lufthansa", "Air France", "British Airways"];
  const prices = generateRealisticPricing(origin, destination);

  return {
    data: {
      itinerary: {
        legs: generateFlightLegs(origin, destination, departureDate),
        pricingOptions: generatePricingOptions(prices),
      },
    },
  };
};
```

#### 3. API Integration Layer

```typescript
// Sky Scrapper API integration (when not using mock data)
const searchFlights = async () => {
  if (useMockData) {
    // Use generated mock data
    const mockData = generateMockFlights(
      originCode,
      destinationCode,
      departureFormatted
    );
    transformedResults = transformMockDataToFlightResults(
      mockData,
      departureFormatted
    );
  } else {
    // Use real API
    const response = await fetch(apiUrl, { headers: rapidApiHeaders });
    const data = await response.json();
    transformedResults = transformApiDataToFlightResults(
      data,
      departureFormatted
    );
  }
};
```

## Responsive Design Strategy

### Custom Media Queries Implementation

Unlike many applications that rely on Material-UI's breakpoint system, this project implements **custom CSS media queries** for more precise control over responsive behavior at the 768px breakpoint:

#### 1. Strategic Breakpoint Selection

```typescript
// Strategic 768px breakpoint for mobile/desktop distinction
const RESPONSIVE_BREAKPOINT = '768px';

// Custom media query implementation
'@media (max-width: 768px)': {
  // Mobile-specific styles
}
```

#### 2. Grid System Transformation

**Desktop Layout (>768px)**:

```typescript
// Four-column grid for desktop
sx={{
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '16px'
}}
```

**Mobile Layout (≤768px)**:

```typescript
// Single-column layout for mobile readability
'@media (max-width: 768px)': {
  gridTemplateColumns: '1fr'
}
```

#### 3. Card Layout Transformation

**RecommendedFlightCard Mobile Optimization**:

```typescript
// Desktop: Vertical card layout
const desktopCardLayout = {
  display: 'block',
  flexDirection: 'column'
};

// Mobile: Horizontal card layout
'@media (max-width: 768px)': {
  display: 'flex',
  flexDirection: 'row',
  height: 'auto'
}
```

**Image Responsive Sizing**:

```typescript
// Desktop: Full-width image
sx={{
  width: 'calc(100% - 16px)',
  height: '105px'
}}

// Mobile: 40% width for horizontal layout
'@media (max-width: 768px)': {
  width: '40%',
  height: '120px',
  flexShrink: 0
}
```

#### 4. Container Adaptive Behavior

```typescript
// Home page container responsive adaptation
sx={{
  maxWidth: { xs: '100%', sm: '768px', lg: '1024px' },
  '@media (max-width: 768px)': {
    marginTop: '3rem'  // Mobile-specific spacing
  }
}}
```

#### 5. Tools Section Responsive Layout

```typescript
// UsefulToolsSection mobile optimization
sx={{
  display: 'flex',
  gap: 6,
  height: '60dvh',
  '@media (max-width: 768px)': {
    flexDirection: 'row',  // Maintain horizontal layout
    gap: 3,
    height: '100%'         // Adaptive height
  }
}}
```

### Benefits of Custom Media Queries

1. **Precise Control** - Exact 768px breakpoint matching design requirements
2. **Performance** - No Material-UI breakpoint overhead
3. **Consistency** - Uniform responsive behavior across components
4. **Maintainability** - Clear, explicit responsive rules
5. **Flexibility** - Easy customization without framework constraints

## API Integration & Hardcoded Data

### Strategic Decision: Mock Data Implementation

Due to **Skyscanner API quote limitations** and development cost considerations, the application implements a sophisticated mock data system that provides realistic flight information without consuming API quota.

#### 1. API Limitations Challenge

```typescript
// Original Skyscanner integration plan
const SKYSCANNER_CHALLENGES = {
  quotaLimitations: "Limited free tier requests per month",
  costPerRequest: "High cost for production-level usage",
  developmentConstraints: "Quota exhaustion during development",
  rateLimiting: "Strict rate limits affecting user experience",
};
```

#### 2. Mock Data Solution Benefits

```typescript
// Comprehensive mock data system
const MOCK_DATA_ADVANTAGES = {
  unlimitedRequests: "No API quota consumption",
  predictableData: "Consistent testing scenarios",
  offlineCapability: "Works without internet connection",
  customization: "Tailored data for demonstration purposes",
  rapidDevelopment: "Fast iteration and testing",
};
```

#### 3. Mock Data Implementation Strategy

**Realistic Flight Generation**:

```typescript
export const generateMockFlights = (
  origin: string,
  destination: string,
  date: string
) => {
  const basePrice = calculateBasePrice(origin, destination);
  const airlines = getRealisticAirlines(origin, destination);
  const flightTimes = generateRealisticSchedules(origin, destination);

  return {
    legs: airlines.map((airline, index) => ({
      id: `flight-${index + 1}`,
      airline: airline.name,
      flightNumber: generateFlightNumber(airline.code),
      departure: flightTimes[index].departure,
      arrival: flightTimes[index].arrival,
      duration: calculateFlightDuration(origin, destination),
      price: basePrice + (Math.random() * 200 - 100), // Price variance
      stops: Math.random() > 0.7 ? 1 : 0, // 30% chance of stops
    })),
  };
};
```

**Dynamic Pricing Algorithm**:

```typescript
const calculateBasePrice = (origin: string, destination: string): number => {
  const distanceFactors = {
    "EZE-MAD": 850, // Buenos Aires to Madrid
    "EZE-CDG": 900, // Buenos Aires to Paris
    "EZE-LHR": 950, // Buenos Aires to London
    // ... more routes
  };

  const routeKey = `${origin}-${destination}`;
  const basePrice = distanceFactors[routeKey] || 600;

  // Add seasonal and demand factors
  return basePrice * (0.8 + Math.random() * 0.4); // ±20% variance
};
```

#### 4. API Integration Architecture

**Flexible API Switching**:

```typescript
interface FlightStore {
  useMockData: boolean; // Toggle between mock and real API
  setUseMockData: (value: boolean) => void;
}

const searchFlights = async () => {
  const { useMockData } = get();

  if (useMockData) {
    // Use sophisticated mock data
    return handleMockDataSearch();
  } else {
    // Use real API (when quota available)
    return handleRealApiSearch();
  }
};
```

## Image Management with Unsplash

### Unsplash API Integration Strategy

The application uses Unsplash's free API for high-quality destination images with a strategic caching approach:

#### 1. Unsplash Implementation

```typescript
// Destination image URLs from Unsplash
const destinationImages = {
  madrid:
    "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop",
  paris:
    "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
  london:
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
  // ... more destinations
};
```

#### 2. Image URL Strategy

```typescript
// Optimized Unsplash URLs with parameters
const generateImageUrl = (searchTerm: string): string => {
  const baseUrl = "https://images.unsplash.com/photo-";
  const photoId = getPhotoIdForDestination(searchTerm);
  const parameters = "?w=800&h=600&fit=crop&auto=format&q=80";

  return `${baseUrl}${photoId}${parameters}`;
};
```

#### 3. Benefits of Unsplash Integration

- **High-quality images** - Professional photography for all destinations
- **Consistent sizing** - Optimized dimensions for UI components
- **Free usage** - No licensing costs for demonstration purposes
- **CDN delivery** - Fast loading times globally
- **Fallback system** - Graceful handling of failed image loads

#### 4. Image Fallback System

```typescript
// Robust image handling with fallbacks
const getDestinationImage = (destination: string): string => {
  const primaryImage = destinationImages[destination.toLowerCase()];
  const fallbackImage =
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop";

  return primaryImage || fallbackImage;
};
```

## File Structure

```
google-flight/
├── public/                          # Static assets
│   └── vite.svg                    # Vite favicon
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── FAQ/                    # FAQ-related components
│   │   │   ├── FAQTitle.tsx
│   │   │   ├── FAQItem.tsx
│   │   │   ├── FAQList.tsx
│   │   │   └── index.ts
│   │   ├── FlightResults/          # Flight result components
│   │   │   ├── FlightCard.tsx
│   │   │   ├── FlightAirlineInfo.tsx
│   │   │   ├── FlightRouteInfo.tsx
│   │   │   ├── FlightDetailsInfo.tsx
│   │   │   ├── FlightPriceSection.tsx
│   │   │   ├── FlightResultsHeader.tsx
│   │   │   ├── FlightResultsList.tsx
│   │   │   ├── FlightResultsLoading.tsx
│   │   │   └── index.ts
│   │   ├── HeroSection/            # Hero section components
│   │   │   ├── HeroBackground.tsx
│   │   │   ├── HeroContent.tsx
│   │   │   └── index.ts
│   │   ├── LocationSelector/       # Location selection components
│   │   │   ├── LocationField.tsx
│   │   │   ├── LocationPopup.tsx
│   │   │   ├── SwapButton.tsx
│   │   │   └── index.ts
│   │   ├── PopularDestinations/    # Popular destinations components
│   │   │   ├── PopularDestinationCard.tsx
│   │   │   ├── PopularDestinationsTitle.tsx
│   │   │   ├── NavigationArrows.tsx
│   │   │   ├── ScrollableDestinationList.tsx
│   │   │   └── index.ts
│   │   ├── RecommendedDestinations/ # Recommended destinations
│   │   │   ├── RecommendedDestinationsGrid.tsx
│   │   │   ├── RecommendedDestinationsEmptyState.tsx
│   │   │   └── index.ts
│   │   ├── CalendarMockup.tsx      # Calendar UI mockup
│   │   ├── DateInsight.tsx         # Date selection insights
│   │   ├── DateRangePicker.tsx     # Date range selection
│   │   ├── DateSelector.tsx        # Date input component
│   │   ├── DestinationsMap.tsx     # Interactive map component
│   │   ├── ExploreDestinationsSection.tsx
│   │   ├── FAQ.tsx                 # FAQ main component
│   │   ├── FiltersPanel.tsx        # Search filters
│   │   ├── FlightCard.tsx          # Individual flight card
│   │   ├── FlightList.tsx          # Flight results list
│   │   ├── FlightResults.tsx       # Flight results container
│   │   ├── GoogleTopBar.tsx        # Top navigation
│   │   ├── HelpSection.tsx         # Help and tools section
│   │   ├── HeroSection.tsx         # Main hero section
│   │   ├── Loader.tsx              # Loading component
│   │   ├── LocationSelector.tsx    # Location input component
│   │   ├── MapSection.tsx          # Map container
│   │   ├── NearbyFlights.tsx       # Nearby flight suggestions
│   │   ├── PageSection.tsx         # Generic page section
│   │   ├── PassangerSelector.tsx   # Passenger count selector
│   │   ├── PopularDestinations.tsx # Popular destinations
│   │   ├── RecommendedDestinations.tsx
│   │   ├── RecommendedDestinationsGrid.tsx
│   │   ├── RecommendedDestinationsHeader.tsx
│   │   ├── RecommendedFlightCard.tsx
│   │   ├── SearchBar.tsx           # Main search interface
│   │   ├── SearchBarBottom.tsx     # Bottom search controls
│   │   ├── SearchBarTop.tsx        # Top search controls
│   │   ├── SearchButton.tsx        # Search trigger button
│   │   ├── SearchForm.tsx          # Search form wrapper
│   │   ├── ToolCard.tsx            # Feature tool cards
│   │   ├── TravelClassSelect.tsx   # Travel class selector
│   │   ├── TripTypeSelect.tsx      # Trip type selector
│   │   └── UsefulToolsSection.tsx  # Tools and features section
│   ├── constants/                   # Application constants
│   │   └── styles.ts               # Style constants and themes
│   ├── data/                       # Static data
│   │   └── faq.data.ts            # FAQ questions and answers
│   ├── hooks/                      # Custom React hooks
│   │   ├── useFAQState.ts         # FAQ accordion state
│   │   ├── useFlight.ts           # Flight-related operations
│   │   ├── useFlightSearch.ts     # Flight search form state
│   │   ├── useLocation.ts         # Location detection and management
│   │   ├── useLocationSelector.ts # Location input state
│   │   ├── usePopularDestinationsScroll.ts # Scrolling behavior
│   │   ├── useRecommendedDestinationsData.ts # Recommendation data
│   │   └── useRecommendedFlights.ts # Flight recommendations
│   ├── pages/                      # Page components
│   │   └── Home.tsx               # Home page
│   ├── store/                      # State management
│   │   └── flightStore.ts         # Zustand store
│   ├── styles/                     # Styled components
│   │   ├── common.ts              # Common style utilities
│   │   ├── exploreDestinations.styles.ts
│   │   ├── faq.styles.ts
│   │   ├── HeroSection.module.css
│   │   ├── heroSection.styles.ts
│   │   ├── Home.module.css
│   │   ├── LocationSelector.ts
│   │   ├── popularDestinations.styles.ts
│   │   ├── recommendedDestinations.styles.ts
│   │   ├── searchBar.styles.ts
│   │   ├── searchBarBottom.styles.ts
│   │   ├── searchBarTop.styles.ts
│   │   └── searchButton.styles.ts
│   ├── types/                      # TypeScript definitions
│   │   ├── airport.ts
│   │   ├── components.ts
│   │   ├── exploreDestinations.types.ts
│   │   ├── faq.types.ts
│   │   ├── flightResults.types.ts
│   │   ├── helpSection.types.ts
│   │   ├── heroSection.types.ts
│   │   ├── popularDestinations.types.ts
│   │   ├── recommendedDestinations.types.ts
│   │   ├── searchBar.types.ts
│   │   ├── searchBarBottom.types.ts
│   │   └── searchBarTop.types.ts
│   ├── utils/                      # Utility functions
│   │   ├── airScraperApi.ts       # API integration utilities
│   │   └── mockFlightData.ts      # Mock data generation
│   ├── App.tsx                    # Main application component
│   ├── index.css                  # Global styles
│   ├── main.tsx                   # Application entry point
│   └── vite-env.d.ts             # Vite type definitions
├── .gitignore                     # Git ignore rules
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML entry point
├── package.json                  # Dependencies and scripts
├── README.md                     # Project readme
├── tsconfig.app.json            # TypeScript app configuration
├── tsconfig.json                # TypeScript configuration
├── tsconfig.node.json           # TypeScript Node configuration
└── vite.config.ts               # Vite configuration
```

## Key Features

### 1. **Flight Search Interface**

- Real-time location autocomplete
- Date range selection with calendar
- Passenger count and travel class selection
- Trip type selection (round-trip/one-way)

### 2. **Interactive Destination Map**

- Leaflet-powered map with destination markers
- Price overlays for each destination
- User location detection and display
- Automatic bounds fitting

### 3. **Personalized Recommendations**

- Location-based flight suggestions
- Popular destinations carousel
- Recommended flights grid
- Price insights and trends

### 4. **Comprehensive Flight Results**

- Detailed flight information cards
- Airline, timing, and pricing details
- Flight duration and stop information
- Sortable and filterable results

### 5. **Educational Content**

- FAQ section with common questions
- Useful tools explanation
- Feature highlights and benefits
- Help documentation

### 6. **Responsive Design**

- **Custom media queries** at 768px breakpoint for precise mobile control
- **Mobile-first approach** with horizontal card layouts for small screens
- **Flexible grid systems** that collapse from 4 columns to 1 column on mobile
- **Touch-friendly interactions** with optimized spacing and sizing
- **Accessibility considerations** with proper focus states and contrast ratios
- **Container responsive behavior** with adaptive margins and padding

## Development & Build

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 8.0.0
```

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd google-flight

# Install dependencies
npm install
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Environment Variables

```bash
# Optional: RapidAPI key for real flight data
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
```

### Build Output

```bash
# Production build creates optimized files in /dist
npm run build

# Output includes:
# - Minified JavaScript bundles
# - Optimized CSS files
# - Static assets with cache headers
# - TypeScript type checking
```

## Conclusion

This Google Flights clone demonstrates modern React development practices with TypeScript, implementing SOLID principles and using Material-UI for a polished user interface. The strategic use of mock data and Unsplash images provides a realistic flight booking experience while managing API costs and quota limitations effectively.

The application showcases:

- **Modern React patterns** with hooks and functional components
- **Type safety** with comprehensive TypeScript implementation
- **Custom responsive design** using precise media queries at 768px breakpoint
- **Performance optimization** with code splitting and lazy loading
- **User experience** focused on mobile-first responsive layouts
- **Maintainable architecture** following SOLID principles
- **Advanced CSS Grid** implementation for responsive layouts
- **Horizontal card layouts** optimized for mobile consumption

### Key Responsive Design Achievements

- **Seamless mobile experience** with horizontal card layouts
- **Grid transformation** from 4 columns (desktop) to 1 column (mobile)
- **Adaptive image sizing** with proportional width adjustments
- **Container responsive behavior** with mobile-specific spacing
- **Custom media queries** providing precise control over breakpoints

The hybrid data approach (mock + real API) combined with sophisticated responsive design ensures the application can demonstrate full functionality across all device types while remaining cost-effective for development and demonstration purposes.

### Technical Highlights

- **Custom breakpoint strategy** at 768px for optimal mobile/desktop distinction
- **CSS Grid mastery** with responsive column configurations
- **Material-UI enhancement** with custom media query integration
- **Performance-conscious** responsive implementation without framework overhead
- **Accessibility-focused** touch-friendly mobile interactions
