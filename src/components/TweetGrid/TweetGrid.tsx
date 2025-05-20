import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  CircularProgress,
  Card,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TweetGridProps } from "../../types/types";
import { GridColors } from "./colors";
import { GridTitle } from "./Title";
import { GridContainer } from "./Container";
import GridPagination from "./Pagination";
import { motion, AnimatePresence } from "framer-motion";
import Pow from "./Pow";
import {
  itemVariants,
  useScrollToTop,
  pageVariants,
} from "../../utils/helpers";
import { MobileFeed } from "../../utils/MobileFeed";

export const TweetGrid: React.FC<TweetGridProps> = ({
  tweets,
  loading = false,
}) => {
  const [page, setPage] = useState(1);

  const comicColors = GridColors();
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const tweetsPerPage = isMobile ? 10 : 13;
  const totalPages = Math.max(
    1,
    Math.ceil((tweets?.length ?? 0) / tweetsPerPage)
  );

  useScrollToTop(page);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setIsTransitioning(true);
    setDirection(newPage > page ? "forward" : "backward");
    setPage(newPage);
  };



  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  if (isMobile) {
    return <MobileFeed tweets={tweets} loading={loading} />;
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        padding: { sm: 2, md: 3 },
        boxSizing: "border-box",
        backgroundColor: comicColors.offWhite, // Slightly off-white comic page background
        border: `6px solid ${comicColors.black}`,
        borderRadius: { xs: "8px", sm: "12px", md: "16px" },
        boxShadow: {
          xs: `6px 6px 0px ${comicColors.black}`,
          sm: `8px 8px 0px ${comicColors.black}`,
          md: `12px 12px 0px ${comicColors.black}`,
        },
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: { xs: 1, sm: 2 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Title header for the grid */}
        <GridTitle />
        <div id="grid-top-anchor" />

        {/* Container for the masonry layout */}
        <AnimatePresence mode="wait">
          {isTransitioning || loading ? (
            // Show skeleton during transitions
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <GridContainer
                tweets={[]}
                loading={true}
                currentPage={page}
                itemVariants={itemVariants}
                onPageChange={handlePageChange}
                isMobile={isMobile}
              />
            </motion.div>
          ) : (
            // Show actual content when not transitioning
            <motion.div
              key={`content-${page}`}
              custom={direction}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              style={{ position: "relative", width: "100%" }}
            >
              <GridContainer
                tweets={tweets}
                loading={false}
                currentPage={page}
                onPageChange={handlePageChange}
                itemVariants={itemVariants}
                isMobile={isMobile}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comic-style Pagination Control */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: { xs: 2, sm: 3, md: 4 },
            padding: { xs: "5px", sm: "10px" },
            position: "relative",
          }}
        >
          <GridPagination
            page={page}
            totalPages={totalPages}
            loading={loading}
            onPageChange={handlePageChange}
          />
        </Box>

        {/* Comic-style "POW!" effect in corner */}
        <Pow />
      </Box>
    </Card>
  );
};
