import * as React from "react";
import Card from "@mui/material/Card";
import { TweetCardProps } from "../../types/types";
import { TweetCardColors } from "../../utils/TweetCardColors";
import { TweetCardHeader } from "./Header";
import { Media } from "./Media";
import { Content } from "./Content";
import { Actions } from "./Actions";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/system";

export const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  const colors = TweetCardColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Card
      variant="outlined"
      sx={{
        width: {xs: "100%", sm: "100%", md: "100%", lg: "100%"},
        backgroundColor: colors.offWhite,
        marginBottom: 4,
        transition: "transform 0.3s ease",
        border: `4px solid ${colors.black}`,
        borderRadius: "12px",
        boxShadow: `8px 8px 0px ${colors.black}`,
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
          pointerEvents: "none",
        },
        "&:hover": {
          transform: isMobile? "none" : "translateY(-8px) rotate(1deg)",
          boxShadow: `12px 12px 0px ${colors.black}`,
        },
        zIndex: 1,
      }}
    >
      <TweetCardHeader tweet={tweet} />
      <Media tweet={tweet} />
      <Content tweet={tweet} />
      <Actions tweet={tweet} />
    </Card>
  );
};
