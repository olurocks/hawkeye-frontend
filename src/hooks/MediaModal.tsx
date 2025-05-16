import React from "react";
import { Box } from "@mui/material";
import { IMedia } from "../types/types";
import { Modal } from "@mui/material";
import { TweetCardColors } from "../utils/TweetCardColors";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { VideoPlayer } from "./videoPlayer";

export const MediaModal: React.FC<{
    open: boolean;
    onClose: () => void;
    media: IMedia | null;
  }> = ({ open, onClose, media }) => {
    const colors = TweetCardColors()

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
            maxWidth: "90vw",
            maxHeight: "90vh",
            bgcolor: "background.paper",
            border: `4px solid ${colors.black}`,
            borderRadius: "8px",
            boxShadow: `8px 8px 0px ${colors.black}`,
            p: 2,
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: colors.offWhite,
          }}
        >
          {media.type === "photo" && media.urls && media.urls.length > 0 ? (
            <img
              src={media.urls[0]}
              alt={media.alt_text || "Tweet media"}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                border: `3px solid ${colors.blue}`,
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
                border: `3px solid ${colors.red}`,
                borderRadius: "6px",
              }}
            />
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