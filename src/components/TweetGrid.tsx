import React, { useState } from "react";
import { TweetCard } from "./TweetCard";
import { Box, Card, Pagination, Skeleton } from "@mui/material";
import { TweetGridProps } from "../types/types";
import { dummyTweets } from "./dummyTweets";

// Dark theme color palette
const colors = {
  background: "#121212",        // Dark background
  surface: "#1E1E1E",           // Slightly lighter surface
  cardBackground: "#2D2D2D",    // Card background
  primary: "#BB86FC",           // Purple primary
  secondary: "#03DAC6",         // Teal secondary
  accent: "#CF6679",            // Red accent
  textPrimary: "#E1E1E1",       // Light text
  textSecondary: "#B0B0B0"      // Secondary text
};

// Skeleton component for loading state with dark theme
const TweetCardSkeleton = () => {
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        width: "100%", 
        padding: 2,
        border: `1px solid ${colors.primary}30`,
        backgroundColor: colors.cardBackground,
        borderRadius: 2
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ 
            marginRight: 2,
            backgroundColor: `${colors.primary}40` 
          }}
        />
        <Box sx={{ width: "100%" }}>
          <Skeleton 
            variant="text" 
            width="60%" 
            height={24} 
            sx={{ backgroundColor: `${colors.primary}40` }}
          />
          <Skeleton 
            variant="text" 
            width="40%" 
            height={20} 
            sx={{ backgroundColor: `${colors.primary}30` }}
          />
        </Box>
        <Skeleton 
          variant="circular" 
          width={24} 
          height={24} 
          sx={{ backgroundColor: `${colors.primary}40` }}
        />
      </Box>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={194}
        sx={{ 
          marginBottom: 2,
          backgroundColor: `${colors.primary}20`,
          borderRadius: 1
        }}
      />
      <Skeleton 
        variant="text" 
        width="100%" 
        sx={{ backgroundColor: `${colors.primary}30` }}
      />
      <Skeleton 
        variant="text" 
        width="100%" 
        sx={{ backgroundColor: `${colors.primary}30` }}
      />
      <Skeleton 
        variant="text" 
        width="80%" 
        sx={{ backgroundColor: `${colors.primary}30` }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: 2 }}>
        <Skeleton
          variant="circular"
          width={24}
          height={24}
          sx={{ 
            marginRight: 2,
            backgroundColor: `${colors.primary}40` 
          }}
        />
        <Skeleton
          variant="circular"
          width={24}
          height={24}
          sx={{ 
            marginRight: 2,
            backgroundColor: `${colors.primary}40` 
          }}
        />
        <Skeleton 
          variant="circular" 
          width={24} 
          height={24} 
          sx={{ backgroundColor: `${colors.primary}40` }}
        />
      </Box>
    </Card>
  );
};

export const TweetGrid: React.FC<TweetGridProps> = ({
  tweets,
  isConnected,
  error,
  loading = false,
}) => {
  const [page, setPage] = useState(1);
  const tweetsPerPage = 13;
  const totalPages = Math.ceil(tweets?.length / tweetsPerPage);

  // Calculate the current page's tweets
  const startIndex = (page - 1) * tweetsPerPage;
  const currentTweets = tweets?.slice(
    startIndex,
    startIndex + tweetsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Create an array of skeleton placeholders
  const skeletonArray = Array(tweetsPerPage).fill(0);

  return (
    <Card
      variant="outlined"
      sx={{ 
        width: "100%", 
        padding: 2, 
        boxSizing: "border-box", 
        mt: -6,
        backgroundColor: colors.background,
        border: `1px solid ${colors.primary}40`,
        boxShadow: `0 4px 20px rgba(0, 0, 0, 0.5)`,
        borderRadius: 2,
        "&:hover": {
          boxShadow: `0 8px 24px rgba(0, 0, 0, 0.6)`,
          borderColor: `${colors.primary}60`
        },
        transition: 'all 0.3s ease'
      }}
    >
      <Box sx={{ width: "100%", padding: 2 }}>
        {/* Container for the masonry layout */}
        <Box
          sx={{
            columnCount: {
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
            },
            columnGap: 2,
            width: "100%",
          }}
        >
          {loading
            ? // Render skeletons when loading
              skeletonArray.map((_, index) => (
                <Box
                  key={`skeleton-${index}`}
                  sx={{
                    breakInside: "avoid",
                    marginBottom: 2,
                    display: "inline-block",
                    width: "100%",
                  }}
                >
                  <TweetCardSkeleton />
                </Box>
              ))
            : // Render actual tweets when not loading
              currentTweets?.map((tweet) => (
                <Box
                  key={tweet.tweet_id}
                  sx={{
                    breakInside: "avoid",
                    marginBottom: 2,
                    display: "inline-block",
                    width: "100%",
                  }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      padding: 2,
                      width: "100%",
                      boxSizing: "border-box",
                      border: `1px solid ${colors.primary}30`,
                      backgroundColor: colors.cardBackground,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                      borderRadius: 2,
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: `0 6px 16px rgba(0, 0, 0, 0.4)`,
                        borderColor: colors.secondary
                      },
                    }}
                  >
                    <TweetCard
                      tweet={tweet}
                     
                      // Pass dark theme colors to the TweetCard component
                      themeColors={colors}
                    />
                  </Card>
                </Box>
              ))}
        </Box>

        {/* Pagination Control with Dark Theme */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{
              '& .MuiPaginationItem-root': {
                color: colors.textPrimary,
              },
              '& .MuiPaginationItem-page.Mui-selected': {
                backgroundColor: colors.primary,
                color: '#000',
                '&:hover': {
                  backgroundColor: colors.primary,
                  opacity: 0.8
                },
              },
              '& .MuiPaginationItem-page:hover': {
                backgroundColor: `${colors.primary}30`,
              },
              '& .MuiPaginationItem-icon': {
                color: colors.textPrimary,
              },
            }}
            disabled={loading}
          />
        </Box>
      </Box>
    </Card>
  );
};