import { useCallback, useContext } from "react";
import { useScrollTrigger } from "@mui/material";
import { Zoom, Box, Fab } from "@mui/material";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { TweetsContext } from "../../hooks/TweetsContext";

function ScrollToTopFab() {
  // Use `window` instead of `body` as `document` will be `undefined` when the
  // hooks first runs. By default, useScrollTrigger will attach itself to `window`.
  const trigger = useScrollTrigger({
    // Number of pixels needed to scroll to toggle `trigger` to `true`.
    threshold: 100,
  });

  // Get refreshTweets function from context or props
  const tweetsContext = useContext(TweetsContext);
  const handleClick = useCallback(() => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Refresh tweets
    (tweetsContext?.refreshTweets ?? (() => {}))();
  }, [tweetsContext]);

  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <Fab
          color="primary"
          size="medium"
          aria-label="scroll back to top and refresh tweets"
          onClick={handleClick}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <KeyboardArrowUp />
          </Box>
        </Fab>
      </Box>
    </Zoom>
  );
}

export default ScrollToTopFab;