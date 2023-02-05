import { Box, Slide } from "@mui/material";
import { useEffect, useState } from "react";

const EditContactSideImage = () => {
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
          mt: 2,
          width: {
            xs: "80%",
            sm: "80%",
            md: "70%",
            lg: "50%",
          },
        }}
      >
        <img
          src={require("../../assets/man-taking-note.png")}
          alt="man taking note"
          width="100%"
          style={{ opacity: 0.5 }}
        />
      </Box>
    </Slide>
  );
};

export default EditContactSideImage;
