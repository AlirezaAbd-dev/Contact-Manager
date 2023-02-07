"use client";
import Grid from "@mui/material/Unstable_Grid2";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import { Suspense, lazy } from "react";

const Avatar = lazy(() => import("@mui/material/Avatar"));

const EditContactAvatar = ({ avatarSrc, alt }) => {
  const skeleton = (
    <Skeleton
      variant="circular"
      animation="wave"
      sx={{
        width: {
          xs: 150,
          sm: 200,
          md: 250,
        },
        height: {
          xs: 150,
          sm: 200,
          md: 250,
        },
        m: "0 auto",
      }}
    />
  );

  return (
    <Grid xs={12} sm={12} md={4} lg={4} p={1}>
      <Suspense fallback={skeleton}>
        <Avatar
          variant="circular"
          sx={{
            width: {
              xs: "70%",
              sm: "70%",
              md: "100%",
            },
            height: "auto",
            m: "0 auto",
          }}
        >
          <Image
            src={avatarSrc}
            alt={alt}
            width={500}
            height={500}
            layout="responsive"
          />
        </Avatar>
      </Suspense>
    </Grid>
  );
};

export default EditContactAvatar;
