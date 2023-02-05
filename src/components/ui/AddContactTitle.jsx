import { Box, Divider, Slide, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const AddContactTitle = ({color, children}) => {
  const [titleLoading, setTitleLoading] = useState();

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
        <Divider width="100%" color={color} />
      </Box>
    </Slide>
  );
};

export default AddContactTitle;
