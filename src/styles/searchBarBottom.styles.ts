import type { SxProps, Theme } from "@mui/material";

// Search Bar Bottom Container Styles
export const searchBarBottomContainerStyles: SxProps<Theme> = {
  padding: 0,
};

// Search Bar Bottom Content Styles
export const searchBarBottomContentStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: { xs: "column", sm: "column", md: "row" }, // Columna hasta 768px, fila desde 768px+
  alignItems: { xs: "stretch", sm: "stretch", md: "center" },
  gap: { xs: 2, sm: 2, md: 1 },
  position: "relative",
  width: "100%",
  "@media (min-width: 768px)": {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
};
