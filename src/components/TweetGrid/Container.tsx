import { Box } from "@mui/system";
import { ITweet } from "../../types/types";
import { TweetGridSkeleton } from "./Skeleton";
import { TweetCard } from "../TweetCard/TweetCard";

interface GridContainerProps {
  tweets: ITweet[];
  loading: Boolean;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  itemVariants: any;
  isMobile: boolean;
}

export const GridContainer: React.FC<GridContainerProps> = ({
  tweets,
  loading,
  currentPage,
  onPageChange,
}) => {
  const tweetsPerPage = 13;
  const startIndex = (currentPage - 1) * tweetsPerPage;

  const currentTweets = tweets?.slice(startIndex, startIndex + tweetsPerPage);

  const skeletonArray = Array(tweetsPerPage).fill(0);

  return (
    <Box
      sx={{
        columnCount: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        },
        columnGap: 3,
        width: "100%",
        padding: {
          xs: `10px`,
        },
      }}
    >
      {loading
        ? // Render skeletons when loading
          skeletonArray.map((_, index) => (
            <Box
              key={`skeleton-${index}`}
              sx={{
                breakInside: "avoid",
                marginBottom: 3,
                display: "inline-block",
                width: "100%",
                transform: index % 2 === 0 ? "rotate(1deg)" : "rotate(-1deg)",
              }}
            >
              <TweetGridSkeleton />
            </Box>
          ))
        : // Render actual tweets when not loading
          currentTweets.map((tweet, index) => (
            <Box
              key={tweet.tweet_id}
              sx={{
                breakInside: "avoid",
                marginBottom: 3,
                display: "inline-block",
                width: "100%",
                transform:
                  index % 2 === 0 ? "rotate(0.5deg)" : "rotate(-0.5deg)",
              }}
            >
              <TweetCard tweet={tweet} />
            </Box>
          ))}
    </Box>
  );
};
