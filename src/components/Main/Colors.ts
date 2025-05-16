import { useAppTheme } from "../../utils/ThemeContext";
const darkColors = {
  primary: "#1E3E62", // Bright yellow
  secondary: "#A8A8BD", // Comic blue
  accent: "#FFFDF7", // Comic red accent
  dark: "#111111", // Almost black
  background: "#0C1821", // Off-white
  footer_text_color: "#000000", // Black for footer_text_colors
};

const lightColors = {
  primary: "#DFC98A", // Bright yellow
  secondary: "#1E88E5", // Comic blue
  accent: "#FF3D00", // Comic red accent
  dark: "#111111", // Almost black
  background: "#FFFDF7", // Off-white
  footer_text_color: "#000000", // Black for outlines
};

export const AppColors = () => {
    const {mode} = useAppTheme()
    const colors = mode === "light" ? lightColors : darkColors;
    return colors
}