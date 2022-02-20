import { ThemeProvider } from "@mui/system";
import React from "react";
import Sidebar from "./components/Sidebar";
import { theme } from "./components/theme";
import TopBar from "./components/TopBar";
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <TopBar />
        <Sidebar />
      </ThemeProvider>
    </div>
  );
}

export default App;
