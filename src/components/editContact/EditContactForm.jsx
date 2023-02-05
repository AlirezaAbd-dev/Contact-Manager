import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";

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

const EditContactForm = () => {
  return (
    <Grid xs={12} sm={12} md={8} lg={8} p={1}>
              <Box width="100%" display="flex" flexDirection="column" gap={1}>
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
                <Box display="flex" gap={1} width="100%">
                  <Link
                    to="/"
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
