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
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { LocalFireDepartment } from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
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
      return (
        <Box
          component="img"
          src="/dexscreener.png"
          alt="Dexscreener"
          sx={{ width: 24, height: 24 }}
        />
      );
    case "Dextools":
      return (
        <Box
          component="img"
          src="/dextools.svg"
          alt="Dextools"
          sx={{ width: 24, height: 24 }}
        />
      );
    case "Pumpfun":
      return (
        <Box
          component="img"
          src="/pumpfun.png"
          alt="Pumpfun"
          sx={{ width: 24, height: 24 }}
        />
      );
    default:
      return null;
  }
};

// Helper function to get feature icons
const getFeatureIcon = (text: string) => {
  switch (text) {
    case "Custom Feed":
      return <DashboardIcon />;
    case "Trending Tickers":
      return <LocalFireDepartment sx={{ color: "#1E88E5", fontSize: 24 }} />;
    case "Wallet":
      return <AccountBalanceWalletIcon />;
    case "Ai Analytics":
      return <BarChartIcon />;
    case "Settings":
      return <SettingsIcon />;
    case "About":
      return <InfoIcon />;
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
    case "About":
      return "https://gitbook.com/"; // Replace with actual URL
    default:
      return "#";
  }
};

const MobileMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
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

  // Function to handle coming soon features
  const handleComingSoonClick = () => {
    setShowNotification(true);
    setOpen(false);
  };

  // Function to close notification
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        color: colors.secondary,
        backgroundColor: colors.primary,
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      {/* Header */}
      <Box
        sx={{
          padding: 2,
          borderBottom: `1px solid ${colors.outline}`,
          backgroundColor: colors.primary,
        }}
      >
        <Box
          sx={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            color: colors.secondary,
          }}
        >
          Menu
        </Box>
      </Box>

      {/* Social Links Section */}
      <Box sx={{ padding: 1 }}>
        <Box
          sx={{
            fontSize: "0.85rem",
            fontWeight: "bold",
            color: colors.secondary,
            opacity: 0.7,
            padding: 1,
            paddingLeft: 2,
          }}
        >
          Social
        </Box>
        <List dense>
          {["Twitter", "Telegram", "GitBook"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => handleLinkClick(getLinkUrl(text))}
                sx={{
                  borderRadius: 1,
                  margin: "2px 8px",
                  "&:hover": {
                    backgroundColor: colors.outline + "30",
                  },
                }}
              >
                <ListItemIcon sx={{ color: colors.secondary }}>
                  {getSocialIcon(text)}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ backgroundColor: colors.outline }} />

      {/* External Tools Section */}
      <Box sx={{ padding: 1 }}>
        <Box
          sx={{
            fontSize: "0.85rem",
            fontWeight: "bold",
            color: colors.secondary,
            opacity: 0.7,
            padding: 1,
            paddingLeft: 2,
          }}
        >
          Tools
        </Box>
        <List dense>
          {["Dexscreener", "Dextools", "Pumpfun"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => handleLinkClick(getLinkUrl(text))}
                sx={{
                  borderRadius: 1,
                  margin: "2px 8px",
                  "&:hover": {
                    backgroundColor: colors.outline + "30",
                  },
                }}
              >
                <ListItemIcon sx={{ color: colors.secondary }}>
                  {getExternalIcon(text)}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ backgroundColor: colors.outline }} />

      {/* Features Section */}
      <Box sx={{ padding: 1 }}>
        <Box
          sx={{
            fontSize: "0.85rem",
            fontWeight: "bold",
            color: colors.secondary,
            opacity: 0.7,
            padding: 1,
            paddingLeft: 2,
          }}
        >
          Features
        </Box>
        <List dense>
          {["Custom Feed", "Trending Tickers", "Ai Analytics"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={handleComingSoonClick}
                sx={{
                  borderRadius: 1,
                  margin: "2px 8px",
                  "&:hover": {
                    backgroundColor: colors.outline + "30",
                  },
                }}
              >
                <ListItemIcon sx={{ color: colors.secondary }}>
                  {getFeatureIcon(text)}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ backgroundColor: colors.outline }} />

      {/* Additional Options Section */}
      <Box sx={{ padding: 1, flexGrow: 1 }}>
        <Box
          sx={{
            fontSize: "0.85rem",
            fontWeight: "bold",
            color: colors.secondary,
            opacity: 0.7,
            padding: 1,
            paddingLeft: 2,
          }}
        >
          More
        </Box>
        <List dense>
          {["Settings", "About"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={
                  text === "About"
                    ? () => handleLinkClick(getLinkUrl(text))
                    : handleComingSoonClick
                }
                sx={{
                  borderRadius: 1,
                  margin: "2px 8px",
                  "&:hover": {
                    backgroundColor: colors.outline + "30",
                  },
                }}
              >
                <ListItemIcon sx={{ color: colors.secondary }}>
                  {getFeatureIcon(text)}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "0.9rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Theme Toggle at Bottom */}
      <Box
        sx={{
          padding: 2,
          borderTop: `1px solid ${colors.outline}`,
          display: "flex",
          justifyContent: "center",
          backgroundColor: colors.primary,
        }}
      >
        <ThemeToggleButton />
      </Box>
    </Box>
  );

  return (
    <>
      <IconButton
        edge="start"
        color="primary"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{
          right: 16,
          backgroundColor: colors.light,
          border: `3px solid ${colors.outline}`,
          borderRadius: "12px",
          padding: "6px",
          boxShadow: `4px 4px 0px ${colors.outline}`,
          transition: "all 0.2s",
          "& svg": {
            color: colors.secondary,
            filter: `drop-shadow(1px 1px 0 ${colors.outline})`,
            transition: "all 0.2s",
          },
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      {/* Coming Soon Notification */}
      <Snackbar
        open={showNotification}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity="info"
          sx={{
            width: "100%",
            backgroundColor: "colors.yellow",
            color: colors.secondary,
            border: `1px solid ${colors.outline}`,
            "& .MuiAlert-icon": {
              color: colors.secondary,
            },
          }}
        >
          Coming soon! Visit our GitBook for more details.
        </Alert>
      </Snackbar>
    </>
  );
};

export default MobileMenu;