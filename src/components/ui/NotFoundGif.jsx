import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import loadingImage from "../../assets/no-found.gif";

const NotFoundGif = () => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="card.main"
      py={4}
      mb={2}
      borderRadius={2}
    >
      <Typography variant={isSmDown ? "h6" : "h4"} mb={2} color="warning.main">
        مخاطبی یافت نشد...
      </Typography>
      <img
        src={loadingImage}
        alt="not found"
        style={{
          margin: "0 auto",
          width: isSmDown ? "50%" : "30%",
        }}
      />
    </Box>
  );
};

export default NotFoundGif;
