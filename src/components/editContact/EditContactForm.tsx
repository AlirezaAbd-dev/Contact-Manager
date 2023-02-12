"use client";
import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { contactType } from "../../services/contactServices";

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

const EditContactForm = ({ contact }: { contact: contactType }) => {
  return (
    <Grid xs={12} sm={12} md={8} lg={8} p={1}>
      <Box width="100%" display="flex" flexDirection="column" gap={1}>
        <TextField label="نام و نام خانوادگی" defaultValue={contact.name} />
        <TextField label="آدرس تصویر" defaultValue={contact.avatar} />
        <TextField
          label="شماره موبایل"
          defaultValue={contact.phone.replace("+", " ")}
        />
        <TextField label="آدرس ایمیل" defaultValue={contact.email} />
        <Box display="flex" gap={2}>
          <TextField label="شغل" defaultValue={contact.company} />
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
        <Box display="flex" gap={1} width="100%">
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
          <Button variant="contained" color="primary">
            ویرایش مخاطب
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default EditContactForm;
