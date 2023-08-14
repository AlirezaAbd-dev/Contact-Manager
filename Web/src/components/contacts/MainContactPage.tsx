"use client";
import { lazy } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, useTheme } from "@mui/material";
import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import { Triangle } from "react-loader-spinner";

import AddContactButton from "./AddContactButton";
import MainContainer from "../../containers/MainContainer";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import ContactsPagination from "./ContactsPagination";
import { getPaginatedContactsFetcher } from "../../services/contactServices";

const ContactCard = lazy(() => import("./ContactCard"));

import NotFoundGif from "../ui/NotFoundGif";
import useLocalStorage from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";

const MainContactPage = () => {
  const theme = useTheme();
  const token = useLocalStorage("user-token");

  const searchParams = useSearchParams();
  const router = useRouter();

  let pageQuery = searchParams?.get("page");

  const { data, error, isLoading } = useSWR(
    [`/api/contacts?page=${pageQuery || 1}`, token],
    getPaginatedContactsFetcher
  );

  if (error) {
    toast.error(error.response.data.message);
    if (error.response.status === 401) {
      router.replace("/signIn");
    }
  }

  return (
    <MainContainer>
      {/* ADD CONTACT BUTTON */}
      <AddContactButton />

      {/* CONTACTS CARDS */}
      <Box width="100%" pt={5}>
        <Grid container display="flex" justifyContent="center">
          {data?.contacts?.map((user) => (
            <ContactCard key={user._id} user={user} />
          ))}

          {isLoading && (
            <Triangle
              height="150"
              width="150"
              color={theme.palette.primary.main}
              ariaLabel="triangle-loading"
              visible={true}
            />
          )}

          {data?.contacts.length === 0 && (
            <>
              {/* LOADING GIF */}
              <NotFoundGif />
            </>
          )}
        </Grid>
      </Box>
      {data?.contacts?.length && data?.contacts.length >= 12 && (
        <ContactsPagination
          page={pageQuery ? +pageQuery : 1}
          count={data?.pagesNumber}
        />
      )}
      <DeleteConfirmDialog />
    </MainContainer>
  );
};

export default MainContactPage;
