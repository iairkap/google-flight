import React from 'react';
import { Box } from '@mui/material';
import type { FAQItem } from '@/types/faq.types';
import { FAQItemComponent } from './FAQItem';
import { faqContentStyles } from '@/styles/faq.styles';

interface FAQListProps {
    items: FAQItem[];
    expanded: Record<string, boolean>;
    onItemChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export const FAQList: React.FC<FAQListProps> = ({
    items,
    expanded,
    onItemChange
}) => {
    return (
        <Box sx={faqContentStyles}>
            {items.map((item) => (
                <FAQItemComponent
                    key={item.id}
                    item={item}
                    isExpanded={expanded[item.id] || false}
                    onChange={onItemChange(item.id)}
                />
            ))}
        </Box>
    );
};
