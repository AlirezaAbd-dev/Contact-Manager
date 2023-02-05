import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const MainContactsCardSkeleton = () => {
  return (
    <Grid xs={12} sm={12} md={4} lg={4} xl={4} mb={5}>
      <Card
        sx={{
          bgcolor: "transparent",
          maxWidth: {
            xs: "100%",
            sm: "85%",
          },
          m: "0 auto",
        }}
      >
        <CardActionArea>
          <Skeleton variant="rectangular" animation="pulse" height="200px" />
          <CardContent>
            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height={30}
            />
            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height={30}
            />
            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height={30}
            />
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            gap={2}
            pb={2}
          >
            {/* BUTTONS */}
            <Skeleton variant="rounded" animation="wave" width={50} />
            <Skeleton variant="rounded" animation="wave" width={50} />
            <Skeleton variant="rounded" animation="wave" width={50} />
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MainContactsCardSkeleton;
