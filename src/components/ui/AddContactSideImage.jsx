import { Slide } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";

const AddContactSideImage = () => {
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    setImageLoading(true);

    return () => {
      setImageLoading(false);
    };
  },[]);
  return (
    <Slide
      direction="right"
      in={imageLoading}
      style={{
        transitionDelay: imageLoading ? "400ms" : "0ms",
      }}
    >
      <Grid xs={12} sm={12} md={7}>
        <img
          src={require("../../assets/man-taking-note.png")}
          alt="Man taking note"
          style={{
            width: "100%",
            height: "auto",
            opacity: 0.5,
          }}
        />
      </Grid>
    </Slide>
  );
};

export default AddContactSideImage;
