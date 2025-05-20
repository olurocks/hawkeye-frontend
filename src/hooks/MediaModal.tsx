import React from "react";
import { Box } from "@mui/material";
import { IMedia } from "../types/types";
import { Modal } from "@mui/material";
import { TweetCardColors } from "../utils/TweetCardColors";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

export const MediaModal: React.FC<{
  open: boolean;
  onClose: () => void;
  media: IMedia | null;
}> = ({ open, onClose, media }) => {
  const colors = TweetCardColors();

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
          maxWidth: "95vw",
          maxHeight: "90vh",
          bgcolor: "background.paper",
          border: `4px solid ${colors.black}`,
          borderRadius: "8px",
          boxShadow: `8px 8px 0px ${colors.black}`,
          p: 1.5,
          outline: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: colors.offWhite,
        }}
      >
        {media.type === "photo" && media.url ? (
          <img
            src={media.url}
            alt={media.alt_text || "Tweet media"}
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
              border: `3px solid ${colors.blue}`,
              borderRadius: "6px",
            }}
          />
        ) : media.type === "video" || media.type === "animated_gif" ? (
          <Box sx={{ position: "relative" }}>
            {/* Display preview image for video */}
            <img
              src={media.url || "/placeholder-video.jpg"}
              alt={media.alt_text || "Video preview"}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                border: `2px solid ${colors.red}`,
                borderRadius: "6px",
              }}
            />
            {/* Overlay with play icon to indicate it's a video */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: "6px",
              }}
            >
              <PlayCircleOutlineIcon
                sx={{
                  fontSize: 80,
                  color: colors.lightBlue,
                  filter: "drop-shadow(0px 0px 5px rgba(0,0,0,0.5))",
                }}
              />
            </Box>
          </Box>
        ) : null}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: colors.red,
            border: `2px solid ${colors.black}`,
            color: colors.offWhite,
            "&:hover": {
              backgroundColor: colors.red,
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