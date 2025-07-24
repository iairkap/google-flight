import React from 'react';
import { Box } from '@mui/material';
import { useUserLocation } from '@/hooks/useLocation';
import RecommendedDestinationsHeader from '@/components/RecommendedDestinationsHeader';
import MapSection from '@/components/MapSection';
import RecommendedDestinations from '@/components/RecommendedDestinations';
import type { ExploreDestinationsSectionProps } from '@/types/exploreDestinations.types';
import { exploreDestinationsSectionStyles } from '@/styles/exploreDestinations.styles';

const ExploreDestinationsSection: React.FC<ExploreDestinationsSectionProps> = ({
    title,
    mapHeight = "300px",
    showPrices = false,
    className
}) => {
    const { userLocation, isLocationAvailable } = useUserLocation();

    if (!isLocationAvailable) {
        return null;
    }

    const sectionTitle = title || `Find cheap flights from ${userLocation!.city} to anywhere`;

    return (
        <Box sx={exploreDestinationsSectionStyles} className={className}>
            <RecommendedDestinationsHeader
                userLocation={userLocation!}
                title={sectionTitle}
            />

            <MapSection
                height={mapHeight}
                showPrices={showPrices}
            />

            <RecommendedDestinations />
        </Box>
    );
};

export default ExploreDestinationsSection;
