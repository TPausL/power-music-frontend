import { createTheme } from "@mui/material";
import "typeface-lato";

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
    youtube: {
      main: "#ff0000",
      light: "rgb(255, 51, 51)",
      dark: "rgb(178, 0, 0)",
    },
    spotify: {
      main: "#1DB954",
      light: "rgb(74, 199, 118)",
      dark: "rgb(20, 129, 58)",
    },
  },
  typography: { fontFamily: ["Lato"].join(",") },
});

declare module "@mui/material/styles" {
  interface Palette {
    spotify: Palette["primary"];
    youtube: Palette["primary"];
  }
  interface PaletteOptions {
    spotify: PaletteOptions["primary"];
    youtube: PaletteOptions["primary"];
  }
}
