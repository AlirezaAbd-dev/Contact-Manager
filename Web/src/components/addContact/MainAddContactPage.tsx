"use client";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { green } from "@mui/material/colors";

import AddContactSideImage from "../ui/AddContactSideImage";
import AddContactForm from "./AddContactForm";
import AddContactTitle from "../ui/AddContactTitle";
import MainContainer from "../../containers/MainContainer";

const MainAddContactPage = () => {
  return (
    <MainContainer>
      {/* TITLE */}
      <AddContactTitle color={green[600]}>ساخت مخاطب جدید</AddContactTitle>
      <Grid container mt={2} width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              sm: "column-reverse",
              md: "row",
            },
            justifyContent: "space-between",
          }}
        >
          {/* FORM */}
          <AddContactForm />

          {/* SIDE IMAGE */}
          <AddContactSideImage />
        </Box>
      </Grid>
    </MainContainer>
  );
};

export default MainAddContactPage;
