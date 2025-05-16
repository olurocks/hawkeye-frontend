import { CardHeader } from "@mui/material"
import { comicFonts } from "../../utils/comicFonts"
import { TweetCardColors } from "../../utils/TweetCardColors"
import { Avatar, Typography } from "@mui/material"
import { ITweet, TweetCardProps } from "../../types/types"
import { formatDate } from "../../utils/formatDate"



export const TweetCardHeader: React.FC<TweetCardProps> = ({tweet}) => {
    const colors = TweetCardColors()
    return (
              <CardHeader
        titleTypographyProps={{
          fontFamily: comicFonts.title,
          fontWeight: "bold",
          fontSize: "20px",
          letterSpacing: "1px",
        }}
        sx={{
          backgroundColor: colors.yellow,
          padding: "16px",
          position: "relative",
          borderBottom: `4px solid ${colors.black}`,
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: "-8px",
            right: "15%",
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "8px 12px 0 12px",
            borderColor: `${colors.black} transparent transparent transparent`,
            transform: "rotate(0deg)",
            zIndex: 2,
          },
        }}
        avatar={
          <a
            href={`https://twitter.com/${tweet.username}/status/${tweet.tweet_id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", zIndex: 2 }}
          >
            <Avatar
              sx={{
                bgcolor: colors.blue,
                border: `3px solid ${colors.black}`,
                width: 50,
                height: 50,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.15) rotate(-5deg)",
                },
                position: "relative",
                zIndex: 2,
              }}
              aria-label="profile"
            >
              {tweet.profile_image_url && (
                <img
                  src={tweet.profile_image_url}
                  alt="P"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </Avatar>
          </a>
        }
        title={
          <a
            href={`https://twitter.com/${tweet.username}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", zIndex: 2 }}
          >
            <Typography
              sx={{
                fontFamily: comicFonts.title,
                fontWeight: "bold",
                fontSize: "25px",
                color: colors.subtle_accent,
                // textShadow: `2px 2px 0px ${colors.offWhite}`,
                transition: "transform 0.2s ease",
                display: "inline-block",
                "&:hover": {
                  transform: "scale(1.05) skewX(-5deg)",
                },
                zIndex: 2,
                position: "relative",
              }}
            >
              {tweet.username}
            </Typography>
          </a>
        }
        subheader={
          <Typography
            sx={{
              fontFamily: comicFonts.caption,
              color: colors.sec_text,
              fontWeight: "bold",
              fontSize: "12px",
              zIndex: 2,
              position: "relative",
            }}
          >
            {tweet.created_at ? formatDate(tweet.created_at.toString()) : ""}
          </Typography>
        }
      />
    )
}