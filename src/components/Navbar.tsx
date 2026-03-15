import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'rgba(18, 18, 24, 0.85)', // Dark translucent background
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(80, 80, 95, 0.3)', // Subtle border
          boxShadow: '0 4px 25px rgba(0, 0, 0, 0.5)', // Dark shadow with subtle glow
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: 180,
          }}
        >
          {/* Left side - Social media icons */}
          <Box sx={{ display: "flex", alignItems: "center", ml: 20 }}>
            <IconButton
              aria-label="telegram link"
              sx={{
                mr: 1,
                color: "#7B68EE", // Soft purple glow
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                "&:hover svg": {
                  filter: "drop-shadow(0px 0px 5px #7B68EE)", // Purple glow on hover
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
              onClick={() => window.open("https://telegram.org", "_blank")}
            >
              <TelegramIcon fontSize="large" />
            </IconButton>

            <IconButton
              aria-label="twitter link"
              sx={{
                mr: 1,
                color: "#7B68EE", // Soft purple glow
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                "&:hover svg": {
                  filter: "drop-shadow(0px 0px 8px #7B68EE)", // Purple glow on hover
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
              onClick={() => window.open("https://twitter.com", "_blank")}
            >
              <TwitterIcon fontSize="large" />
            </IconButton>

            <IconButton
              aria-label="gitbook link"
              sx={{
                mr: 1,
                color: "#7B68EE", // Soft purple glow
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                "&:hover svg": {
                  filter: "drop-shadow(0px 0px 8px #7B68EE)", // Purple glow on hover
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
              onClick={() => window.open("https://gitbook.com", "_blank")}
            >
              <MenuBookIcon fontSize="large" />
            </IconButton>
          </Box>
          
          {/* Center - Logo & Title Side by Side */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Hawkeye Logo"
              sx={{
                height: 70,
                width: 110,
                display: { xs: "block", sm: "block" },
                backgroundColor: "transparent",
                transition: "all 0.3s ease-in-out",
                filter: "drop-shadow(0px 0px 3px rgba(123, 104, 238, 0.5))", // Subtle default glow
                "&:hover": {
                  filter: "drop-shadow(0px 0px 6px rgba(123, 104, 238, 0.8))", // Brighter glow on hover
                  transform: "scale(1.1)",
                },
              }}
            />

            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: "sankofa-Display",
                fontWeight: "bold",
                letterSpacing: 12,
                color: "#a8a8bd", // Soft purple-gray color for text
                textTransform: "uppercase",
                fontSize: { xs: "2.95rem", sm: "3.0rem" },
                mr: 18,
              }}
            >
              {["H", "a", "w", "k", "e", "y", "e"].map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 0 }}
                  whileHover={{
                    y: -5,
                    color: "#7B68EE", // Purple on hover
                    textShadow: "0 0 8px rgba(123, 104, 238, 0.8)", // Purple glow on hover
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  style={{ display: "inline-block" }}
                >
                  {letter}{" "}
                </motion.span>
              ))}
            </Typography>
          </Box>
          
          {/* Right side icons */}
          <Box sx={{ display: "flex", alignItems: "center", mr: 25 }}>
            <IconButton
              aria-label="Dexscreener link"
              sx={{
                mr: 1,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                "&:hover img": {
                  filter: "drop-shadow(0px 0px 8px rgba(123, 104, 238, 0.8))", // Purple glow
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
              onClick={() => window.open("https://dexscreener.com", "_blank")}
            >
              <img
                src="/dexscreener.png"
                alt="Dexscreener"
                style={{ 
                  width: 35, 
                  height: 35, 
                  borderRadius: "8px",
                  filter: "drop-shadow(0px 0px 3px rgba(123, 104, 238, 0.5))" // Default subtle glow
                }}
              />
            </IconButton>

            <IconButton
              aria-label="pumpfun link"
              sx={{
                mr: 1,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                "&:hover img": {
                  filter: "drop-shadow(0px 0px 8px rgba(123, 104, 238, 0.8))", // Purple glow
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
              onClick={() => window.open("https://pump.fun", "_blank")}
            >
              <img
                src="/pumpfun.png"
                alt="PumpFun"
                style={{ 
                  width: 35, 
                  height: 35, 
                  borderRadius: "4px",
                  filter: "drop-shadow(0px 0px 3px rgba(123, 104, 238, 0.5))" // Default subtle glow
                }}
              />
            </IconButton>

            <IconButton
              aria-label="dextools link"
              sx={{
                mr: 1,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                "&:hover img": {
                  filter: "drop-shadow(0px 0px 8px rgba(123, 104, 238, 0.8))", // Purple glow
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
              onClick={() => window.open("https://dextools.com", "_blank")}
            >
              <img
                src="/dextools.svg"
                alt="Dextools"
                style={{ 
                  width: 35, 
                  height: 35, 
                  borderRadius: "4px",
                  filter: "drop-shadow(0px 0px 3px rgba(123, 104, 238, 0.5))" // Default subtle glow
                }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Add spacing so content doesn't overlap with the fixed navbar */}
      <Box sx={{ mt: "120px" }} />
    </>
  );
};

export default Navbar;