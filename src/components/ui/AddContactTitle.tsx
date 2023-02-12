"use client";
import { ReactNode, useEffect, useState } from "react";
import { Box, Divider, Slide, Typography } from "@mui/material";

const AddContactTitle = ({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) => {
  const [titleLoading, setTitleLoading] = useState<boolean>();

  useEffect(() => {
    setTitleLoading(true);

    return () => {
      setTitleLoading(false);
    };
  }, []);

  return (
    <Slide
      direction="down"
      in={titleLoading}
      style={{
        transitionDelay: titleLoading ? "300ms" : "0ms",
      }}
    >
      <Box width="100%">
        <Box width="100%" mb={2} textAlign="center">
          <Typography variant="h5" fontWeight="bold" color={color}>
            {children}
          </Typography>
        </Box>
        <Divider color={color} sx={{ width: "100%" }} />
      </Box>
    </Slide>
  );
};

export default AddContactTitle;
