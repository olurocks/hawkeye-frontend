import React from "react";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useAppTheme } from "../utils/ThemeContext";

const ThemeToggleButton: React.FC = () => {
  const { mode, toggleTheme } = useAppTheme();
  const theme = useTheme();
  
  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton 
        onClick={toggleTheme} 
        color="inherit"
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
          borderRadius: '50%',
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        {mode === "dark" ? (
          <Brightness7 sx={{ fontSize: 22 }} />
        ) : (
          <Brightness4 sx={{ fontSize: 22 }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
