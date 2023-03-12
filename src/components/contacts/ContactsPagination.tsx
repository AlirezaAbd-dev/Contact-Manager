"use client";
import { Pagination, Stack, useMediaQuery, useTheme } from "@mui/material";

const ContactsPagination = ({
  count,
  page,
}: {
  count?: number;
  page: number;
}) => {
  const theme = useTheme();

  const isSmDown = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack mb={4}>
      <Pagination
        showFirstButton
        showLastButton
        count={count}
        page={page}
        size={isSmDown ? "small" : "large"}
        sx={{ direction: "ltr" }}
      />
    </Stack>
  );
};

export default ContactsPagination;
