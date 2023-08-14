"use client";
import { ContactsRounded } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";

const Logo = ({ showSearch }: { showSearch: boolean }) => {
  const theme = useTheme();
 
  return (
    <Grid
      xs={!showSearch ? 12 : 0}
      sm={!showSearch ? 12 : 0}
      md={!showSearch ? 12 : 6}
      sx={{
        m: "auto 0",
      }}
    >
      <Box
        display="flex"
        justifyContent={(!showSearch && "center") as string}
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
        <Link href="/" style={{ textDecoration: "none", cursor: "pointer" }}>
          <h1
            style={{
              display: "inline",
              color: theme.palette.text.primary,
              fontSize: "20px",
              fontWeight: "lighter",
            }}
          >
            <ContactsRounded fontSize="medium" color="primary" /> وب اپلیکیشن
            مدیریت{" "}
            <span style={{ color: theme.palette.primary.main }}>مخاطبین</span>
          </h1>
        </Link>
      </Box>
    </Grid>
  );
};

export default Logo;
