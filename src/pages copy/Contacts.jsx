import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";

import AddContactButton from "../components/contacts/AddContactButton";
import ContactCard from "../components/contacts/ContactCard";
import MainContainer from "../containers/MainContainer";
import DeleteConfirmDialog from "../components/contacts/DeleteConfirmDialog";
import ContactsPagination from "../components/contacts/ContactsPagination";
import MainContactsCardSkeleton from "../components/Skeletons/MainContactsCardSkeleton";

import NotFoundGif from "../components/ui/NotFoundGif";

const Contacts = () => {
  return (
    <MainContainer>
      {/* ADD CONTACT BUTTON */}
      <AddContactButton />

      {/* CONTACTS CARDS */}
      <Box width="100%" pt={5}>
        <Grid container>
          {true && (
            <>
              <ContactCard />
              <ContactCard />
              <ContactCard />
              <ContactCard />
              <ContactCard />
            </>
          )}

          {/* CONTACT CARD SKELETON */}
          {false && (
            <>
              <MainContactsCardSkeleton />
              <MainContactsCardSkeleton />
              <MainContactsCardSkeleton />
              <MainContactsCardSkeleton />
              <MainContactsCardSkeleton />
            </>
          )}

          {/* LOADING GIF */}
          {false && <NotFoundGif />}
        </Grid>
      </Box>
      <ContactsPagination />
      <DeleteConfirmDialog />
    </MainContainer>
  );
};

export default Contacts;
