import * as React from "react";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Tweet, User, Media, TweetCardProps, IMedia } from "../types/types";
import { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import { Grid } from "@mui/material";

// Default dark theme colors if not provided via props
const defaultColors = {
  background: "#121212", // Dark background
  surface: "#1E1E1E", // Slightly lighter surface
  cardBackground: "#2D2D2D", // Card background
  primary: "#BB86FC", // Purple primary
  secondary: "#03DAC6", // Teal secondary
  accent: "#CF6679", // Red accent
  textPrimary: "#E1E1E1", // Light text
  textSecondary: "#B0B0B0", // Secondary text
  teal: "#FFF1D5",
};

const VideoPlayer: React.FC<{
  videoUrl: string;
  previewUrl?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  videoUrl,
  previewUrl,
  autoPlay = false,
  controls = false,
  loop = false,
  muted = true,
  className,
  style,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const isHLS = videoUrl.toLowerCase().includes(".m3u8");

  // Track autoplay prop changes
  useEffect(() => {
    // Handle autoplay state changes
    if (videoRef.current) {
      if (autoPlay) {
        videoRef.current
          .play()
          .catch((e) => console.log("Auto-play prevented:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [autoPlay]);

  useEffect(() => {
    // Setup HLS for m3u8 streams if the video element is available
    if (videoRef.current && isHLS) {
      // Check if HLS is supported
      if (Hls.isSupported()) {
        // Clean up any existing HLS instance
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        // Create new HLS instance
        hlsRef.current = new Hls({
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          startLevel: 0, // Start with lowest quality for faster startup
          abrEwmaDefaultEstimate: 1000000, // Default bandwidth estimate
          enableWorker: true, // Enable web workers for better performance
        });

        hlsRef.current.loadSource(videoUrl);
        hlsRef.current.attachMedia(videoRef.current);

        // Handle playback when manifest is parsed
        hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay) {
            videoRef.current
              ?.play()
              .catch((e) => console.log("Auto-play prevented:", e));
          }
        });

        // Error handling
        hlsRef.current.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS error:", data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                // Try to recover network error
                console.log("Network error, trying to recover");
                hlsRef.current?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log("Media error, trying to recover");
                hlsRef.current?.recoverMediaError();
                break;
              default:
                // Fatal error, cannot recover
                hlsRef.current?.destroy();
                break;
            }
          }
        });
      }
      // Fallback for Safari which has native HLS support
      else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = videoUrl;
        if (autoPlay) {
          videoRef.current
            .play()
            .catch((e) => console.log("Auto-play prevented:", e));
        }
      }
    } else if (videoRef.current && !isHLS) {
      // For non-HLS videos, handle directly
      videoRef.current.src = videoUrl;
      if (autoPlay) {
        videoRef.current
          .play()
          .catch((e) => console.log("Auto-play prevented:", e));
      }
    }

    // Cleanup function
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoUrl, isHLS]); // Don't include autoPlay in dependencies to prevent recreation of HLS on hover

  return (
    <video
      ref={videoRef}
      controls={controls}
      autoPlay={false} // Let our useEffect handle autoplay for both HLS and regular videos
      loop={loop}
      muted={muted}
      playsInline
      poster={previewUrl}
      preload="metadata"
      className={className}
      style={style}
    >
      {!isHLS && <source src={videoUrl} type="video/mp4" />}
      Your browser does not support video playback.
    </video>
  );
};

const MediaModal: React.FC<{
  open: boolean;
  onClose: () => void;
  media: IMedia | null;
}> = ({ open, onClose, media }) => {
  if (!media) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="media-viewer"
      aria-describedby="view full tweet media"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "85vw",
          maxHeight: "85vh",
          bgcolor: "background.paper",
          border: `4px solid ${defaultColors.cardBackground}`,
          borderRadius: "20px",
          p: 2,
          outline: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: defaultColors.background,
        }}
      >
        {media.type === "photo" && media.urls && media.urls.length > 0 ? (
          <img
            src={media.urls[0]}
            alt={media.alt_text || "Tweet media"}
            style={{
              maxWidth: "100%",
              maxHeight: "85vh",
              objectFit: "contain",
              border: `3px solid ${defaultColors.teal}`,
              borderRadius: "6px",
            }}
          />
        ) : (media.type === "video" || media.type === "animated_gif") &&
          media.urls &&
          media.urls.length > 0 ? (
          <VideoPlayer
            videoUrl={media.urls[0]}
            previewUrl={media.preview_image_url}
            controls={true}
            autoPlay={true} // Auto-play videos when modal opens
            loop={media.type === "animated_gif"}
            muted={false} // Enable sound in the modal
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              border: `3px solid ${defaultColors.surface}`,
              borderRadius: "6px",
            }}
          />
        ) : null}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: defaultColors.surface,
            border: `2px solid ${defaultColors.cardBackground}`,
            color: defaultColors.background,
            "&:hover": {
              backgroundColor: defaultColors.surface,
              transform: "scale(1.1)",
            },
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
};

export const TweetCard: React.FC<TweetCardProps> = ({
  tweet,
  themeColors = defaultColors, // Allow theme colors to be passed in
}) => {
  const colors = themeColors;
  const [selectedMedia, setSelectedMedia] = useState<IMedia | null>(null);
  const [playingMediaIndex, setPlayingMediaIndex] = useState<number | null>(
    null
  );

  const handleMediaClick = (media: IMedia) => {
    setSelectedMedia(media);
  };

  const handleCloseMedia = () => {
    setSelectedMedia(null);
  };

  const handleMediaHover = (index: number) => {
    setPlayingMediaIndex(index);
  };

  const handleMediaLeave = () => {
    setPlayingMediaIndex(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }); // Example: "Jan 16, 2024"
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }); // Example: "7:40 PM"
  };

  const formatTweetText = (text: string, entities?: Tweet["entities"]) => {
    if (!entities) return text;

    let formattedText = text;

    if (entities.urls) {
      entities.urls.forEach((urlEntity) => {
        formattedText = formattedText.replace(
          urlEntity.url,
          `<a href="${urlEntity.expanded_url}" target="_blank" rel="noopener noreferrer" style="color: ${colors.secondary}; text-decoration: none;">${urlEntity.display_url}</a>`
        );
      });
    }

    if (entities.hashtags) {
      entities.hashtags.forEach((hashtag) => {
        const hashtagText = `#${hashtag.tag}`;
        formattedText = formattedText.replace(
          new RegExp(hashtagText, "gi"),
          `<a href="https://twitter.com/hashtag/${hashtag.tag}" target="_blank" rel="noopener noreferrer" style="color: ${colors.primary}; text-decoration: none;">${hashtagText}</a>`
        );
      });
    }

    if (entities.mentions) {
      entities.mentions.forEach((mention) => {
        const mentionText = `@${mention.username}`;
        formattedText = formattedText.replace(
          new RegExp(mentionText, "gi"),
          `<a href="https://twitter.com/${mention.username}" target="_blank" rel="noopener noreferrer" style="color: ${colors.primary}; text-decoration: none;">${mentionText}</a>`
        );
      });
    }
    return formattedText;
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        backgroundColor: colors.cardBackground,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: colors.textPrimary,
        border: "none",
        borderRadius: 2,
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `0px 8px 24px rgba(0, 0, 0, 0.4)`,
        },
      }}
    >
      <CardHeader
        titleTypographyProps={{
          fontWeight: "bold",
          fontSize: "17px",
          letterSpacing: "0.5px",
          color: colors.textPrimary,
        }}
        sx={{
          backgroundColor: `${colors.primary}10`,
          borderBottom: `1px solid ${colors.primary}30`,
          paddingBottom: "10px",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: `${colors.primary}20`,
          },
        }}
        avatar={
          <a
            href={`https://twitter.com/${tweet?.username}/`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Avatar
              sx={{
                bgcolor: colors.primary,
                border: `2px solid ${colors.secondary}`,
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: `0 0 8px ${colors.primary}`,
                },
                overflow: "hidden",
              }}
              aria-label="profile"
            >
              {tweet?.profile_image_url && (
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
            href={`https://twitter.com/${tweet?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              sx={{
                fontFamily: " Arial, sans-serif",
                fontWeight: "bold",
                fontSize: "17px",
                letterSpacing: "1px",
                color: defaultColors.teal,
                transition: "color 0.2s ease",
                "&:hover": {
                  color: colors.primary,
                },
              }}
            >
              {tweet?.username}
            </Typography>
          </a>
        }
        subheader={
          <Typography sx={{ color: colors.textSecondary, fontSize: "0.85rem" }}>
            {tweet.created_at ? formatDate(tweet.created_at) : ""}
          </Typography>
        }
      />

{tweet.media && tweet.media.length > 0 && (
  <Box 
    sx={{ 
      padding: "8px", 
      position: "relative", 
      width: "100%",      // Ensure full width
      boxSizing: "border-box" // Important for proper sizing
    }}
  >
    <Grid
      container
      spacing={1}  // Reduced spacing
      sx={{
        display: "grid",  // Change to grid display for better control
        width: "100%",    // Ensure the grid takes full width
        gridTemplateColumns:
          tweet.media.length === 1
            ? "1fr"
            : tweet.media.length === 2
            ? "1fr 1fr"
            : tweet.media.length === 3
            ? "1fr 1fr"
            : "1fr 1fr",
        gridTemplateRows: tweet.media.length === 3 ? "auto auto" : "auto",
        gridTemplateAreas:
          tweet.media.length === 3
            ? "'item0 item1' 'item2 item2'"
            : undefined,
        gap: "4px",  // Reduced gap for better fitting
        margin: 0,   // Reset any margins
      }}
    >
      {tweet.media.map((item, index) => {
        // Generate a unique border color for each media item
        const borderColors = [
          //def not teal
          
          "#54C392",
          "#C96868",
          defaultColors.teal, 
        ];
        const borderColor = borderColors[index % borderColors.length];

        // Define grid area for 3-item layout
        const gridArea =
          (tweet.media?.length ?? 0) === 3 ? `item${index}` : undefined;

        return (
          <Box
            key={`media-${index}`}
            sx={{
              gridArea,
              position: "relative",
              border: `4px solid ${borderColor}`, // Thinner border
              borderRadius: "4px",  // Smaller radius
              overflow: "hidden",
              height: "100%", // Control height based on count
              width: "100%",        // Ensure each item takes full width in its grid cell
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                "& .media-overlay": {
                  opacity: 0.7,
                },
              },
            }}
            onClick={() => handleMediaClick(item)}
            onMouseEnter={() => handleMediaHover(index)}
            onMouseLeave={handleMediaLeave}
          >
                  {item.type === "photo" &&
                  item.urls &&
                  item.urls.length > 0 ? (
                    <>
                      <CardMedia
                        component="img"
                        height="100%"
                        src={item.urls[0]}
                        alt={item.alt_text || "Tweet photo"}
                        sx={{
                          filter: "contrast(1.1) saturate(1.2)",
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <Box
                        className="media-overlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='70' cy='10' r='1'/%3E%3Ccircle cx='90' cy='10' r='1'/%3E%3Ccircle cx='10' cy='30' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='50' cy='30' r='1'/%3E%3Ccircle cx='70' cy='30' r='1'/%3E%3Ccircle cx='90' cy='30' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='30' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='70' cy='50' r='1'/%3E%3Ccircle cx='90' cy='50' r='1'/%3E%3Ccircle cx='10' cy='70' r='1'/%3E%3Ccircle cx='30' cy='70' r='1'/%3E%3Ccircle cx='50' cy='70' r='1'/%3E%3Ccircle cx='70' cy='70' r='1'/%3E%3Ccircle cx='90' cy='70' r='1'/%3E%3Ccircle cx='10' cy='90' r='1'/%3E%3Ccircle cx='30' cy='90' r='1'/%3E%3Ccircle cx='50' cy='90' r='1'/%3E%3Ccircle cx='70' cy='90' r='1'/%3E%3Ccircle cx='90' cy='90' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                          pointerEvents: "none",
                          opacity: 0.3,
                          transition: "opacity 0.3s ease",
                        }}
                      />
                    </>
                  ) : (item.type === "video" || item.type === "animated_gif") &&
                    item.urls &&
                    item.urls.length > 0 ? (
                    <>
                      {/* Direct video rendering in grid */}
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          minHeight: "194px",
                        }}
                      >
                        {/* Use the VideoPlayer component for the grid item */}
                        <VideoPlayer
                          videoUrl={item.urls[0]}
                          previewUrl={item.preview_image_url}
                          controls={false}
                          autoPlay={playingMediaIndex === index}
                          loop={playingMediaIndex === index}
                          muted={true}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            minHeight: "194px",
                            filter: "contrast(1.1) saturate(1.2)",
                          }}
                        />

                        <Box
                          className="media-overlay"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='70' cy='10' r='1'/%3E%3Ccircle cx='90' cy='10' r='1'/%3E%3Ccircle cx='10' cy='30' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='50' cy='30' r='1'/%3E%3Ccircle cx='70' cy='30' r='1'/%3E%3Ccircle cx='90' cy='30' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='30' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='70' cy='50' r='1'/%3E%3Ccircle cx='90' cy='50' r='1'/%3E%3Ccircle cx='10' cy='70' r='1'/%3E%3Ccircle cx='30' cy='70' r='1'/%3E%3Ccircle cx='50' cy='70' r='1'/%3E%3Ccircle cx='70' cy='70' r='1'/%3E%3Ccircle cx='90' cy='70' r='1'/%3E%3Ccircle cx='10' cy='90' r='1'/%3E%3Ccircle cx='30' cy='90' r='1'/%3E%3Ccircle cx='50' cy='90' r='1'/%3E%3Ccircle cx='70' cy='90' r='1'/%3E%3Ccircle cx='90' cy='90' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                            pointerEvents: "none",
                            opacity: 0.3,
                            transition: "opacity 0.3s ease",
                          }}
                        />

                        {/* Play button overlay */}
                        {playingMediaIndex !== index && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                              backgroundColor: defaultColors.teal,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: `3px solid ${borderColor}`,
                              transition: "transform 0.3s ease",
                              "&:before": {
                                content: '""',
                                width: 0,
                                height: 0,
                                borderTop: "15px solid transparent",
                                borderBottom: "15px solid transparent",
                                borderLeft: `25px solid ${borderColor}`,
                                marginLeft: "5px",
                              },
                            }}
                          />
                        )}
                      </Box>
                    </>
                  ) : null}
                </Box>
              );
            })}
          </Grid>

          {/* Media Viewer Modal */}
          <MediaModal
            open={!!selectedMedia}
            onClose={handleCloseMedia}
            media={selectedMedia}
          />
        </Box>
      )}

      <CardContent
        sx={{
          backgroundColor: colors.cardBackground,
          padding: "16px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a
          href={`https://twitter.com/${tweet?.username}/status/${tweet.tweet_id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body1"
            sx={{
              transition: "transform 0.2s ease, color 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                color: colors.primary,
              },
              fontFamily: " 'Helvetica', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: colors.textPrimary,
              lineHeight: "1.5",
              margin: "1px auto",
              padding: "5px",
              borderRadius: "8px",
              display: "inline-block",
              maxWidth: "100%",
              wordWrap: "break-word",
              justifyContent: "center",
            }}
            // dangerouslySetInnerHTML={{ __html: formatTweetText(tweet.text, tweet.entities) }}
          >
            {" "}
            {formatTweetText(tweet.text)}
          </Typography>
        </a>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: `${colors.primary}10`,
          borderTop: `1px solid ${colors.primary}30`,
          padding: "10px",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: `${colors.primary}20`,
          },
        }}
        disableSpacing
      >
        {/* LEFT SIDE: ICONS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            aria-label="comments"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?in_reply_to=${tweet.tweet_id}`,
                "_blank"
              )
            }
            sx={{
              color: colors.textSecondary,
              transition: "color 0.2s ease, transform 0.2s ease",
              "&:hover": {
                color: "#1D9BF0", // Twitter blue for replies
                transform: "scale(1.1)",
              },
            }}
          >
            <ChatBubbleOutlineIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 0.5, fontSize: "0.75rem" }}>
              {tweet?.reply_count ?? 0}
            </Typography>
          </IconButton>

          <IconButton
            aria-label="retweets"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/retweet?tweet_id=${tweet.tweet_id}`,
                "_blank"
              )
            }
            sx={{
              color: colors.textSecondary,
              transition: "color 0.2s ease, transform 0.2s ease",
              "&:hover": {
                color: "#00BA7C", // Twitter green for retweets
                transform: "scale(1.1)",
              },
            }}
          >
            <RepeatIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 0.5, fontSize: "0.75rem" }}>
              {(tweet?.retweet_count ?? 0) + (tweet?.quote_count ?? 0)}
            </Typography>
          </IconButton>

          <IconButton
            aria-label="likes"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/like?tweet_id=${tweet.tweet_id}`,
                "_blank"
              )
            }
            sx={{
              color: colors.textSecondary,
              transition: "color 0.2s ease, transform 0.2s ease",
              "&:hover": {
                color: "#F91880", // Twitter pink for likes
                transform: "scale(1.1)",
              },
            }}
          >
            <FavoriteIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 0.5, fontSize: "0.75rem" }}>
              {tweet?.like_count ?? 0}
            </Typography>
          </IconButton>
        </Box>

        {/* RIGHT SIDE: TIME */}
        <Typography
          variant="body2"
          sx={{ color: colors.textSecondary, fontSize: "0.75rem" }}
        >
          {tweet.created_at ? formatTime(tweet.created_at) : ""}
        </Typography>
      </CardActions>
    </Card>
  );
};
