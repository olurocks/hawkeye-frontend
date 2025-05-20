import { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { TweetGrid } from "../TweetGrid/TweetGrid";
import { useSocketTweets } from "../../hooks/useSocketTweet";
import { useAppTheme } from "../../utils/ThemeContext";
import { AppColors } from "./Colors";
import ScrollToTopFab from "./ScrollButton";
import { generateGridIcons } from "../../utils/helpers";
import { TweetsProvider } from "../../hooks/TweetsContext";
import { NewTweetsNotification } from "./NewTweets";
// Generate evenly spaced icons in a grid system

const App = () => {
  const [randomIcons] = useState(() => generateGridIcons(50)); // Generate 50 grid-based icons
  const { tweets, isConnected, error, loading, newTweetsCount, showNewTweets } =
    useSocketTweets();
  const colors = AppColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <Box
        sx={{
          outline: "2px solid red", // ADD THIS
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          position: "relative",
          backgroundColor: colors.background,
        }}
      >
        <Box sx={{ padding: 10 }}>
          <Navbar />
        </Box>

        <Container sx={{ width: "100%" }}>
          <TweetGrid
            tweets={tweets}
            isConnected={isConnected}
            error={error}
            loading={loading}
          />
        </Container>
        <Box
          component="footer"
          sx={{
            backgroundColor: colors.primary,
            borderTop: `23px`,
            boxShadow: `0 -6px 0 -3px ${colors.secondary}`,
            padding: "16px 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TweetsProvider>
              <ScrollToTopFab />
            </TweetsProvider>

            <Box
              sx={{
                fontFamily: "'Bangers', cursive",
                fontSize: "1.2rem",
                color: colors.footer_text_color,
                letterSpacing: "2px",
                borderTop: "18px",
              }}
            >
              HAWKEYE © 2025
            </Box>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        outline: "2px solid red", // ADD THIS
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        // Comic paper background
        backgroundColor: colors.background,
      }}
    >
      <CssBaseline />

      {/* Grid-based randomly placed icons */}
      {randomIcons.map((icon) => (
        <Box
          key={icon.id}
          sx={{
            position: "absolute",
            top: icon.position.top,
            left: icon.position.left,
            width: `${icon.size}px`,
            height: `${icon.size}px`,
            opacity: icon.opacity,
            zIndex: 0,
            transform: `rotate(${icon.rotation}deg)`,
            display: { xs: "none", md: "block" },
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: `rotate(${icon.rotation + 15}deg) scale(1.1)`,
            },
          }}
        >
          <icon.component />
        </Box>
      ))}

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Container
        maxWidth="xl"
        sx={{ mb: 6, flexGrow: 1, position: "relative", zIndex: 1 }}
      >
        <TweetGrid
          tweets={tweets}
          isConnected={isConnected}
          error={error}
          loading={loading}
        />
      </Container>

      <NewTweetsNotification count={newTweetsCount} onClick={showNewTweets} />

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: colors.primary,
          borderTop: `23px`,
          boxShadow: `0 -6px 0 -3px ${colors.secondary}`,
          padding: "16px 0",
          position: "relative",
          zIndex: 1,
          // Halftone texture overlay
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
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "64px",
          }}
        >
          <Box
            sx={{
              fontFamily: "'Bangers', cursive",
              fontSize: "1.2rem",
              color: colors.footer_text_color,
              letterSpacing: "2px",
              borderTop: "18px",
            }}
          >
            HAWKEYE © 2025
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
