import type { SxProps, Theme } from "@mui/material";
import { GOOGLE_FONTS, TYPOGRAPHY } from "@/constants/styles";

// Search Button Styles
export const searchButtonStyles: SxProps<Theme> = {
  position: "absolute",
  left: "50%",
  bottom: "-25px", // Mitad afuera del container
  transform: "translateX(-50%)",
  zIndex: 10,
  height: "40px",
  backgroundColor: "#1a73e8",
  borderRadius: "25px",
  fontFamily: GOOGLE_FONTS.primary,
  fontSize: ".875rem",
  letterSpacing: ".0107142857em",
  fontWeight: TYPOGRAPHY.fontWeights.medium,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#1565c0",
    boxShadow: "0 6px 16px rgba(25, 118, 210, 0.5)",
  },
  "&:disabled": {
    backgroundColor: "#ccc",
    color: "#666",
  },
};
