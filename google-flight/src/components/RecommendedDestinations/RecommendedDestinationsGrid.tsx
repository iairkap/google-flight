import React from 'react';
import { Box } from '@mui/material';
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
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                width: '100%',
                '@media (max-width: 768px)': {
                    gridTemplateColumns: '1fr'
                }
            }}
        >
            {flights.map((flight, index) => (
                <RecommendedFlightCard
                    key={index}
                    flight={flight}
                    onClick={() => onFlightClick?.(flight)}
                />
            ))}
        </Box>
    );
};
