"use client";
import { Box, Slide } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

const EditContactCard = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <Slide
      direction="left"
      in={loading}
      style={{
        transitionDelay: loading ? "300ms" : "0ms",
      }}
    >
      <Box
        bgcolor="card.main"
        mt={3}
        borderRadius={5}
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "90%",
            lg: "70%",
          },
        }}
      >
        {children}
      </Box>
    </Slide>
  );
};

export default EditContactCard;
