import { createTheme } from "@mui/material";
import "typeface-dm-sans";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#41393E",
    },
    secondary: {
      main: "#3dffb7",
    },
    success: {
      main: "#06D6A0",
    },
    background: {
      default: "#fff6ef",
      paper: "#FFF1E6",
    },
    info: {
      main: "#1B9AAA",
    },
    warning: {
      main: "#FFC43D",
    },
    error: {
      main: "#EF476F",
    },
  },
  typography: { fontFamily: ["DM Sans"].join(",") },
});
