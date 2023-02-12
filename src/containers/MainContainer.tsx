"use client"
import { Box } from "@mui/material";

const MainContainer = ({ children }) => {
  return (
    <Box
      sx={{
        pt: 3,
        px: {
          xs: 1,
          sm: 8,
        },
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: 'hidden'
      }}
    >
      {children}
    </Box>
  );
};

export default MainContainer;
