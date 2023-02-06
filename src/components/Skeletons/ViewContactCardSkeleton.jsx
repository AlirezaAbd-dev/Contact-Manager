"use client";
import { Box, Skeleton } from "@mui/material";
import ViewContactCard from "../viewContact/ViewContactCard";
import BackToHomeButton from "../ui/BackToHomeButton";

const ViewContactCardSkeleton = () => {
  return (
    <ViewContactCard>
      <Skeleton
        variant="circular"
        sx={{
          width: {
            xs: 150,
            sm: 250,
            md: 300,
          },
          height: {
            xs: 150,
            sm: 250,
            md: 300,
          },
        }}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        bgcolor="transparent"
        borderRadius={2}
        m={0}
        mt={2}
        sx={{ overflowX: "hidden" }}
      >
        <Skeleton variant="text" animation="wave" width="100%" height={60} />
        <Skeleton variant="text" animation="wave" width="100%" height={60} />
        <Skeleton variant="text" animation="wave" width="100%" height={60} />
        <Skeleton variant="text" animation="wave" width="100%" height={60} />
        <Skeleton variant="text" animation="wave" width="100%" height={60} />
      </Box>
      <BackToHomeButton />
    </ViewContactCard>
  );
};

export default ViewContactCardSkeleton;
