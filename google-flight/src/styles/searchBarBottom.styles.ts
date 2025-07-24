import type { SxProps, Theme } from "@mui/material";

// Search Bar Bottom Container Styles
export const searchBarBottomContainerStyles: SxProps<Theme> = {
  padding: 0,
};

// Search Bar Bottom Content Styles
export const searchBarBottomContentStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: "center",
  gap: 0,
  position: "relative",
};
