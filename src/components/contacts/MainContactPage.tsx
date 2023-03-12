"use client";
import { lazy } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import AddContactButton from "./AddContactButton";
import MainContainer from "../../containers/MainContainer";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import ContactsPagination from "./ContactsPagination";
import { ContactsPaginatedType } from "../../services/contactServices";

const ContactCard = lazy(() => import("./ContactCard"));

import NotFoundGif from "../ui/NotFoundGif";
import useLocalStorage from "../../hooks/useLocalStorage";
import { toast } from "react-toastify";

const URL = process.env.NEXT_PUBLIC_API_URL!;

const fetcher = ([url, token]: [string, string]) => {
  if (token) {
    return axios
      .get(url, {
        headers: {
          "x-authentication-token": token,
        },
      })
      .then((res) => res.data);
  } else {
    null;
  }
};

const MainContactPage = () => {
  const token = useLocalStorage("user-token");

  const searchParams = useSearchParams();

  let pageQuery = searchParams?.get("page");

  const {
    data,
    error,
  }: { data: ContactsPaginatedType; error: any; isLoading: boolean } = useSWR(
    [`${URL}/api/contacts?page=${pageQuery || 1}`, token],
    fetcher
  );

  if (error) {
    toast.error(error.response.data.message);
  }

  return (
    <MainContainer>
      {/* ADD CONTACT BUTTON */}
      <AddContactButton />

      {/* CONTACTS CARDS */}
      <Box width="100%" pt={5}>
        <Grid container>
          {data?.contacts?.map((user) => (
            <ContactCard key={user._id} user={user} />
          ))}

          {data?.contacts.length === 0 && (
            <>
              {/* LOADING GIF */}
              <NotFoundGif />
            </>
          )}
        </Grid>
      </Box>
      {data?.contacts.length >= 12 && (
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
