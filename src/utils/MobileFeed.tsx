import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";

import { GridTitle } from "../components/TweetGrid/Title";
import { motion, AnimatePresence } from "framer-motion";
import { TweetCard } from "../components/TweetCard/TweetCard";

interface MobileFeedProps {
  tweets: any[]; // Replace 'any' with your actual Tweet type if available
  loading: boolean;
}
export const MobileFeed: React.FC<MobileFeedProps> = ({ tweets: initialTweets, loading: initialLoading }) => {
  const [tweets, setTweets] = useState(initialTweets || []);
  const [loading, setLoading] = useState(initialLoading || false);
  const [hasMore, setHasMore] = useState(true);
  const [displayCount, setDisplayCount] = useState(20); // Initial number of tweets to show
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(null);

  // Handle new tweets from websocket
  useEffect(() => {
    if (initialTweets) {
      setTweets(initialTweets);
      // Reset to top when new tweets arrive
      setDisplayCount(20);
      window.scrollTo(0, 0);
    }
  }, [initialTweets]);

  useEffect(() => {
    setLoading(initialLoading);
  }, [initialLoading]);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading && hasMore) {
          // Load more tweets when scrolling to the bottom
          loadMoreTweets();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, hasMore, displayCount]);

  const loadMoreTweets = useCallback(() => {
    // Make sure we don't exceed the number of available tweets
    if (displayCount + 10 >= tweets.length) {
      setDisplayCount(tweets.length);
      setHasMore(false);
    } else {
      setDisplayCount(prev => prev + 10);
    }
  }, [displayCount, tweets.length]);

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i:any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      }
    }),
  };

  // Show only the number of tweets we want to display
  const visibleTweets = tweets.slice(0, displayCount);

  return (
    <Box
      sx={{
        width: "100%",
        padding: 1,
        position: "relative",
        
      }}
    >
      <GridTitle />
      <div id="grid-top-anchor" />
      
      <AnimatePresence>
        {visibleTweets.map((tweet, index) => (
          <motion.div
            key={tweet.id || index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            style={{ marginBottom: '16px' }}
          >
            {/* Replace with your actual Tweet component */}
            <TweetCard tweet={tweet} />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Loading indicator at the bottom */}
      <Box
        ref={loadingRef}
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          marginTop: 2,
        }}
      >
        {loading ? (
          <CircularProgress size={30} />
        ) : hasMore ? (
          <div style={{ height: '20px' }} />
        ) : (
          <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 2 }}>
            No more tweets to load
          </Box>
        )}
      </Box>
    </Box>
  );
};