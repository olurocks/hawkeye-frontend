import React, { useState, useEffect } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import { TweetGrid } from './TweetGrid';
// import { dummyTweets } from './dummyTweets';
import { useSocketTweets } from '../hooks/useSocketTweets';
import { dummyTweets } from './dummyTweets';

// Dark theme color palette
const colors = {
  background: "#121212",        // Dark background
  surface: "#1E1E1E",           // Slightly lighter surface
  primary: "#BB86FC",           // Purple primary
  secondary: "#03DAC6",         // Teal secondary
  accent: "#CF6679",            // Red accent
  textPrimary: "#E1E1E1",       // Light text
  textSecondary: "#B0B0B0"      // Secondary text
};

const App = () => {
  let { tweets, isConnected, error, loading } = useSocketTweets();
  tweets = dummyTweets

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: colors.background,
      color: colors.textPrimary
    }}>
      <CssBaseline />
      
      {/* Navbar - glossy translucent styling is maintained in the Navbar component */}
      <Navbar />
      
      {/* Main Content */}
      <Container 
        maxWidth="xl" 
        sx={{ 
          mt: 2, 
          mb: 2, 
          flexGrow: 1, 
          backgroundColor: colors.surface,
          borderRadius: 2,
          padding: 3,
          boxShadow: `0 8px 24px rgba(0, 0, 0, 0.2)`,
          border: `1px solid ${colors.primary}30`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: `0 12px 32px rgba(0, 0, 0, 0.3)`,
            borderColor: `${colors.primary}50`
          }
        }}
      >
        <TweetGrid 
          tweets={tweets} 
          isConnected={isConnected} 
          error={error} 
          loading={loading} 
        />
      </Container>
      
      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          backgroundColor: colors.surface,
          borderTop: `1px solid ${colors.primary}50`,
          boxShadow: `0 -4px 16px rgba(0, 0, 0, 0.15)`,
          textAlign: 'center',
          color: colors.textSecondary,
          fontSize: '0.875rem'
        }}
      >
        <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
          © {new Date().getFullYear()} Hawkeye — All rights reserved
        </Box>
      </Box>
    </Box>
  );
};

export default App;