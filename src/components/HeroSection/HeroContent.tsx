import React from 'react';
import { Box } from '@mui/material';
import type { HeroContentProps } from '@/types/heroSection.types';
import { heroSectionContentStyles } from '@/styles/heroSection.styles';

export const HeroContent: React.FC<HeroContentProps> = ({ children }) => {
    return (
        <Box sx={heroSectionContentStyles}>
            {children}
        </Box>
    );
};
