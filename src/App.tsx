import { ThemeProvider } from "@mui/system";
import React from "react";
import Router from "./components/Router";
import Sidebar from "./components/Sidebar";
import { theme } from "./components/theme";
import TopBar from "./components/TopBar";
import UserProvider from "./components/UserProvider";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
