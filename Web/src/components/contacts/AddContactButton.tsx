"use client";

import { AddCircleRounded } from "@mui/icons-material";
import { Box, Button, Slide } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

const AddContactButton = () => {
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    setButtonLoading(true);

    return () => {
      setButtonLoading(false);
    };
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: {
          xs: "center",
          sm: "center",
          md: "flex-start",
        },
      }}
    >
      <Slide
        direction="left"
        in={buttonLoading}
        style={{
          transitionDelay: buttonLoading ? "300ms" : "0ms",
        }}
      >
        <Link style={{ textDecoration: "none" }} href="/addContact">
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: "20px" }}
          >
            ساخت مخاطب جدید <AddCircleRounded sx={{ mx: 1 }} />
          </Button>
        </Link>
      </Slide>
    </Box>
  );
};

export default AddContactButton;
