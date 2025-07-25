import React from 'react';
import { Box, Typography } from '@mui/material';
import type { HeroBackgroundProps } from '@/types/heroSection.types';
import {
    heroSectionBackgroundStyles,
    heroSectionBackgroundImageStyles,
    heroSectionTitleStyles
} from '@/styles/heroSection.styles';

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
    title,
    backgroundImageUrl
}) => {
    return (
        <Box sx={heroSectionBackgroundStyles}>
            {backgroundImageUrl && (
                <Box
                    sx={{
                        ...heroSectionBackgroundImageStyles,
                        backgroundImage: `url(${backgroundImageUrl})`,
                    }}
                />
            )}
            <Typography
                variant="h1"
                component="h1"
                sx={heroSectionTitleStyles}
            >
                {title}
            </Typography>
        </Box>
    );
};
