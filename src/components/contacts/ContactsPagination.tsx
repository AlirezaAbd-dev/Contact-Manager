"use client";
import { Pagination, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

const ContactsPagination = ({
  count,
  page,
}: {
  count?: number;
  page: number;
}) => {
  const theme = useTheme();
  const router = useRouter();

  const pageChangeHandler = (_e: any, page: number) => {
    router.push(`?page=${page}`);
  };

  const isSmDown = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack mb={4}>
      <Pagination
        showFirstButton
        showLastButton
        count={count}
        page={page}
        onChange={pageChangeHandler}
        size={isSmDown ? "small" : "large"}
        sx={{ direction: "ltr" }}
      />
    </Stack>
  );
};

export default ContactsPagination;
