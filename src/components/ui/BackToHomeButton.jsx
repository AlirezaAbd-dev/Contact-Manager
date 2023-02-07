"use client";
import { Button } from "@mui/material";
import Link from "next/link";

const BackToHomeButton = () => {
  return (
    <Link
      href="/"
      style={{
        textDecoration: "none",
      }}
      prefetch={false}
    >
      <Button
        variant="contained"
        color="secondary"
        sx={{
          mt: 2,
        }}
      >
        بازگشت به صفحه اصلی
      </Button>
    </Link>
  );
};

export default BackToHomeButton;
