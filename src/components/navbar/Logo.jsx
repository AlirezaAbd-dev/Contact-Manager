"use client"
import { ContactsRounded } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const Logo = ({ showSearch }) => {
  const theme = useTheme();

  return (
    <Grid
      xs={!showSearch ? 12 : 0}
      sm={!showSearch ? 12 : 0}
      md={!showSearch ? 12 : 6}
    >
      <Box
        display="flex"
        justifyContent={!showSearch && "center"}
        width="100%"
        sx={{
          ...(showSearch
            ? {
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                },
              }
            : { display: "flex" }),
        }}
      >
        <Typography display="inline" variant="h6" color="text.primary">
          <ContactsRounded fontSize="10px" color="primary" /> وب اپلیکیشن مدیریت{" "}
          <span style={{ color: theme.palette.primary.main }}>مخاطبین</span>
        </Typography>
      </Box>
    </Grid>
  );
};

export default Logo;
