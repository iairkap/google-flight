import type { FlightResult } from "@/store/flightStore";

export interface FlightResultsProps {
  className?: string;
}

export interface FlightCardProps {
  flight: FlightResult;
  onSelect?: (flight: FlightResult) => void;
}

export interface FlightInfoProps {
  flight: FlightResult;
}

export interface FlightPriceProps {
  price: number;
  onSelect?: () => void;
}
