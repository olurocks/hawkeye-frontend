import { useAppTheme } from "../../utils/ThemeContext";

const lightComicColors = {
  yellow: "#FFDC00",
  blue: "#1A5CCE", 
  lightBlue: "#8EB8E5",
  black: "#000000",
  offWhite: "#FFFDF5",
  red: "#ec6c6c",
};

const darkComicColors = {
  yellow: "#1E3E62",
  blue: "#1A5CCE", 
  lightBlue: "#8EB8E5",
  black: "#A8A8BD",
  offWhite: "#262639",
  red: "#ec6c6c",
};


export const GridColors = () => {
    const {mode} = useAppTheme()
    const colors = mode === "light"? lightComicColors : darkComicColors
    return colors
}