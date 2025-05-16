import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useAppTheme } from "../../utils/ThemeContext";
import { lightColors, darkColors } from "../../utils/navbarColors";
import ThemeToggleButton from "../ThemeToggle";

// Helper function to get social icons
const getSocialIcon = (text: string) => {
  switch (text) {
    case "Twitter":
      return <TwitterIcon />;
    case "Telegram":
      return <TelegramIcon />;
    case "GitBook":
      return <MenuBookIcon />;
    default:
      return null;
  }
};

// Helper function to get external icons
const getExternalIcon = (text: string) => {
  switch (text) {
    case "Dexscreener":
      return <Box component="img" src="/dexscreener.png" alt="Dexscreener" sx={{ width: 24, height: 24 }} />;
    case "Dextools":
      return <Box component="img" src="/dextools.svg" alt="Dextools" sx={{ width: 24, height: 24 }} />;
    case "Pumpfun":
      return <Box component="img" src="/pumpfun.png" alt="Pumpfun" sx={{ width: 24, height: 24 }} />;
    default:
      return null;
  }
};

// Helper function to get links
const getLinkUrl = (text: string) => {
  switch (text) {
    case "Twitter":
      return "https://twitter.com";
    case "Telegram":
      return "https://telegram.org";
    case "GitBook":
      return "https://gitbook.com";
    case "Dexscreener":
      return "https://dexscreener.com";
    case "Dextools":
      return "https://dextools.com";
    case "Pumpfun":
      return "https://pump.fun";
    default:
      return "#";
  }
};

const MobileMenu = () => {
  const [open, setOpen] = React.useState(false);
  const { mode } = useAppTheme();
  const colors = mode === "light" ? lightColors : darkColors;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Function to handle link clicks
  const handleLinkClick = (url: string) => {
    // Open link in new tab
    window.open(url, "_blank", "noopener,noreferrer");
    // Close the drawer
    setOpen(false);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        color: colors.secondary,
        border: `2px solid ${colors.outline}`,
        backgroundColor: colors.primary,
      }}
      role="presentation"
    >
      <List>
        {["Twitter", "Telegram", "GitBook"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleLinkClick(getLinkUrl(text))}>
              <ListItemIcon>{getSocialIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {["Dexscreener", "Dextools", "Pumpfun"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleLinkClick(getLinkUrl(text))}>
              <ListItemIcon>
                {getExternalIcon(text)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{
          position: "absolute",
          right: 16,
          color: colors.secondary,
          border: `2px solid ${colors.outline}`,
          backgroundColor: colors.primary,
          "&:hover": {
            backgroundColor: colors.primary + "dd",
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
        <Box sx={{ position: "absolute", bottom: 20, right: 20 }}>
          <ThemeToggleButton />
        </Box>
      </Drawer>
    </div>
  );
};

export default MobileMenu;