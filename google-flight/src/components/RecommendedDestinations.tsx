// src/components/RecommendedDestinations.tsx
import { Box } from '@mui/material';
import { useRecommendedDestinationsData } from '@/hooks/useRecommendedDestinationsData';
import { RecommendedDestinationsEmptyState, RecommendedDestinationsGrid } from './RecommendedDestinations/index';
import { recommendedDestinationsContainerStyles } from '@/styles/recommendedDestinations.styles';
import type { RecommendedDestinationsProps } from '@/types/recommendedDestinations.types';

const RecommendedDestinations: React.FC<RecommendedDestinationsProps> = ({
    className
}) => {
    const { userLocation, isLocationAvailable, recommendedFlights } = useRecommendedDestinationsData();

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
            />
        </Box>
    );
}; export default RecommendedDestinations;
