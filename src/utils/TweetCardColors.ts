import { useAppTheme } from "./ThemeContext";

const darkComicColors = {
  yellow: "#1E3E62",
  blue: "#3468D7",
  lightBlue: "#6B8CB2",
  black: "#2F4858",
  offWhite: "#262639",
  red: "#ec6c6c",
  sec_text: "A8A8BD",
  subtle_accent: "#0077B6",
};

const lightComicColors = {
  yellow: "#f7ed7e",
  blue: "#1A5CCE",
  lightBlue: "#8EB8E5",
  black: "#000000",
  offWhite: "#fff2d7",
  red: "#ec6c6c",
  sec_text: "#000000",
  subtle_accent: "#0077B6",
};

export const TweetCardColors = () => {
    const {mode} = useAppTheme()
    const colors = mode === "light" ? lightComicColors : darkComicColors;
    return colors
}