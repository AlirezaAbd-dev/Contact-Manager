import { Box } from "@mui/material";
import { yellow } from "@mui/material/colors";
import EditContactSideImage from "@/components/ui/EditContactSideImage";
import Grid from "@mui/material/Unstable_Grid2";
import EditContactForm from "@/components/editContact/EditContactForm";
import EditContactAvatar from "@/components/editContact/EditContactAvatar";
import EditContactCard from "@/components/editContact/EditContactCard";
import MainContainer from "@/containers/MainContainer";
import AddContactTitle from "@/components/ui/AddContactTitle";

const EditContact = () => {
  return (
    <MainContainer>
      {/* TITLE */}
      <AddContactTitle color={yellow[700]}>ویرایش مخاطب</AddContactTitle>

      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <EditContactCard>
          <Grid container width="100%" p={1}>
            {/* AVATAR */}
            <EditContactAvatar />

            {/* FORM */}
            <EditContactForm />
          </Grid>
        </EditContactCard>

        {/* SIDE IMAGE */}
        <EditContactSideImage />
      </Box>
    </MainContainer>
  );
};

export default EditContact;
