import React from "react";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { useAppTheme } from "../../utils/ThemeContext";
import { lightColors, darkColors } from "../../utils/navbarColors";
import { ComicIconButtonProps } from "../../types/types";
import { Box } from "@mui/material";
import { ComicImageProps } from "../../types/types";

export const ComicIconButton: React.FC<ComicIconButtonProps> = ({
  icon,
  label,
  url,
  color,
}) => {
  const { mode } = useAppTheme();
  const colors = mode === "light" ? lightColors : darkColors;
  return (
    <motion.div
      whileHover={{
        scale: 1.2,
        rotate: [-2, 2, -2],
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.9 }}
      style={{ margin: "0 8px" }}
    >
      <IconButton
        color="primary"
        aria-label={label}
        onClick={() => window.open(url, "_blank")}
        sx={{
          backgroundColor: colors.light,
          border: `3px solid ${colors.outline}`,
          borderRadius: "12px",
          padding: "8px",
          boxShadow: `4px 4px 0px ${colors.outline}`,
          transition: "all 0.2s",
          "& svg": {
            color: color,
            filter: `drop-shadow(1px 1px 0 ${colors.outline})`,
            transition: "all 0.2s",
          },
        }}
      >
        {icon}
      </IconButton>
    </motion.div>
  );
};

export const ComicImageButton: React.FC<ComicImageProps> = ({
  imageSrc,
  label,
  url,
}) => {
  const { mode } = useAppTheme();
  const colors = mode === "light" ? lightColors : darkColors;
  return (
    <motion.div
      whileHover={{
        scale: 1.2,
        rotate: [-3, 3, -3],
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.9 }}
      style={{ margin: "0 8px" }}
    >
      <IconButton
        aria-label={label}
        onClick={() => window.open(url, "_blank")}
        sx={{
          padding: 0,
          backgroundColor: "transparent",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 46,
            height: 46,
            border: `3px solid ${colors.outline}`,
            borderRadius: "8px",
            backgroundColor: colors.light,
            padding: "2px",
            boxShadow: `3px 3px 0px ${colors.outline}`,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={imageSrc}
            alt={label}
            style={{
              width: 35,
              height: 35,
              borderRadius: "4px",
              objectFit: "contain",
            }}
          />
        </Box>
      </IconButton>
    </motion.div>
  );
};
