import { useAppTheme } from "../../utils/ThemeContext";
const darkColors = {
  primary: "#1E3E62", // Deep blue
  secondary: "#A8A8BD", // Muted lavender
  accent: "#FFFDF7", // Soft cream
  dark: "#111111", // Almost black
  background: "#0C1821", // Very dark blue
  footer_text_color: "#A8A8BD", // Muted lavender for contrast
  card_background: "#1E3E62", // Deep blue for cards
  text_primary: "#FFFDF7", // Soft cream for main text
  text_secondary: "#A8A8BD", // Muted lavender for secondary text
};

const lightColors = {
  primary: "#DFC98A", // Warm gold
  secondary: "#1E88E5", // Bright blue
  accent: "#FF3D00", // Vivid red-orange
  dark: "#111111", // Almost black
  background: "#FFFDF7", // Soft cream
  footer_text_color: "#1E3E62", // Deep blue for footer text
  card_background: "#FFFDF7", // Soft cream for cards
  text_primary: "#111111", // Almost black for main text
  text_secondary: "#1E88E5", // Bright blue for secondary text
  // Black for outlines
};

export const AppColors = () => {
    const {mode} = useAppTheme()
    const colors = mode === "light" ? lightColors : darkColors;
    return colors
}