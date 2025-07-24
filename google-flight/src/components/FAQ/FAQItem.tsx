import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { FAQItem } from '@/types/faq.types';
import {
    faqAccordionStyles,
    faqAccordionSummaryStyles,
    faqQuestionStyles,
    faqAccordionDetailsStyles,
    faqAnswerStyles,
    faqExpandIconStyles
} from '@/styles/faq.styles';

interface FAQItemComponentProps {
    item: FAQItem;
    isExpanded: boolean;
    onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export const FAQItemComponent: React.FC<FAQItemComponentProps> = ({
    item,
    isExpanded,
    onChange
}) => {
    return (
        <Accordion
            expanded={isExpanded}
            onChange={onChange}
            sx={faqAccordionStyles}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={faqExpandIconStyles} />}
                sx={faqAccordionSummaryStyles}
            >
                <Typography
                    variant="h6"
                    sx={faqQuestionStyles}
                >
                    {item.question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={faqAccordionDetailsStyles}>
                <Typography
                    variant="body1"
                    sx={faqAnswerStyles}
                >
                    {item.answer}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};
