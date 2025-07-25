import React from 'react';
import { Typography } from '@mui/material';
import { faqTitleStyles } from '@/styles/faq.styles';

interface FAQTitleProps {
    title: string;
}

export const FAQTitle: React.FC<FAQTitleProps> = ({ title }) => {
    return (
        <Typography
            variant="h4"
            component="h2"
            sx={faqTitleStyles}
        >
            {title}
        </Typography>
    );
};
