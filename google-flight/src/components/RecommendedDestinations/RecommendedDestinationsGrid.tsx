import React from 'react';
import RecommendedFlightCard from '../RecommendedFlightCard';
import type { RecommendedFlight } from '@/hooks/useRecommendedFlights';

export interface RecommendedDestinationsGridProps {
    flights: RecommendedFlight[];
    onFlightClick?: (flight: RecommendedFlight) => void;
}

export const RecommendedDestinationsGrid: React.FC<RecommendedDestinationsGridProps> = ({
    flights,
    onFlightClick
}) => {
    return (
        <div className="recommended-grid" style={{ display: "flex", width: "100%", gap: "16px" }}>
            {flights.map((flight, index) => (
                <RecommendedFlightCard
                    key={index}
                    flight={flight}
                    onClick={() => onFlightClick?.(flight)}
                />
            ))}
        </div>
    );
};
