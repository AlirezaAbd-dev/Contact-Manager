import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
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
      <Image
        src={loadingImage.src}
        alt="not found"
        width={500}
        height={500}
        style={{
          margin: "0 auto",
          width: isSmDown ? "50%" : "30%",
          height: "auto",
        }}
      />
    </Box>
  );
};

export default NotFoundGif;
