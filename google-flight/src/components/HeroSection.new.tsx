import React from 'react';
import { Box } from '@mui/material';
import type { HeroSectionProps } from '@/types/heroSection.types';
import { HeroBackground, HeroContent } from './HeroSection/index';
import { heroSectionWrapperStyles } from '@/styles/heroSection.styles';

const HeroSection: React.FC<HeroSectionProps> = ({
    children,
    title = 'Flights',
    backgroundImageUrl,
    className
}) => {
    return (
        <Box
            sx={heroSectionWrapperStyles}
            className={className}
        >
            <HeroBackground
                title={title}
                backgroundImageUrl={backgroundImageUrl}
            />
            <HeroContent>
                {children}
            </HeroContent>
        </Box>
    );
};

export default HeroSection;
