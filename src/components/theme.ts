import { createTheme } from "@mui/material";
import "typeface-dm-sans";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#e69bf9",
    },
    secondary: {
      main: "#41313E",
    },
    success: {
      main: "#18e543",
    },
    background: {
      default: "#FFF1E6",
      paper: "#fffdf8",
    },
    info: {
      main: "#54b4f2",
    },
    warning: {
      main: "#e3e500",
    },
    error: {
      main: "#EF476F",
    },
  },
  typography: { fontFamily: ["DM Sans"].join(",") },
});
