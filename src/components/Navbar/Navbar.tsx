import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import ThemeToggleButton from "../ThemeToggle";
import { useAppTheme } from "../../utils/ThemeContext";
import { useScrollTrigger } from "@mui/material";
import { lightColors, darkColors } from "../../utils/navbarColors";
import { SocialIcons } from "./SocialIcons";
import { Logo } from "./Logo";
import { ExternalLinks } from "./ExternalLinks";
import { AnnouncementBubble } from "./AnnouncementBubble";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";
import MobileMenu from "./MobileMenu";
import PCMenuDrawer from "./PCMenu";

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
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

const MobileNavbar = () => {
  const { mode } = useAppTheme();
  const colors = mode === "light" ? lightColors : darkColors;

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: colors.primary,
        height: 60,
        borderBottom: `1px solid ${colors.outline}`,
        boxShadow: `0 4px 0 -2px ${colors.secondary}`,
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 60,
          padding: "0 16px",
        }}
      >
        {/* Logo image on the left */}
        <Box
          sx={{ width: "33%", display: "flex", justifyContent: "flex-start" }}
        >
          <Box
            component="img"
            src="/logo.jpg"
            alt="Hawkeye Logo"
            sx={{
              height: 40,
              width: 40,
              border: `2px solid ${colors.outline}`,
              borderRadius: "4px",
              padding: "2px",
              backgroundColor: colors.light,
              boxShadow: `2px 2px 0px ${colors.outline}`,
            }}
          />
        </Box>

        {/* Title in the center */}
        <Box sx={{ width: "34%", display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "'Luckiest Guy', cursive",
              fontWeight: "bold",
              letterSpacing: 1,
              fontSize: "1.5rem",
              color: colors.dark,
              textTransform: "uppercase",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            HAWKEYE
          </Typography>
        </Box>

        {/* Menu button on the right */}
        <Box sx={{ width: "33%", display: "flex", justifyContent: "flex-end" }}>
          <MobileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const PCNavbar = (props: Props) => {
  const { mode } = useAppTheme();
  const colors = mode === "light" ? lightColors : darkColors;

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
            padding: 1,
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
              <PCMenuDrawer />
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
                justifyContent: "flex-end",
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

const Navbar = (props: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return isMobile ? <MobileNavbar /> : <PCNavbar {...props} />;
};

export default Navbar;