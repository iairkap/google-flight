import type { SxProps, Theme } from "@mui/material";
import { SPACING } from "@/constants/styles";

// Explore Destinations Section Container Styles
export const exploreDestinationsSectionStyles: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: SPACING.sm,
  paddingTop: 0,
  paddingBottom: 0,
  margin: 0,
  paddingX: { xs: SPACING.md, sm: SPACING.lg },
};
