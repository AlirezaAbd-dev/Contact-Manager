"use client";
import Grid from "@mui/material/Unstable_Grid2";
import { Avatar, Skeleton } from "@mui/material";

const EditContactAvatar = () => {
  return (
    <Grid xs={12} sm={12} md={4} lg={4} p={1}>
      {true && (
        <Avatar
          variant="circular"
          src="https://avatars.githubusercontent.com/u/98334060?v=4"
          sx={{
            width: {
              xs: "70%",
              sm: "70%",
              md: "100%",
            },
            height: "auto",
            m: "0 auto",
          }}
        />
      )}
      {false && (
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
      )}
    </Grid>
  );
};

export default EditContactAvatar;
