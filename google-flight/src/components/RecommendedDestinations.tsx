// src/components/RecommendedDestinations.tsx
import { Box } from '@mui/material';
import { useRecommendedDestinationsData } from '@/hooks/useRecommendedDestinationsData';
import { RecommendedDestinationsEmptyState, RecommendedDestinationsGrid } from './RecommendedDestinations/index';
import { recommendedDestinationsContainerStyles } from '@/styles/recommendedDestinations.styles';
import type { RecommendedDestinationsProps } from '@/types/recommendedDestinations.types';
import type { RecommendedFlight } from '@/hooks/useRecommendedFlights';

const RecommendedDestinations: React.FC<RecommendedDestinationsProps> = ({
    className
}) => {
    const { userLocation, isLocationAvailable, recommendedFlights } = useRecommendedDestinationsData();

    const handleFlightClick = (flight: RecommendedFlight) => {
        console.log("🎯 Flight card clicked:", flight);
    };

    if (!isLocationAvailable || recommendedFlights.length === 0) {
        return (
            <RecommendedDestinationsEmptyState
                message="No flight recommendations available at the moment."
                userLocation={userLocation}
            />
        );
    }

    return (
        <Box sx={recommendedDestinationsContainerStyles} className={className}>
            <RecommendedDestinationsGrid
                flights={recommendedFlights}
                onFlightClick={handleFlightClick}
            />
        </Box>
    );
}; export default RecommendedDestinations;
