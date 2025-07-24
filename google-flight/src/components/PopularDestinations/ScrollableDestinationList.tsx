import React from 'react';
import { Box } from '@mui/material';
import type { PopularDestination } from '@/types/popularDestinations.types';
import { PopularDestinationCard } from './PopularDestinationCard';
import { NavigationArrows } from './NavigationArrows';
import {
    popularDestinationsScrollContainerStyles,
    popularDestinationsScrollAreaStyles
} from '@/styles/popularDestinations.styles';

interface ScrollableDestinationListProps {
    destinations: PopularDestination[];
    showPrices?: boolean;
    scrollRef: React.RefObject<HTMLDivElement | null>;
    showLeftArrow: boolean;
    showRightArrow: boolean;
    onWheel: (e: React.WheelEvent) => void;
    onScroll: () => void;
    onScrollLeft: () => void;
    onScrollRight: () => void;
}

export const ScrollableDestinationList: React.FC<ScrollableDestinationListProps> = ({
    destinations,
    showPrices = false,
    scrollRef,
    showLeftArrow,
    showRightArrow,
    onWheel,
    onScroll,
    onScrollLeft,
    onScrollRight
}) => {
    return (
        <Box sx={popularDestinationsScrollContainerStyles}>
            <NavigationArrows
                showLeftArrow={showLeftArrow}
                showRightArrow={showRightArrow}
                onScrollLeft={onScrollLeft}
                onScrollRight={onScrollRight}
            />
            <Box
                ref={scrollRef}
                onWheel={onWheel}
                onScroll={onScroll}
                sx={popularDestinationsScrollAreaStyles}
            >
                {destinations.map((destination) => (
                    <PopularDestinationCard
                        key={destination.id}
                        destination={destination}
                        showPrice={showPrices}
                    />
                ))}
            </Box>
        </Box>
    );
};
