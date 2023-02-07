"use client";
import { Box, Tab, Tabs } from "@mui/material";

const SignInTabs = ({ page, pageHandler }) => {
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
      </Tabs>
    </Box>
  );
};

export default SignInTabs;
