"use client";
import { Box, Slide } from "@mui/material";
import { useEffect, useState } from "react";

const ViewContactCard = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <Slide
      direction="up"
      in={loading}
      style={{
        transitionDelay: loading ? "300ms" : "0ms",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "card.main",
          borderRadius: 5,
          width: {
            xs: "100%",
            sm: "100%",
            md: "90%",
            lg: "60%",
          },
          p: 2,
          mb: 4,
        }}
      >
        {props.children}
      </Box>
    </Slide>
  );
};

export default ViewContactCard;
