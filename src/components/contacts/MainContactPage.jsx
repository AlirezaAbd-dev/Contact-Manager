"use client";
import { Suspense, lazy } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";

import AddContactButton from "../contacts/AddContactButton";
import MainContainer from "../../containers/MainContainer";
import DeleteConfirmDialog from "../contacts/DeleteConfirmDialog";
import ContactsPagination from "../contacts/ContactsPagination";
import MainContactsCardSkeleton from "../Skeletons/MainContactsCardSkeleton";

const ContactCard = lazy(() => import("../contacts/ContactCard"));

import NotFoundGif from "../ui/NotFoundGif";

const MainContactPage = ({ data }) => {
  return (
    <MainContainer>
      {/* ADD CONTACT BUTTON */}
      <AddContactButton />

      {/* CONTACTS CARDS */}
      <Box width="100%" pt={5}>
        <Grid container>
          <Suspense
            fallback={
              <>
                <MainContactsCardSkeleton />
                <MainContactsCardSkeleton />
                <MainContactsCardSkeleton />
                <MainContactsCardSkeleton />
                <MainContactsCardSkeleton />
              </>
            }
          >
            {data.map((user) => (
              <ContactCard key={user.id} user={user} />
            ))}
          </Suspense>

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

export default MainContactPage;
