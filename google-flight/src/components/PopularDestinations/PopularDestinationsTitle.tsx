import React from 'react';
import { Typography } from '@mui/material';
import { popularDestinationsTitleStyles } from '@/styles/popularDestinations.styles';

interface PopularDestinationsTitleProps {
    title: string;
}

export const PopularDestinationsTitle: React.FC<PopularDestinationsTitleProps> = ({ title }) => {
    return (
        <Typography
            variant="h4"
            component="h2"
            sx={popularDestinationsTitleStyles}
        >
            {title}
        </Typography>
    );
};
