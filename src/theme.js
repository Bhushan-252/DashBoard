"use client";
import { createTheme } from "@mui/material/styles";

 export const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2", // Blue
      },
      secondary: {
        main: "#9c27b0", // Purple
      },
      background: {
        default: "#fafafa", // Light background
        paper: "#ffffff", // Paper background for cards
      },
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
    },
  });

 export const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9", // Light Blue
      },
      secondary: {
        main: "#f48fb1", // Pink
      },
      background: {
        default: "#121212", // Dark background
        paper: "#1d1d1d", // Dark paper background for cards
      },
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
    },
  });



