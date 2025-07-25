import type { SxProps, Theme } from "@mui/material";
import { GOOGLE_FONTS, TYPOGRAPHY } from "@/constants/styles";

// Hero Section Wrapper Styles
export const heroSectionWrapperStyles: SxProps<Theme> = {
  position: "relative",
  width: "100%",
  minHeight: { xs: "280px", sm: "320px", md: "320px" },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

// Hero Section Background Styles
export const heroSectionBackgroundStyles: SxProps<Theme> = {
  position: "relative",
  width: "100%",
  height: { xs: "120px", sm: "14vw", md: "16.5vw" },
  minHeight: { xs: "120px", sm: "180px", md: "200px" },
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// Hero Section Background Image Styles
export const heroSectionBackgroundImageStyles: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: { xs: "600px", sm: "800px", md: "1248px" },
  height: "100%",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  zIndex: 1,
};

// Hero Section Title Styles
export const heroSectionTitleStyles: SxProps<Theme> = {
  position: "absolute",
  left: "50%",
  bottom: "-20px",
  transform: "translateX(-50%)",
  fontFamily: GOOGLE_FONTS.primary,
  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
  fontWeight: TYPOGRAPHY.fontWeights.medium,
  color: "#333",
  textAlign: "center",
  zIndex: 3,
};

// Hero Section Content Styles
export const heroSectionContentStyles: SxProps<Theme> = {
  position: "relative",
  zIndex: 2,
  width: "100%",
  maxWidth: { xs: "100%", sm: "768px", lg: "1200px" },
  px: { xs: 1, sm: 2, md: 4 },
  mt: { xs: 3, sm: 4, md: 6, lg: 8 },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: { xs: "200px", sm: "240px", md: "260px" },
};
