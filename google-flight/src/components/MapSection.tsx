// src/components/MapSection.tsx
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import DestinationsMap from './DestinationsMap';
import { buttonStyles } from '@/styles/common';
import { COLORS } from '@/constants/styles';
import type { MapProps } from '@/types/components';

const MapSection: React.FC<MapProps> = ({
    height = "300px",
    showPrices = true,
    className
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            className={className}
            sx={{
                width: '100%',
                position: 'relative',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        ...buttonStyles.primary,
                        backgroundColor: 'white',
                        color: COLORS.primary,
                        px: 3,
                        py: 1,
                    }}
                >
                    Explore destinations
                </Button>
            </Box>

            {isHovered && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: COLORS.background.overlay,
                        zIndex: 500,
                        borderRadius: 2,
                        transition: 'opacity 0.3s ease',
                    }}
                />
            )}

            <DestinationsMap height={height} showPrices={showPrices} />
        </Box>
    );
};

export default MapSection;
