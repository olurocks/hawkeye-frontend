import { GridColors } from "./colors";
import { Card, Box, Skeleton } from "@mui/material";


export const TweetGridSkeleton = () => {
  const comicColors = GridColors();
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        width: "100%", 
        padding: 2,
        border: `4px solid ${comicColors.black}`,
        borderRadius: "12px",
        backgroundColor: comicColors.offWhite,
        boxShadow: `6px 6px 0px ${comicColors.black}`,
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='70' cy='10' r='1'/%3E%3Ccircle cx='90' cy='10' r='1'/%3E%3Ccircle cx='10' cy='30' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='50' cy='30' r='1'/%3E%3Ccircle cx='70' cy='30' r='1'/%3E%3Ccircle cx='90' cy='30' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='30' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='70' cy='50' r='1'/%3E%3Ccircle cx='90' cy='50' r='1'/%3E%3Ccircle cx='10' cy='70' r='1'/%3E%3Ccircle cx='30' cy='70' r='1'/%3E%3Ccircle cx='50' cy='70' r='1'/%3E%3Ccircle cx='70' cy='70' r='1'/%3E%3Ccircle cx='90' cy='70' r='1'/%3E%3Ccircle cx='10' cy='90' r='1'/%3E%3Ccircle cx='30' cy='90' r='1'/%3E%3Ccircle cx='50' cy='90' r='1'/%3E%3Ccircle cx='70' cy='90' r='1'/%3E%3Ccircle cx='90' cy='90' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
          zIndex: 1,
          pointerEvents: "none"
        }
      }}
    >
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          marginBottom: 2,
          backgroundColor: comicColors.yellow,
          padding: 2,
          border: `3px solid ${comicColors.black}`,
          borderRadius: "8px",
        }}
      >
        <Skeleton 
          variant="circular" 
          width={50} 
          height={50} 
          sx={{ 
            marginRight: 2,
            border: `2px solid ${comicColors.black}`,
            backgroundColor: comicColors.lightBlue,
            opacity: 0.7
          }} 
        />
        <Box sx={{ width: "100%" }}>
          <Skeleton 
            variant="text" 
            width="60%" 
            height={30} 
            sx={{ 
              backgroundColor: comicColors.lightBlue,
              opacity: 0.7
            }} 
          />
          <Skeleton 
            variant="text" 
            width="40%" 
            height={20} 
            sx={{ 
              backgroundColor: comicColors.lightBlue,
              opacity: 0.7
            }} 
          />
        </Box>
      </Box>
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={194} 
        sx={{ 
          marginBottom: 2,
          border: `3px solid ${comicColors.black}`,
          borderRadius: "8px",
          backgroundColor: comicColors.lightBlue,
          opacity: 0.7
        }} 
      />
      <Box 
        sx={{ 
          padding: 2, 
          border: `3px solid ${comicColors.black}`,
          borderRadius: "8px",
          backgroundColor: comicColors.lightBlue,
          marginBottom: 2,
          transform: "rotate(-1deg)",
        }}
      >
        <Skeleton 
          variant="text" 
          width="100%" 
          sx={{ 
            backgroundColor: comicColors.offWhite,
            opacity: 0.7
          }} 
        />
        <Skeleton 
          variant="text" 
          width="100%" 
          sx={{ 
            backgroundColor: comicColors.offWhite,
            opacity: 0.7
          }} 
        />
        <Skeleton 
          variant="text" 
          width="80%" 
          sx={{ 
            backgroundColor: comicColors.offWhite,
            opacity: 0.7
          }} 
        />
      </Box>
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "flex-start", 
          marginTop: 2,
          backgroundColor: comicColors.yellow, 
          padding: 2,
          border: `3px solid ${comicColors.black}`,
          borderRadius: "8px",
        }}
      >
        <Skeleton 
          variant="circular" 
          width={40} 
          height={40} 
          sx={{ 
            marginRight: 2,
            backgroundColor: comicColors.blue,
            opacity: 0.7,
            border: `2px solid ${comicColors.black}`
          }} 
        />
        <Skeleton 
          variant="circular" 
          width={40} 
          height={40} 
          sx={{ 
            marginRight: 2,
            backgroundColor: comicColors.blue,
            opacity: 0.7,
            border: `2px solid ${comicColors.black}`
          }} 
        />
        <Skeleton 
          variant="circular" 
          width={40} 
          height={40} 
          sx={{ 
            backgroundColor: comicColors.red,
            opacity: 0.7,
            border: `2px solid ${comicColors.black}`
          }} 
        />
      </Box>
    </Card>
  );
};