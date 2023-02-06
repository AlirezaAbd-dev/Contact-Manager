"use client"
import { Slide } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";

import thinkingManImage from "../../assets/man-taking-note.png";
import Image from "next/image";

const AddContactSideImage = () => {
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    setImageLoading(true);

    return () => {
      setImageLoading(false);
    };
  }, []);
  return (
    <Slide
      direction="right"
      in={imageLoading}
      style={{
        transitionDelay: imageLoading ? "400ms" : "0ms",
      }}
    >
      <Grid xs={12} sm={12} md={5}>
        <Image
        layout="responsive"
          src={thinkingManImage}
          alt="Man taking note"
          height={600}
          width={900}
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
