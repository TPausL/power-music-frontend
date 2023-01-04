import { ThemeProvider } from "@mui/system";
import React from "react";
import Router from "./components/Router";
import Sidebar from "./components/Sidebar";
import { theme } from "./components/theme";
import TopBar from "./components/TopBar";
import UserProvider from "./components/UserProvider";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpotify, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas, faSpotify,faYoutube,faChevronDown,faChevronUp)

function App() {
  console.log(process.env)
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
