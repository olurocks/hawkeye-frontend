import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

import { useAppTheme } from "../../utils/ThemeContext";
import { lightColors, darkColors } from "../../utils/navbarColors";

export const Logo: React.FC = () => {
  const { mode } = useAppTheme();
  const colors = mode === "light" ? lightColors : darkColors;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: [0, -2, 2, -2, 0],
          transition: { duration: 0.3 },
        }}
      >
        <Box
          component="img"
          src="/logo.jpg"
          alt="Hawkeye Logo"
          sx={{
            height: 90,
            width: 100,
            display: { xs: "block", sm: "block" },
            border: `3px solid ${colors.outline}`,
            borderRadius: "4px",
            padding: "4px",
            backgroundColor: colors.light,
            boxShadow: `4px 4px 0px ${colors.outline}`,
            transform: "rotate(-2deg)",
          }}
        />
      </motion.div>

      {/* Comic-style title */}
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontFamily: "'Bangers', cursive",
          fontWeight: "bold",
          letterSpacing: 6,
          fontSize: { xs: "2rem", sm: "3.5rem" },
          color: colors.outline,
          textShadow: `
                  2px 2px 0 ${colors.secondary}, 
                  -2px -2px 0 ${colors.secondary},
                  2px -2px 0 ${colors.secondary},
                  -2px 2px 0 ${colors.secondary}
                `,
          filter: "drop-shadow(3px 3px 0 rgba(0,0,0,0.3))",
          WebkitTextStroke: `2px ${colors.outline}`,
          padding: "0 8px",
          transform: "rotate(1deg)",
          marginBottom: "18px",
          mt: 2.3,
        }}
      >
        {["H", "A", "W", "K", "E", "Y", "E"].map((letter, index) => (
          <motion.span
            key={index}
            initial={{ y: 0 }}
            whileHover={{
              y: [-5, 0, -5],
              scale: 1.2,
              color: index % 2 === 0 ? colors.secondary : colors.accent,
              transition: {
                y: { duration: 0.3, repeat: Infinity, repeatType: "reverse" },
                scale: { duration: 0.2 },
              },
            }}
            style={{ display: "inline-block", margin: "0 -2px" }}
          >
            {letter}
          </motion.span>
        ))}
      </Typography>
    </Box>
  );
};