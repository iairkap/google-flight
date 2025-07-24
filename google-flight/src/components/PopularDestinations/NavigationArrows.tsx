import React from 'react';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
    popularDestinationsLeftArrowStyles,
    popularDestinationsRightArrowStyles
} from '@/styles/popularDestinations.styles';

interface NavigationArrowsProps {
    showLeftArrow: boolean;
    showRightArrow: boolean;
    onScrollLeft: () => void;
    onScrollRight: () => void;
}

export const NavigationArrows: React.FC<NavigationArrowsProps> = ({
    showLeftArrow,
    showRightArrow,
    onScrollLeft,
    onScrollRight
}) => {
    return (
        <>
            {showLeftArrow && (
                <IconButton
                    onClick={onScrollLeft}
                    sx={popularDestinationsLeftArrowStyles}
                >
                    <ChevronLeft />
                </IconButton>
            )}
            {showRightArrow && (
                <IconButton
                    onClick={onScrollRight}
                    sx={popularDestinationsRightArrowStyles}
                >
                    <ChevronRight />
                </IconButton>
            )}
        </>
    );
};
