import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import AddContactSideImage from "../components/ui/AddContactSideImage";
import AddContactForm from "../components/addContact/AddContactForm";
import AddContactTitle from "../components/ui/AddContactTitle";
import { green } from "@mui/material/colors";
import MainContainer from "../containers/MainContainer";

const AddContact = () => {
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

export default AddContact;
