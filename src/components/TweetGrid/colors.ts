import { useAppTheme } from "../../utils/ThemeContext";

// Light mode comic colors
const lightComicColors = {
  yellow: "#FFDC00",    // Real: bright yellow
  blue: "#1A5CCE",      // Real: strong blue
  lightBlue: "#8EB8E5", // Real: light sky blue
  black: "#000000",     // Real: pure black
  offWhite: "#FFFDF5",  // Real: warm off-white
  red: "#ec6c6c",       // Real: soft red
};

// Dark mode comic colors
const darkComicColors = {
  yellow: "#1E3E62",    // Real: deep navy blue (used as 'yellow' in dark mode)
  blue: "#1A5CCE",      // Real: strong blue
  lightBlue: "#8EB8E5", // Real: light sky blue
  black: "#A8A8BD",     // Real: muted grayish black
  offWhite: "#262639",  // Real: dark indigo
  red: "#ec6c6c",       // Real: soft red
};


export const GridColors = () => {
    const {mode} = useAppTheme()
    const colors = mode === "light"? lightComicColors : darkComicColors
    return colors
}