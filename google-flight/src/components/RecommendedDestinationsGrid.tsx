// src/components/RecommendedDestinationsGrid.tsx
import { Box } from '@mui/material';
import RecommendedFlightCard from '@/components/RecommendedFlightCard';
import type { RecommendedFlight } from '@/hooks/useRecommendedFlights';
import type { BaseComponentProps } from '@/types/components';

interface RecommendedDestinationsGridProps extends BaseComponentProps {
    flights: RecommendedFlight[];
    onFlightClick: (flight: RecommendedFlight) => void;
}

const RecommendedDestinationsGrid: React.FC<RecommendedDestinationsGridProps> = ({
    flights,
    onFlightClick,
    className
}) => {
    return (
        <Box
            className={className}
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)'
                },
                gap: '16px 32px'
            }}
        >
            {flights.map((flight) => (
                <RecommendedFlightCard
                    key={flight.id}
                    flight={flight}
                    onClick={onFlightClick}
                />
            ))}
        </Box>
    );
}; export default RecommendedDestinationsGrid;
