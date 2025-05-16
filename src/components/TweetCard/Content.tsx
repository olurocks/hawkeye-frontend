import React from "react";
import { TweetCardProps } from "../../types/types";
import { TweetCardColors } from "../../utils/TweetCardColors";
import { CardContent, Box,Typography } from "@mui/material";
import { formatTweetText } from "../../utils/formatTweetText";
import { comicFonts } from "../../utils/comicFonts";

export const Content:React.FC<TweetCardProps> = ({tweet}) =>{
    const colors = TweetCardColors()
    return(
        <CardContent
        sx={{
          backgroundColor: colors.offWhite,
          padding: "20px",
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: "-10px",
            left: "10%",
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "10px 15px 0 15px",
            borderColor: `${colors.offWhite} transparent transparent transparent`,
            zIndex: 3,
          },
        }}
      >
        <a
          href={`https://twitter.com/${tweet.username}/status/${tweet.tweet_id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box
            sx={{
              backgroundColor: colors.lightBlue,
              border: `3px solid ${colors.red}`,
              borderRadius: "12px",
              padding: "16px",
              position: "relative",
              transform: "rotate(-1deg)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "rotate(1deg) scale(1.02)",
              },
              "&:before": {
                content: '""',
                position: "absolute",
                top: "-15px",
                left: "20px",
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: "0 15px 15px 15px",
                borderColor: `transparent transparent ${colors.black} transparent`,
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: comicFonts.body,
                fontSize: "19px",
                color: colors.sec_text,
                border: `2px solid ${colors.black}`,
                lineHeight: "1.5",
                padding: "8px",
                zIndex: 2,
                wordWrap: "break-word",
                position: "relative",
                textAlign: "center",
              }}
            >
              {formatTweetText(tweet.text)}
            </Typography>
          </Box>
        </a>
      </CardContent>
    )
}