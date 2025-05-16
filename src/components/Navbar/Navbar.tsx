import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ThemeToggleButton from "../ThemeToggle";
import { useAppTheme } from "../../utils/ThemeContext";
import { useScrollTrigger } from "@mui/material";
import { lightColors, darkColors } from "../../utils/navbarColors";
import { SocialIcons } from "./SocialIcons";
import { Logo } from "./Logo";
import { Dexscreener, Dextools, ExternalLinks, PumpFun } from "./ExternalLinks";
import { AnnouncementBubble } from "./AnnouncementBubble";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import MobileMenu from "./MobileMenu";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}

const Navbar = (props: Props) => {
  const { mode } = useAppTheme();
  const colors = mode === "light" ? lightColors : darkColors;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <ElevationScroll {...props}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: colors.primary,
            minHeight:110,
            paddingTop: 1,
            borderBottom: `3px solid ${colors.outline}`,
            boxShadow: `0 4px 0 -2px ${colors.secondary}`,
            zIndex: 1100,
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: 88,
              padding: "0 20px",
              position: "relative",
            }}
          >
            <Logo />
            <Box sx={{marginBottom: 5}}>
              <MobileMenu />
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    );
  }
return (
  <>
    <ElevationScroll {...props}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: colors.primary,
          borderBottom: `4px solid ${colors.outline}`,
          boxShadow: `0 6px 0 -3px ${colors.secondary}`,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          padding:1,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(${colors.dark}22 2px, transparent 2px)`,
            backgroundSize: "10px 10px",
            backgroundPosition: "0 0",
            opacity: 0.1,
            pointerEvents: "none",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: { xs: 64, sm: 96, md: 96 },
            padding: "0 16px",
            position: "relative",
          }}
        >
          {/* Left side group */}
          <Box sx={{ display: "flex", alignItems: "center", width: "33%" }}>
            <SocialIcons />
          </Box>

          {/* Center logo - absolutely positioned */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              width: "34%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Logo />
          </Box>

          {/* Right side group */}
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 2,
              width: "33%",
              justifyContent: "flex-end"
            }}
          >
            <ExternalLinks />
            <ThemeToggleButton />
          </Box>
        </Toolbar>
      </AppBar>
    </ElevationScroll>

    <Box
      sx={{
        mt: "176px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AnnouncementBubble />
    </Box>
  </>
);
};

export default Navbar;
