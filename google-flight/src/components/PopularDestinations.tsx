import React from 'react';
import { Box } from '@mui/material';
import type { PopularDestinationsProps } from '@/types/popularDestinations.types';
import { getPopularDestinations } from '@/utils/mockFlightData';
import { usePopularDestinationsScroll } from '@/hooks/usePopularDestinationsScroll';
import { PopularDestinationsTitle, ScrollableDestinationList } from './PopularDestinations/index';
import { popularDestinationsContainerStyles } from '@/styles/popularDestinations.styles';

const PopularDestinations: React.FC<PopularDestinationsProps> = ({
    destinations = getPopularDestinations(),
    title = 'Popular destinations from Buenos Aires',
    showPrices = false
}) => {
    const {
        scrollRef,
        showLeftArrow,
        showRightArrow,
        handleWheel,
        scrollLeft,
        scrollRight,
        handleScroll
    } = usePopularDestinationsScroll();

    return (
        <Box sx={popularDestinationsContainerStyles}>
            <PopularDestinationsTitle title={title} />
            <ScrollableDestinationList
                destinations={destinations}
                showPrices={showPrices}
                scrollRef={scrollRef}
                showLeftArrow={showLeftArrow}
                showRightArrow={showRightArrow}
                onWheel={handleWheel}
                onScroll={handleScroll}
                onScrollLeft={scrollLeft}
                onScrollRight={scrollRight}
            />
        </Box>
    );
};

export default PopularDestinations;
