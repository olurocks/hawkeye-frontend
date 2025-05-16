import React from "react";
import { GridColors } from "./colors";
import { Box } from "@mui/system";
import { comicFonts } from "../../utils/comicFonts";

export const GridTitle = () => {
    const comicColors=GridColors()
    return (
                <Box
          sx={{
            width: "100%",
            backgroundColor: comicColors.yellow,
            padding: "16px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: `4px solid ${comicColors.black}`,
            display: "flex",
            justifyContent: "center",
            position: "relative",
            boxShadow: `5px 5px 0px ${comicColors.black}`,
            "&:before": {
              content: '""',
              position: "absolute",
              bottom: "-15px",
              left: "48%",
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "15px 15px 0 15px",
              borderColor: `${comicColors.black} transparent transparent transparent`,
              zIndex: 2
            }
          }}
        >
          <Box
            component="h1"
            sx={{
              fontFamily: comicFonts.title,
              fontSize: "bold",
              margin: 0,
              color: comicColors.black,
              textShadow: `3px 1px 0px ${comicColors.blue}`,
              letterSpacing: "1px",
              textTransform: "uppercase",
              textAlign: "center",
              transform: "rotate(-1deg)",
              display: "inline-block"
            }}
          >
            Latest Tweets
          </Box>
        </Box>
    )
}