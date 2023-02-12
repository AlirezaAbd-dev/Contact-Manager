"use client";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Link from "next/link";

const SignInForm = ({ page }) => {
  return (
    <>
      <Box width="80%" my={2} display="flex" flexDirection="column" gap={2}>
        <TextField fullWidth label="نام کاربری" />
        <TextField fullWidth label="رمز عبور" />
      </Box>
      <Link
        href="/"
        style={{
          textDecoration: "none",
        }}
      >
        <Button variant="contained" color="secondary">
          {page === 0 ? "ورود" : "ثبت نام"}
        </Button>
      </Link>
    </>
  );
};

export default SignInForm;
