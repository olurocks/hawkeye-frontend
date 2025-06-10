import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Skeleton,
  Tooltip
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  Timeline,
  LocalFireDepartment,
  PlayArrow,
  Pause
} from '@mui/icons-material';

interface CashtagData {
  cashtag: string;
  mention_count: number;
  last_mentioned: string;
  change?: number; // Percentage change (if available)
  trend?: 'up' | 'down' | 'neutral';
}

interface TickerCarouselProps {
  colors: any;
}

export const TickerCarousel: React.FC<TickerCarouselProps> = ({ colors }) => {
  const [tickers, setTickers] = useState<CashtagData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [scrollSpeed, setScrollSpeed] = useState(30); // pixels per second
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch top cashtags
  useEffect(() => {
    const fetchTopCashtags = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:4000/api/cashtags/trending');
        
        if (!response.ok) {
          throw new Error('Failed to fetch trending cashtags');
        }
        
        const data = await response.json();
        
        // Mock data for demonstration - replace with actual API response
        const mockData: CashtagData[] = [
          { cashtag: '$AAPL', mention_count: 1247, last_mentioned: '2025-05-30T10:30:00Z', change: 5.2, trend: 'up' },
          { cashtag: '$TSLA', mention_count: 987, last_mentioned: '2025-05-30T09:45:00Z', change: -2.1, trend: 'down' },
          { cashtag: '$NVDA', mention_count: 856, last_mentioned: '2025-05-30T11:15:00Z', change: 8.7, trend: 'up' },
          { cashtag: '$MSFT', mention_count: 734, last_mentioned: '2025-05-30T08:20:00Z', change: 1.3, trend: 'up' },
          { cashtag: '$GOOGL', mention_count: 612, last_mentioned: '2025-05-30T10:05:00Z', change: -0.8, trend: 'down' },
          { cashtag: '$AMZN', mention_count: 543, last_mentioned: '2025-05-30T09:30:00Z', change: 3.4, trend: 'up' },
          { cashtag: '$META', mention_count: 456, last_mentioned: '2025-05-30T11:00:00Z', change: -1.2, trend: 'down' },
          { cashtag: '$BTC', mention_count: 398, last_mentioned: '2025-05-30T10:45:00Z', change: 12.5, trend: 'up' },
          { cashtag: '$ETH', mention_count: 321, last_mentioned: '2025-05-30T09:15:00Z', change: 7.8, trend: 'up' },
          { cashtag: '$SPY', mention_count: 287, last_mentioned: '2025-05-30T08:50:00Z', change: 0.9, trend: 'up' },
          { cashtag: '$QQQ', mention_count: 234, last_mentioned: '2025-05-30T08:30:00Z', change: 1.7, trend: 'up' },
          { cashtag: '$VTI', mention_count: 198, last_mentioned: '2025-05-30T09:00:00Z', change: 0.5, trend: 'up' },
          { cashtag: '$DOGE', mention_count: 176, last_mentioned: '2025-05-30T10:20:00Z', change: -3.2, trend: 'down' },
          { cashtag: '$GME', mention_count: 143, last_mentioned: '2025-05-30T08:45:00Z', change: 15.6, trend: 'up' },
          { cashtag: '$AMD', mention_count: 121, last_mentioned: '2025-05-30T09:25:00Z', change: 4.1, trend: 'up' }
        ];
        
        setTickers(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching cashtags:', err);
        setError('Failed to load trending tickers');
      } finally {
        setLoading(false);
      }
    };

    fetchTopCashtags();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchTopCashtags, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatMentionCount = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const mentioned = new Date(dateString);
    const diffMs = now.getTime() - mentioned.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getTrendIcon = (trend?: string, change?: number) => {
    if (!trend || !change) return null;
    
    if (trend === 'up') {
      return <TrendingUp sx={{ fontSize: 16, color: '#4caf50' }} />;
    } else if (trend === 'down') {
      return <TrendingDown sx={{ fontSize: 16, color: '#f44336' }} />;
    }
    return <Timeline sx={{ fontSize: 16, color: colors.text_secondary }} />;
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: colors.primary,
          padding: '16px 0',
          borderBottom: `3px solid ${colors.secondary}`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2,
            maxWidth: '1200px',
            mx: 'auto'
          }}
        >
          <LocalFireDepartment sx={{ color: colors.accent, fontSize: 24 }} />
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Bangers', cursive",
              color: colors.text_primary,
              letterSpacing: '1px'
            }}
          >
            TRENDING TICKERS
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={120}
                height={36}
                sx={{ bgcolor: `${colors.dark}33` }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          backgroundColor: colors.primary,
          padding: '16px 0',
          borderBottom: `3px solid ${colors.secondary}`,
          textAlign: 'center'
        }}
      >
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box>
    );
  }

  // Create duplicated ticker array for seamless scrolling
  const duplicatedTickers = [...tickers, ...tickers];

  return (
    <Box
      sx={{
        backgroundColor: colors.primary,
        padding: '5px 0',
        borderBottom: `3px solid ${colors.secondary}`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(${colors.dark}22 1px, transparent 1px)`,
          backgroundSize: '8px 8px',
          opacity: 0.1,
          pointerEvents: 'none'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 2,
          maxWidth: '1200px',
          mx: 'auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 'fit-content' }}>
          <LocalFireDepartment sx={{ color: colors.accent, fontSize: 24 }} />
            <Typography
            variant={isMobile ? 'subtitle1' : 'h6'}
            sx={{
              fontFamily: "'Bangers', cursive",
              color: colors.text_primary,
              letterSpacing: '1px',
              whiteSpace: 'nowrap'
            }}
            >
            {isMobile ? 'TRENDING' : 'TRENDING TICKERS'}
            </Typography>
        </Box>

        {/* Play/Pause Button */}
        <IconButton
          onClick={toggleAutoScroll}
          size="small"
          sx={{
            color: colors.text_secondary,
            '&:hover': {
              backgroundColor: `${colors.secondary}33`,
              color: colors.text_primary
            }
          }}
        >
          {isAutoScrolling ? <Pause /> : <PlayArrow />}
        </IconButton>

        {/* Scrolling Tickers Container */}
        <Box
          sx={{
            flex: 1,
            overflow: 'hidden',
            position: 'relative',
            height: '52px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              animation: isAutoScrolling ? 'scroll-left 60s linear infinite' : 'none',
              animationPlayState: isAutoScrolling ? 'running' : 'paused',
              '&:hover': {
                animationPlayState: 'paused'
              },
              '@keyframes scroll-left': {
                '0%': {
                  transform: 'translateX(0)'
                },
                '100%': {
                  transform: 'translateX(-50%)'
                }
              }
            }}
            onMouseEnter={() => {
              // Pause animation on hover for better UX
            }}
          >
            {duplicatedTickers.map((ticker, index) => (
              <Tooltip
                key={`${ticker.cashtag}-${index}`}
                title={`${ticker.mention_count} mentions • Last: ${getTimeAgo(ticker.last_mentioned)}`}
                placement="bottom"
              >
                <Chip
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: isMobile ? '0.75rem' : '0.875rem'
                        }}
                      >
                        {ticker.cashtag}
                      </Typography>
                      {getTrendIcon(ticker.trend, ticker.change)}
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: isMobile ? '0.65rem' : '0.75rem',
                          opacity: 0.8
                        }}
                      >
                        {formatMentionCount(ticker.mention_count)}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    backgroundColor: colors.card_background,
                    color: colors.text_primary,
                    border: `1px solid ${colors.secondary}`,
                    minWidth: isMobile ? '100px' : '140px',
                    height: '36px',
                    fontFamily: "'Roboto Mono', monospace",
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    flexShrink: 0,
                    '&:hover': {
                      backgroundColor: colors.secondary,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 8px ${colors.dark}33`
                    },
                    '& .MuiChip-label': {
                      px: 1
                    }
                  }}
                  onClick={() => {
                    // Handle ticker click - could navigate to ticker detail page
                    console.log(`Clicked on ${ticker.cashtag}`);
                  }}
                />
              </Tooltip>
            ))}
          </Box>
        </Box>

        {/* Status indicator */}
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: isAutoScrolling ? colors.accent : colors.text_secondary,
            opacity: 0.7,
            animation: isAutoScrolling ? 'pulse 2s infinite' : 'none',
            '@keyframes pulse': {
              '0%': { opacity: 0.7 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.7 }
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default TickerCarousel;