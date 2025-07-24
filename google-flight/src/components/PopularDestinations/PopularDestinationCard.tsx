import React from 'react';
import { Box, Typography } from '@mui/material';
import type { PopularDestination } from '@/types/popularDestinations.types';
import {
    popularDestinationsCardStyles,
    popularDestinationsCardOverlayStyles,
    popularDestinationsCityNameStyles
} from '@/styles/popularDestinations.styles';

interface PopularDestinationCardProps {
    destination: PopularDestination;
    showPrice?: boolean;
}

export const PopularDestinationCard: React.FC<PopularDestinationCardProps> = ({
    destination,
    showPrice = false
}) => {
    const imageUrl = destination.imageUrl || destination.image || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop';

    return (
        <Box
            sx={{
                ...popularDestinationsCardStyles,
                backgroundImage: `url(${imageUrl})`,
            }}
        >
            <Box sx={popularDestinationsCardOverlayStyles}>
                <Typography sx={popularDestinationsCityNameStyles}>
                    {destination.city}
                </Typography>
                {showPrice && destination.price && (
                    <Typography variant="body2" sx={{ color: 'white', mt: 0.5 }}>
                        desde ${destination.price}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};
