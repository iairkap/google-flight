import React from 'react';
import { Box } from '@mui/material';
import type { FAQProps } from '@/types/faq.types';
import { defaultFAQData } from '@/data/faq.data';
import { useFAQState } from '@/hooks/useFAQState';
import { FAQTitle } from './FAQ/FAQTitle';
import { FAQList } from './FAQ/FAQList';
import { faqContainerStyles } from '@/styles/faq.styles';

const FAQ: React.FC<FAQProps> = ({
    items = defaultFAQData,
    title = 'Frequently asked questions'
}) => {
    const { expanded, handleChange } = useFAQState();

    return (
        <Box sx={faqContainerStyles}>
            <Box sx={{
                maxWidth: { xs: '100%', sm: '768px', lg: '1024px' },
                mx: 'auto',
                px: { xs: 2, sm: 3, md: 4 }
            }}>
                <FAQTitle title={title} />
                <FAQList
                    items={items}
                    expanded={expanded}
                    onItemChange={handleChange}
                />
            </Box>
        </Box>
    );
};

export default FAQ;
