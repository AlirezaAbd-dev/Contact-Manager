"use client"
import { Box } from "@mui/material";
import React from "react";

const SignInCard = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={2}
      mt={5}
      alignItems="center"
      sx={{
        bgcolor: "card.main",
        borderRadius: 2,
        width: {
          xs: "100%",
          sm: "100%",
          md: "70%",
          lg: "60%",
        },
      }}
    >
      {props.children}
    </Box>
  );
};

export default SignInCard;
