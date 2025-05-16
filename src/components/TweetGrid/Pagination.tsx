import React from "react";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";

import { GridColors } from "./colors";
import { comicFonts } from "../../utils/comicFonts";

interface PaginationProps {
  page: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const GridPagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  loading,
  onPageChange
}) => {
  const comicColors = GridColors();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 4,
        padding: "10px",
        position: "relative",
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={onPageChange}
        disabled={loading}
        sx={{
          "& .MuiPaginationItem-root": {
            fontFamily: comicFonts.title,
            fontWeight: "bold",
            fontSize: "18px",
            color: comicColors.black,
            backgroundColor: comicColors.yellow,
            border: `2px solid ${comicColors.black}`,
            borderRadius: "8px",
            margin: "0 4px",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: comicColors.blue,
              color: comicColors.offWhite,
              transform: "scale(1.1) rotate(-3deg)",
              boxShadow: `2px 2px 0px ${comicColors.black}`,
            },
          },
          "& .Mui-selected": {
            backgroundColor: `${comicColors.blue} !important`,
            color: `${comicColors.offWhite} !important`,
            boxShadow: `3px 3px 0px ${comicColors.black}`,
            transform: "scale(1.1)",
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              top: "-4px",
              right: "-4px",
              left: "-4px",
              bottom: "-4px",
              border: `2px solid ${comicColors.black}`,
              borderRadius: "10px",
              zIndex: -1,
            },
          },
          "& .MuiPaginationItem-ellipsis": {
            fontFamily: comicFonts.title,
            fontSize: "24px",
            fontWeight: "bold",
            color: comicColors.black,
          },
          "& button": {
            "&:disabled": {
              opacity: 0.5,
              border: `2px dashed ${comicColors.black}`,
            },
          },
        }}
      />
    </Box>
  );
};

export default GridPagination;
