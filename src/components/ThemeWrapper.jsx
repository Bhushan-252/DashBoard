"use client";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../theme.js";
import ResponsiveDrawer from "./ResponsiveDrawer.jsx";
import StoreProvider from "./StoreProvider.jsx";
import { useState } from "react";
function ThemeWrapper({ children }) {
  const [theme, setTheme] = useState(lightTheme);
  return (
    <div>
  
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <ResponsiveDrawer
            setTheme={setTheme}
            themes={{ darkTheme, lightTheme }}
          >
            {children}
          </ResponsiveDrawer>
        </StoreProvider>
      </ThemeProvider>
    </div>
  );
}

export default ThemeWrapper;
