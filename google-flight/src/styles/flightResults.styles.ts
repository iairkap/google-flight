import type { SxProps, Theme } from "@mui/material";
import { COLORS, GOOGLE_FONTS, TYPOGRAPHY } from "@/constants/styles";

// Flight Results Container Styles
export const flightResultsContainerStyles: SxProps<Theme> = {
  mt: 4,
  px: { xs: 2, sm: 3, md: 4 },
};

// Flight Results Title Styles
export const flightResultsTitleStyles: SxProps<Theme> = {
  mb: 3,
  fontWeight: TYPOGRAPHY.fontWeights.semibold,
  fontFamily: GOOGLE_FONTS.primary,
  color: COLORS.text.primary,
};

// Flight Results Loading Styles
export const flightResultsLoadingStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  flexDirection: "column",
  gap: 2,
};

// Flight Card Styles
export const flightCardStyles: SxProps<Theme> = {
  mb: 2,
  borderRadius: 2,
  "&:hover": {
    boxShadow: 3,
    transform: "translateY(-2px)",
    transition: "all 0.2s ease",
  },
};

// Flight Card Content Styles
export const flightCardContentStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  p: 3,
  "&:last-child": {
    pb: 3,
  },
};

// Flight Info Section Styles
export const flightInfoSectionStyles: SxProps<Theme> = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 1,
};

// Flight Airline Styles
export const flightAirlineStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 1,
};

// Flight Route Styles
export const flightRouteStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 1,
  flexWrap: "wrap",
  gap: 1,
};

// Flight Details Styles
export const flightDetailsStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  flexWrap: "wrap",
};

// Flight Price Section Styles
export const flightPriceSectionStyles: SxProps<Theme> = {
  textAlign: "right",
  minWidth: 120,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 1,
};

// Flight Price Display Styles
export const flightPriceDisplayStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
};

// Flight Price Text Styles
export const flightPriceTextStyles: SxProps<Theme> = {
  fontWeight: TYPOGRAPHY.fontWeights.bold,
  color: COLORS.primary,
  fontFamily: GOOGLE_FONTS.primary,
};

// Flight Select Button Styles
export const flightSelectButtonStyles: SxProps<Theme> = {
  borderRadius: "20px",
  textTransform: "none",
  fontWeight: TYPOGRAPHY.fontWeights.semibold,
  backgroundColor: COLORS.primary,
  "&:hover": {
    backgroundColor: COLORS.primary,
    opacity: 0.9,
  },
};
