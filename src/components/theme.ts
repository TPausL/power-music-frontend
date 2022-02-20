import { createTheme } from "@mui/material";
import "typeface-dm-sans";

export const theme = createTheme({
  palette: {
    primary: { main: "#ffdc12" },
  },
  typography: { fontFamily: ["DM Sans"].join(",") },
});
