import type { SxProps, Theme } from "@mui/material";
import { COLORS, GOOGLE_FONTS, TYPOGRAPHY } from "@/constants/styles";

// Popular Destinations Container Styles
export const popularDestinationsContainerStyles: SxProps<Theme> = {
  width: "100%",
  py: 6,
  px: { xs: 2, sm: 3, md: 4 },
};

// Popular Destinations Title Styles
export const popularDestinationsTitleStyles: SxProps<Theme> = {
  fontFamily: GOOGLE_FONTS.primary,
  fontSize: TYPOGRAPHY.fontSizes.xl,
  fontWeight: TYPOGRAPHY.fontWeights.medium,
  color: COLORS.text.primary,
  textAlign: "left",
  mb: 4,
  px: 2,
};

// Popular Destinations Scroll Container Styles
export const popularDestinationsScrollContainerStyles: SxProps<Theme> = {
  position: "relative",
  width: "100%",
};

// Popular Destinations Scroll Area Styles
export const popularDestinationsScrollAreaStyles: SxProps<Theme> = {
  display: "flex",
  gap: 2,
  overflowX: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  pb: 1,
};

// Popular Destinations Card Styles
export const popularDestinationsCardStyles: SxProps<Theme> = {
  minWidth: "200px",
  height: "140px",
  borderRadius: 2,
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
};

// Popular Destinations Card Overlay Styles
export const popularDestinationsCardOverlayStyles: SxProps<Theme> = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
  color: "white",
  p: 2,
};

// Popular Destinations City Name Styles
export const popularDestinationsCityNameStyles: SxProps<Theme> = {
  fontFamily: GOOGLE_FONTS.primary,
  fontSize: TYPOGRAPHY.fontSizes.lg,
  fontWeight: TYPOGRAPHY.fontWeights.medium,
  color: "white",
};

// Popular Destinations Arrow Styles
export const popularDestinationsArrowStyles: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "white",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  width: 40,
  height: 40,
  zIndex: 2,
  "&:hover": {
    backgroundColor: COLORS.background.hover,
  },
};

export const popularDestinationsLeftArrowStyles: SxProps<Theme> = {
  ...popularDestinationsArrowStyles,
  left: 8,
};

export const popularDestinationsRightArrowStyles: SxProps<Theme> = {
  ...popularDestinationsArrowStyles,
  right: 8,
};
