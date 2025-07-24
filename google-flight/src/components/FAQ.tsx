import React from 'react';
import { Box, Container } from '@mui/material';
import type { FAQProps } from '@/types/faq.types';
import { defaultFAQData } from '@/data/faq.data';
import { useFAQState } from '@/hooks/useFAQState';
import { FAQTitle } from './FAQ/FAQTitle';
import { FAQList } from './FAQ/FAQList';
import { faqContainerStyles } from '@/styles/faq.styles';

const FAQ: React.FC<FAQProps> = ({
    items = defaultFAQData,
    title = 'Frequently asked questions',
    maxWidth = 'lg'
}) => {
    const { expanded, handleChange } = useFAQState();

    return (
        <Box sx={faqContainerStyles}>
            <Container maxWidth={maxWidth}>
                <FAQTitle title={title} />
                <FAQList
                    items={items}
                    expanded={expanded}
                    onItemChange={handleChange}
                />
            </Container>
        </Box>
    );
};

export default FAQ;
