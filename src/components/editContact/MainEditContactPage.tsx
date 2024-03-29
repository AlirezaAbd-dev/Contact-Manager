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
import { useRouter } from "next/navigation";

const MainEditContactPage = ({ id }: { id: number }) => {
  const token = useLocalStorage("user-token");

  const [imageSrc, setImageSrc] = useState<string>();
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<FileList | null>();

  const theme = useTheme();
  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWR(
    [`/api/contact/${id}`, token],
    getSingleContactFetcher
  );

  const onUploadFile = (file: FileList) => {
    setUploadedFile(file);
  };

  useEffect(() => {
    if (data && data.contact.image) {
      setImageSrc(data.contact.image);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.response.data.message);

      if (error.response.status === (404 || 401)) {
        router.push("/");
      }
    }
  }, [error, router]);

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
                image={data.contact.image}
                avatarSrc={imageSrc!}
                alt={data.contact.fullname!}
                imageUploaded={imageUploaded}
                setImageUploaded={setImageUploaded}
                uploadedFile={uploadedFile}
                contactId={id}
                mutate={mutate}
              />

              {/* FORM */}
              <EditContactForm
                setImageSrc={setImageSrc}
                setImageUploaded={setImageUploaded}
                contact={data?.contact}
                token={token}
                contactId={id}
                setUploadedFile={onUploadFile}
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
