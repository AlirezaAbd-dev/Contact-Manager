import { Pagination, Stack, useMediaQuery, useTheme } from "@mui/material";

const ContactsPagination = () => {
  const theme = useTheme();

  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack mb={4}>
      <Pagination
        showFirstButton
        showLastButton
        count={10}
        size={isSmDown ? "small" : "large"}
        sx={{ direction: "ltr" }}
      />
    </Stack>
  );
};

export default ContactsPagination;
