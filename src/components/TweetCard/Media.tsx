import React from "react";
import { TweetCardProps } from "../../types/types";
import { Box, Grid, CardMedia } from "@mui/material";
import { TweetCardColors } from "../../utils/TweetCardColors";
import { MediaModal } from "../../hooks/MediaModal";

export const Media: React.FC<TweetCardProps> = ({ tweet }) => {
  const colors = TweetCardColors();
  const [selectedMedia, setSelectedMedia] = React.useState<any>(null);
  // const [playingMediaIndex, setPlayingMediaIndex] = React.useState<
  //   number | null
  // >(null);

  const handleMediaClick = (media: any) => {
    setSelectedMedia(media);
  };

  const handleCloseMedia = () => {
    setSelectedMedia(null);
  };

  // const handleMediaHover = (index: number) => {
  //   setPlayingMediaIndex(index);
  // };

  // const handleMediaLeave = () => {
  //   setPlayingMediaIndex(null);
  // };

  if (!tweet.media || tweet.media.length === 0) {
    return null;
  }

  return (
    <Box sx={{ padding: "8px" }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "grid",
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
          gap: "8px",
        }}
      >
        {tweet.media.map((item, index) => {
          const borderColors = [
            colors.blue,
            colors.red,
            colors.lightBlue,
            colors.yellow,
          ];
          const borderColor = borderColors[index % borderColors.length];
          const gridArea =
            (tweet.media ?? []).length === 3 ? `item${index}` : undefined;

          return (
            <Box
              key={`media-${index}`}
              sx={{
                gridArea,
                position: "relative",
                border: `4px solid ${borderColor}`,
                borderRadius: "6px",
                overflow: "hidden",
                height: "100%",
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
              // onMouseEnter={() => handleMediaHover(index)}
              // onMouseLeave={handleMediaLeave}
            >
              {item.type === "photo" ? (
                <>
                  <CardMedia
                    component="img"
                    height="194"
                    src={item.url}
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
              ) : item.type === "video" || item.type === "animated_gif" ? (
                <>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      minHeight: "194px",
                    }}
                  >
                    {/* Display preview image instead of video */}
                    <CardMedia
                      component="img"
                      height="194"
                      src={item.url || "/placeholder-video.jpg"}
                      alt={item.alt_text || "Video preview"}
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

                    {/* Always show play button for videos */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: colors.blue,
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
                  </Box>
                </>
              ) : null}
            </Box>
          );
        })}
      </Grid>

      <MediaModal
        open={!!selectedMedia}
        onClose={handleCloseMedia}
        media={selectedMedia}
      />
    </Box>
  );
};