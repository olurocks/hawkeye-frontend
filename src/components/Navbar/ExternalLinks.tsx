import React from "react";
import { Box } from "@mui/material";
import { ComicImageButton } from "./ComicButton";

export const ExternalLinks: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <ComicImageButton
        imageSrc="/dexscreener.png"
        label="Dexscreener link"
        url="https://dexscreener.com"
      />
      <ComicImageButton
        imageSrc="/pumpfun.png"
        label="pumpfun link"
        url="https://pump.fun"
      />
      <ComicImageButton
        imageSrc="/dextools.svg"
        label="dextools link"
        url="https://dextools.com"
      />
    </Box>
  );
};

export const Dexscreener: React.FC = () => {
  return (
    <ComicImageButton
      imageSrc="/dexscreener.png"
      label="Dexscreener link"
      url="https://dexscreener.com"
    />
  );
};

export const Dextools: React.FC = () => {
  return (
    <ComicImageButton
      imageSrc="/dextools.svg"
      label="dextools link"
      url="https://dextools.com"
    />
  );
};

export const PumpFun: React.FC = () => {
  return (
    <ComicImageButton
      imageSrc="/pumpfun.png"
      label="pumpfun link"
      url="https://pump.fun"
    />
  );
};