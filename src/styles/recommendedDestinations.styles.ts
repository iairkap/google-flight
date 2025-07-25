import type { SxProps, Theme } from "@mui/material";
import { COLORS } from "@/constants/styles";

// Recommended Destinations Container Styles
export const recommendedDestinationsContainerStyles: SxProps<Theme> = {
  mt: 1,
  mb: 4,
  width: "100%",
  maxWidth: { xs: "100%", sm: "768px", lg: "1024px" },
  mx: "auto",
};

// No Results Message Styles
export const recommendedDestinationsNoResultsStyles: SxProps<Theme> = {
  mt: 4,
  mb: 4,
  textAlign: "center",
  color: COLORS.text.secondary,
  padding: 4,
};
