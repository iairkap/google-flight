import React from 'react';
import { Typography, Box } from '@mui/material';
import type { RecommendedDestinationsEmptyStateProps } from '@/types/recommendedDestinations.types';
import { recommendedDestinationsNoResultsStyles } from '@/styles/recommendedDestinations.styles';

export const RecommendedDestinationsEmptyState: React.FC<RecommendedDestinationsEmptyStateProps> = ({
    message = "No hay destinos recomendados disponibles",
    userLocation
}) => {
    return (
        <Box sx={recommendedDestinationsNoResultsStyles}>
            <Typography variant="body1">
                {message}
                {userLocation && (
                    <Typography component="span" variant="body2" sx={{ display: 'block', mt: 1 }}>
                        Ubicación detectada: {userLocation.city || 'Ubicación actual'}
                    </Typography>
                )}
            </Typography>
        </Box>
    );
};
