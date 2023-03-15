"use client";
import { Box, useTheme } from "@mui/material";
import { yellow } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import useSWR from "swr";

import EditContactSideImage from "../ui/EditContactSideImage";
import EditContactForm from "../editContact/EditContactForm";
import EditContactAvatar from "../editContact/EditContactAvatar";
import EditContactCard from "../editContact/EditContactCard";
import AddContactTitle from "../ui/AddContactTitle";
import MainContainer from "../../containers/MainContainer";
import useLocalStorage from "../../hooks/useLocalStorage";
import { getSingleContactFetcher } from "../../services/contactServices";
import { toast } from "react-toastify";
import { Triangle } from "react-loader-spinner";

const MainEditContactPage = ({ id }: { id: number }) => {
  const token = useLocalStorage("user-token");

  const [imageSrc, setImageSrc] = useState<string>();
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);

  const theme = useTheme();

  const { data, error, isLoading } = useSWR(
    [`/api/contact/${id}`, token],
    getSingleContactFetcher
  );

  useEffect(() => {
    if (data && data.contact.image) {
      setImageSrc(data.contact.image);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.response.data.message);
    }
  }, [error]);

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
        {isLoading && (
          <Triangle
            height="150"
            width="150"
            color={theme.palette.primary.main}
            ariaLabel="triangle-loading"
            visible={true}
          />
        )}
        {data && (
          <EditContactCard>
            <Grid container width="100%" p={1}>
              {/* AVATAR */}
              <EditContactAvatar
                avatarSrc={imageSrc!}
                alt={data.contact.fullname!}
                imageUploaded={imageUploaded}
              />

              {/* FORM */}
              <EditContactForm
                setImageSrc={setImageSrc}
                setImageUploaded={setImageUploaded}
                contact={data?.contact}
                token={token}
                contactId={id}
              />
            </Grid>
          </EditContactCard>
        )}

        {/* SIDE IMAGE */}
        <EditContactSideImage />
      </Box>
    </MainContainer>
  );
};

export default MainEditContactPage;
