"use client";
import { ChangeEvent } from "react";
import { Box, Tab, Tabs } from "@mui/material";

const SignInTabs = ({
  page,
  pageHandler,
}: {
  page: number;
  pageHandler: (e: ChangeEvent, newValue: number) => void;
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Tabs
        value={page}
        onChange={pageHandler}
        aria-label="signIn tabs"
        centered
      >
        <Tab label="ورود" />
        <Tab label="ثبت نام" />
        <Tab label="حذف حساب" />
      </Tabs>
    </Box>
  );
};

export default SignInTabs;
