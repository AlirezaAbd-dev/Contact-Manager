"use client"
import { Box } from "@mui/material";
import { yellow } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2";

import EditContactSideImage from "../ui/EditContactSideImage";
import EditContactForm from "../editContact/EditContactForm";
import EditContactAvatar from "../editContact/EditContactAvatar";
import EditContactCard from "../editContact/EditContactCard";
import AddContactTitle from "../ui/AddContactTitle";
import MainContainer from "../../containers/MainContainer";

const MainEditContactPage = ({data}) => {
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
            <EditContactAvatar avatarSrc={data.avatar} alt={data.username}/>

            {/* FORM */}
            <EditContactForm contact={data}/>
          </Grid>
        </EditContactCard>

        {/* SIDE IMAGE */}
        <EditContactSideImage />
      </Box>
    </MainContainer>
  );
};

export default MainEditContactPage;
