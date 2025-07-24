import React from 'react';
import { FlightCard } from './FlightCard';
import type { FlightResult } from '@/store/flightStore';

interface FlightResultsListProps {
  flights: FlightResult[];
  onFlightSelect?: (flight: FlightResult) => void;
}

export const FlightResultsList: React.FC<FlightResultsListProps> = ({
  flights,
  onFlightSelect
}) => {
  return (
    <>
      {flights.map((flight) => (
        <FlightCard
          key={flight.id}
          flight={flight}
          onSelect={onFlightSelect}
        />
      ))}
    </>
  );
};
