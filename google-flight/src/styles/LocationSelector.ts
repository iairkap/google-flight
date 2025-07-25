// src/styles/LocationSelector.ts
import type { SxProps, Theme } from "@mui/material/styles";
import { COLORS } from "@/constants/styles";

export const locationSelectorContainerStyles: SxProps<Theme> = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: { xs: "6px", sm: "6px", md: "8px", lg: "4px" },
  flex: { xs: "1 1 100%", sm: "1 1 100%", md: "1 1 50%", lg: "1 1 60%" }, // Mobile hasta 768px: full width, Tablet 768px+: 50%, Desktop: 60%
  width: "100%",
  maxWidth: { xs: "100%", sm: "100%", md: "50%", lg: "none" },
  "@media (min-width: 768px)": {
    flex: "1 1 50%",
  },
};

export const locationFieldStyles: SxProps<Theme> = {
  flex: 1,
  width: "100%",
  maxWidth: { xs: "100%", sm: "100%", md: "166px", lg: "500px" }, // Mobile hasta 768px: 100%, Tablet 768px+: ~172px, Desktop: sin límite
  minWidth: { xs: "100%", sm: "100%", md: "166px", lg: "500px" }, // Asegurar ancho mínimo en tablet
  "@media (min-width: 768px)": {
    maxWidth: "320px",
    minWidth: "166px",
  },
};

export const locationInputStyles: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    fontSize: { xs: "14px", sm: "16px" },
    fontWeight: 500,
    height: { xs: "48px", sm: "56px" },
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#f8f9fa",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: COLORS.primary,
      },
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: COLORS.primary,
        borderWidth: "2px",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: COLORS.border.light,
    },
    "& .MuiOutlinedInput-input": {
      cursor: "pointer",
      padding: { xs: "12px 14px", sm: "16px 14px" },
      "&::placeholder": {
        color: COLORS.text.light,
        opacity: 1,
      },
    },
  },
};

export const swapButtonStyles: SxProps<Theme> = {
  backgroundColor: "#fff",
  border: "1px solid",
  borderColor: COLORS.border.light,
  borderRadius: "50%",
  width: { xs: 36, sm: 40 },
  height: { xs: 36, sm: 40 },
  minWidth: { xs: "36px", sm: "40px" },
  minHeight: { xs: "36px", sm: "40px" },
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  margin: { xs: "0 -18px", sm: "0 -20px" },
  zIndex: 100,
  "&:hover": {
    backgroundColor: "#fff",
    borderColor: COLORS.border.light,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  "&:active": {
    backgroundColor: "#fff",
    borderColor: COLORS.border.light,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-4px",
    bottom: "-4px",
    left: "50%",
    width: { xs: "6px", sm: "8px" },
    backgroundColor: "#fff",
    transform: "translateX(-50%)",
    zIndex: -1,
  },
};

export const swapIconStyles: SxProps<Theme> = {
  color: COLORS.text.light,
  fontSize: 18,
};

export const locationPopupStyles: SxProps<Theme> = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  mt: 1,
  backgroundColor: "#fff",
  borderRadius: 2,
  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  border: `1px solid ${COLORS.border.light}`,
  zIndex: 2000,
  maxHeight: "400px",
  overflow: "hidden",
};

export const locationPopupHeaderStyles: SxProps<Theme> = {
  p: 2,
  borderBottom: `1px solid ${COLORS.border.light}`,
};

export const locationSearchInputStyles: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f8f9fa",
    fontSize: "16px",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${COLORS.primary}`,
    },
  },
};

export const locationSuggestionsListStyles: SxProps<Theme> = {
  maxHeight: "320px",
  overflow: "auto",
  p: 0,
};

export const locationSuggestionItemStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  p: 2,
  cursor: "pointer",
  borderBottom: `1px solid ${COLORS.border.light}`,
  transition: "background-color 0.15s ease",
  "&:hover": {
    backgroundColor: "#f8f9fa",
  },
  "&:last-child": {
    borderBottom: "none",
  },
};

export const locationIconStyles: SxProps<Theme> = {
  color: COLORS.text.light,
  fontSize: 20,
  flexShrink: 0,
};

export const suggestionTextContainerStyles: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
};

export const suggestionPrimaryTextStyles: SxProps<Theme> = {
  fontSize: "16px",
  fontWeight: 500,
  color: COLORS.text.primary,
  lineHeight: 1.2,
  mb: 0.5,
};

export const suggestionSecondaryTextStyles: SxProps<Theme> = {
  fontSize: "14px",
  color: COLORS.text.light,
  lineHeight: 1.2,
};

export const loadingContainerStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: 3,
};

export const noResultsStyles: SxProps<Theme> = {
  p: 3,
  textAlign: "center",
  color: COLORS.text.light,
  fontSize: "14px",
};
