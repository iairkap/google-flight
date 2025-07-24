export const GOOGLE_FONTS = {
  primary: '"Google Sans", Roboto, "Helvetica Neue", Arial, sans-serif',
  secondary: '"Google Sans", Roboto, Arial, sans-serif',
} as const;

export const COLORS = {
  primary: "#1976d2",
  secondary: "#5f6368",
  text: {
    primary: "#202124",
    secondary: "#5f6368",
    light: "#666",
  },
  border: {
    light: "#ddd",
    medium: "#999",
    dark: "#666",
  },
  background: {
    hover: "#e8f0fe",
    light: "#f5f5f5",
    overlay: "rgba(0, 0, 0, 0.4)",
  },
} as const;

export const TYPOGRAPHY = {
  fontSizes: {
    xs: "11px",
    sm: "12px",
    base: "14px",
    lg: "16px",
    xl: "20px",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: "20px",
    normal: "24px",
  },
} as const;

export const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
} as const;
