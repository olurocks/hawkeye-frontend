import React from "react";
import { ComicIconButton } from "./ComicButton";
import { Box } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useAppTheme } from "../../utils/ThemeContext";
import { lightColors, darkColors } from "../../utils/navbarColors";

export const SocialIcons: React.FC = () => {
  const { mode } = useAppTheme();
  const colors = mode === "light" ? lightColors : darkColors;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <ComicIconButton
        icon={<TelegramIcon fontSize="large" />}
        label="telegram link"
        url="https://telegram.org"
        color={colors.secondary}
      />
      <ComicIconButton
        icon={<TwitterIcon fontSize="large" />}
        label="twitter link"
        url="https://twitter.com"
        color={colors.secondary}
      />
      <ComicIconButton
        icon={<MenuBookIcon fontSize="large" />}
        label="gitbook link"
        url="https://gitbook.com"
        color={colors.secondary}
      />
    </Box>
  );
};