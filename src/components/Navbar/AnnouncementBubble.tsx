import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

import { useAppTheme } from "../../utils/ThemeContext";
import { lightColors, darkColors } from "../../utils/navbarColors";

export const AnnouncementBubble: React.FC = () => {
  const { mode } = useAppTheme();
  const colors = mode === "light" ? lightColors : darkColors;
  return (
    <Box
      sx={{
        display: "none", // Hidden by default, change to "block" when needed
        position: "relative",
        backgroundColor: colors.light,
        borderRadius: "20px",
        padding: "16px 24px",
        border: `3px solid ${colors.outline}`,
        boxShadow: `4px 4px 0px ${colors.outline}`,
        maxWidth: "600px",
        "&:before": {
          content: '""',
          position: "absolute",
          top: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "40px",
          height: "20px",
          backgroundColor: colors.light,
          border: `3px solid ${colors.outline}`,
          borderBottom: "none",
          borderRadius: "40px 40px 0 0",
          zIndex: -1,
        },
      }}
    >
      <Typography
        sx={{ fontFamily: "'Comic Neue', cursive", fontWeight: "bold" }}
      >
        Welcome to Hawkeye! Your comic-style navigation is ready!
      </Typography>
    </Box>
  );
};
