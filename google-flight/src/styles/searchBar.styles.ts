import type { SxProps, Theme } from "@mui/material";

// Search Bar Container Styles
export const searchBarContainerStyles: SxProps<Theme> = {
  position: "relative",
  borderRadius: 3,
  boxShadow:
    "0 1px 3px 0 rgba(60, 64, 67, .3), 0 4px 8px 3px rgba(60, 64, 67, .15)",
  padding: {
    xs: "6px 12px 40px", // Mobile: menos padding
    sm: "8px 16px 48px", // Tablet: padding estándar
    md: "8px 16px 48px", // Desktop: padding estándar
  },
  marginBottom: "0px",
  marginTop: "0px",
  width: { xs: "%", sm: "100%" }, // Full width para aprovechar el container
  maxWidth: { xs: "100%", sm: "690px", lg: "93%" }, // Max width 768px desde tablet
};
