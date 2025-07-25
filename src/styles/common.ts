import type { SxProps, Theme } from "@mui/material";
import { COLORS, GOOGLE_FONTS, TYPOGRAPHY } from "@/constants/styles";

export const textFieldStyles: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    "& fieldset": {
      borderColor: COLORS.border.light,
    },
    "&:hover fieldset": {
      borderColor: COLORS.border.medium,
    },
    "&.Mui-focused fieldset": {
      borderColor: COLORS.border.dark,
    },
  },
  "& .MuiInputBase-input": {
    color: COLORS.text.light,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
};

export const buttonStyles = {
  primary: {
    fontFamily: GOOGLE_FONTS.secondary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
    textTransform: "none" as const,
    borderRadius: "24px",
  },
  secondary: {
    color: COLORS.text.light,
    textTransform: "none" as const,
    "&:hover": {
      backgroundColor: COLORS.background.hover,
      color: COLORS.text.light,
    },
  },
};

export const cardStyles = {
  default: {
    borderRadius: 2,
    overflow: "hidden",
    boxShadow: "none",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: 3,
      transition: "all 0.2s ease",
    },
  },
};
