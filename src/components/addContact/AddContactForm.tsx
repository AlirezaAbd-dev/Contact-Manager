"use client"
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";

const groups = [
  {
    value: 0,
    label: "همکار",
  },
  {
    value: 1,
    label: "دوست",
  },
  {
    value: 2,
    label: "فامیل",
  },
  {
    value: 3,
    label: "سرویس",
  },
  {
    value: 4,
    label: "آشنا",
  },
];

const AddContactForm = () => {
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    setFormLoading(true);

    return () => {
      setFormLoading(false);
    };
  }, []);

  return (
    <Slide
      direction="left"
      in={formLoading}
      style={{
        transitionDelay: formLoading ? "400ms" : "0ms",
      }}
    >
      <Grid xs={12} sm={12} md={7}>
        <Box display="flex" flexDirection="column" gap={2} mt={2} px={5}>
          <TextField label="نام و نام خانوادگی" />
          <TextField label="آدرس تصویر" />
          <TextField label="شماره موبایل" />
          <TextField label="آدرس ایمیل" />
          <Box display="flex" gap={2}>
            <TextField label="شغل" />
            <TextField
              select
              label="انتخاب گروه"
              SelectProps={{
                native: true,
              }}
            >
              {groups.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </TextField>
          </Box>
          <Box
            width="100%"
            display="flex"
            justifyContent="flex-start"
            gap={1}
            mb={4}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
              }}
            >
              <Button variant="contained" color="error">
                انصراف
              </Button>
            </Link>
            <Button variant="contained">ساخت مخاطب</Button>
          </Box>
        </Box>
      </Grid>
    </Slide>
  );
};

export default AddContactForm;