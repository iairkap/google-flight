import type { SxProps, Theme } from "@mui/material";
import { COLORS, GOOGLE_FONTS, TYPOGRAPHY } from "@/constants/styles";

// FAQ Container Styles
export const faqContainerStyles: SxProps<Theme> = {
  py: 8,
};

export const faqContentStyles: SxProps<Theme> = {
  maxWidth: "100%",
  mx: "auto",
};

// FAQ Title Styles
export const faqTitleStyles: SxProps<Theme> = {
  fontFamily: GOOGLE_FONTS.primary,
  fontSize: TYPOGRAPHY.fontSizes.xl,
  fontWeight: TYPOGRAPHY.fontWeights.medium,
  color: COLORS.text.primary,
  textAlign: "left",
  mb: 0,
};

// FAQ Accordion Styles
export const faqAccordionStyles: SxProps<Theme> = {
  mb: 0,
  borderRadius: "0 !important",
  border: "none !important",
  borderBottom: "1px solid #dadce0 !important",
  boxShadow: "none !important",
  backgroundColor: "transparent !important",
  outline: "none !important",
  paddingBottom: "8px !important",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "0 !important",
    border: "none !important",
    borderBottom: "1px solid #dadce0 !important",
    paddingBottom: "8px !important",
  },
  "&:last-child": {
    borderBottom: "1px solid #dadce0 !important",
    paddingBottom: "8px !important",
  },
  "&.MuiAccordion-root": {
    borderBottom: "1px solid #dadce0 !important",
    paddingBottom: "8px !important",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "transparent !important",
    outline: "none !important",
    border: "none !important",
    borderBottom: "1px solid #dadce0 !important",
  },
  "&:focus": {
    backgroundColor: "transparent !important",
    outline: "none !important",
    border: "none !important",
    borderBottom: "1px solid #dadce0 !important",
  },
  "&:focus-within": {
    backgroundColor: "transparent !important",
    outline: "none !important",
    border: "none !important",
    borderBottom: "1px solid #dadce0 !important",
  },
  "&:focus-visible": {
    backgroundColor: "transparent !important",
    outline: "none !important",
    border: "none !important",
    borderBottom: "1px solid #dadce0 !important",
  },
};

// FAQ Accordion Summary Styles
export const faqAccordionSummaryStyles: SxProps<Theme> = {
  borderRadius: 0,
  minHeight: "auto",
  padding: "4px 0px",
  outline: "none !important",
  "&.Mui-expanded": {
    minHeight: "auto",
  },
  "& .MuiAccordionSummary-content": {
    margin: "0",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "transparent",
    outline: "none !important",
    border: "none !important",
  },
  "&:focus": {
    backgroundColor: "transparent",
    outline: "none !important",
    border: "none !important",
  },
  "&:focus-visible": {
    backgroundColor: "transparent",
    outline: "none !important",
    border: "none !important",
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
};

// FAQ Question Text Styles
export const faqQuestionStyles: SxProps<Theme> = {
  fontFamily: '"Google Sans", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: "16px",
  fontWeight: 500,
  letterSpacing: "0.1px",
  lineHeight: "20px",
  color: "#3c4043",
  margin: "12px 0",
};

// FAQ Accordion Details Styles
export const faqAccordionDetailsStyles: SxProps<Theme> = {
  backgroundColor: "transparent",
  padding: "4px 0",
};

// FAQ Answer Text Styles
export const faqAnswerStyles: SxProps<Theme> = {
  fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: "16px",
  fontWeight: 400,
  letterSpacing: "0.1px",
  lineHeight: "22px",
  color: "#5f6368",
  maxWidth: "700px",
  whiteSpace: "pre-line",
};

// FAQ Expand Icon Styles
export const faqExpandIconStyles: SxProps<Theme> = {
  color: "#5f6368",
};
