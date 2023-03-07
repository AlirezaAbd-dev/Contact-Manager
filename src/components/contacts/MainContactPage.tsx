"use client";
import { lazy } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";

import AddContactButton from "./AddContactButton";
import MainContainer from "../../containers/MainContainer";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import ContactsPagination from "./ContactsPagination";
import { contactType } from "../../services/contactServices";

const ContactCard = lazy(() => import("./ContactCard"));

import NotFoundGif from "../ui/NotFoundGif";

const MainContactPage = ({ data }: { data: contactType[] }) => {
  return (
    <MainContainer>
      {/* ADD CONTACT BUTTON */}
      <AddContactButton />

      {/* CONTACTS CARDS */}
      <Box width="100%" pt={5}>
        <Grid container>
          {data?.map((user) => (
            <ContactCard key={user.id} user={user} />
          ))}

          {!data ||
            (data === null && (
              <>
                {/* LOADING GIF */}
                <NotFoundGif />
              </>
            ))}
        </Grid>
      </Box>
      <ContactsPagination />
      <DeleteConfirmDialog />
    </MainContainer>
  );
};

export default MainContactPage;
