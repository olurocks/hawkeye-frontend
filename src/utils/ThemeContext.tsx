import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { PaletteMode } from "@mui/material";

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleTheme: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);

const getInitialMode = (): PaletteMode => {
  const savedMode = localStorage.getItem("themeMode");
  if (savedMode === "light" || savedMode === "dark") {
    return savedMode;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? { background: { default: "#000000" } }
            : { background: { default: "#262639" } }),
        },
        typography: {
          fontFamily: "Comic Sans MS, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
