import type { SxProps, Theme } from "@mui/material";
import { COLORS } from "@/constants/styles";

// Recommended Destinations Container Styles
export const recommendedDestinationsContainerStyles: SxProps<Theme> = {
  mt: 1,
  mb: 4,
  width: "calc(100% - 32px)",
  padding: "0 16px",
};

// No Results Message Styles
export const recommendedDestinationsNoResultsStyles: SxProps<Theme> = {
  mt: 4,
  mb: 4,
  textAlign: "center",
  color: COLORS.text.secondary,
  padding: 4,
};
