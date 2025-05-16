import React from "react";
import { TweetCardProps } from "../../types/types";
import { TweetCardColors } from "../../utils/TweetCardColors";
import { CardActions, Box, IconButton, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { comicFonts } from "../../utils/comicFonts";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { formatTime } from "../../utils/formatDate";

export const Actions: React.FC<TweetCardProps> = ({tweet}) =>{
    const colors = TweetCardColors()
    return (
    <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors.yellow,
          padding: "12px 16px",
          borderTop: `4px solid ${colors.black}`,
          position: "relative",
          zIndex: 2,
        }}
        disableSpacing
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            zIndex: 2,
          }}
        >
          <IconButton
            aria-label="comments"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?in_reply_to=${tweet.tweet_id}`,
                "_blank"
              )
            }
            sx={{
              backgroundColor: colors.blue,
              border: `2px solid ${colors.black}`,
              color: colors.offWhite,
              width: "40px",
              height: "40px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                backgroundColor: colors.blue,
                transform: "scale(1.1) rotate(-5deg)",
                boxShadow: `3px 3px 0px ${colors.black}`,
              },
            }}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: "18px" }} />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              fontFamily: comicFonts.caption,
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {tweet.reply_count ?? 0}
          </Typography>

          <IconButton
            aria-label="retweets"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/retweet?tweet_id=${tweet.tweet_id}`,
                "_blank"
              )
            }
            sx={{
              backgroundColor: colors.blue,
              border: `2px solid ${colors.black}`,
              color: colors.offWhite,
              width: "40px",
              height: "40px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                backgroundColor: colors.blue,
                transform: "scale(1.1) rotate(5deg)",
                boxShadow: `3px 3px 0px ${colors.black}`,
              },
            }}
          >
            <RepeatIcon sx={{ fontSize: "18px" }} />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              fontFamily: comicFonts.caption,
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {(tweet.retweet_count ?? 0) + (tweet.quote_count ?? 0)}
          </Typography>

          <IconButton
            aria-label="likes"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/like?tweet_id=${tweet.tweet_id}`,
                "_blank"
              )
            }
            sx={{
              backgroundColor: colors.red,
              border: `2px solid ${colors.black}`,
              color: colors.offWhite,
              width: "40px",
              height: "40px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                backgroundColor: colors.red,
                transform: "scale(1.1) rotate(-5deg)",
                boxShadow: `3px 3px 0px ${colors.black}`,
              },
            }}
          >
            <FavoriteIcon sx={{ fontSize: "18px" }} />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              fontFamily: comicFonts.caption,
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {tweet.like_count ?? 0}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontFamily: comicFonts.caption,
            fontWeight: "bold",
            fontSize: "12px",
            backgroundColor: colors.offWhite,
            color: colors.sec_text,
            border: `2px solid ${colors.black}`,
            borderRadius: "12px",
            padding: "4px 8px",
            boxShadow: `2px 2px 0px ${colors.black}`,
          }}
        >
          {tweet.created_at ? formatTime(tweet.created_at.toString()) : ""}
        </Typography>
      </CardActions>
    )

 } 