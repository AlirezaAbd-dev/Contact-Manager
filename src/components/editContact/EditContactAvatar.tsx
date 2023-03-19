"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import { CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import useSWRMutation from "swr/mutation";

import avatarPlaceholder from "../../assets/placeholder-avatar.png";
import useLocalStorage from "../../hooks/useLocalStorage";
import { uploadImageMutation } from "../../services/contactServices";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const EditContactAvatar = ({
  avatarSrc,
  alt,
  imageUploaded,
  image,
  uploadedFile,
  contactId,
  setImageUploaded,
}: {
  avatarSrc?: string;
  alt?: string;
  imageUploaded: boolean;
  image?: string;
  uploadedFile?: FileList | null;
  contactId: number;
  setImageUploaded: Dispatch<SetStateAction<boolean>>;
}) => {
  const token = useLocalStorage("user-token");

  const [isLoadingSrc, setIsLoadingSrc] = useState<string | null>();

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { trigger, data, error, isMutating } = useSWRMutation(
    [`/api/imageUpload/${contactId}`, token],
    uploadImageMutation
  );

  useEffect(() => {
    if (error) {
      toast.error(error.response.data.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast.success("عکس شما با موفقیت ثبت شد");
      setImageUploaded(false);
    }
  }, [data]);

  const onClickHandler = () => {
    const files = new FormData();
    // @ts-ignore
    files.set("image", uploadedFile);

    trigger(files);
  };

  const skeleton = (
    <Skeleton
      variant="circular"
      animation="wave"
      sx={{
        width: {
          xs: 150,
          sm: 200,
          md: 250,
        },
        height: {
          xs: 150,
          sm: 200,
          md: 250,
        },
        m: "0 auto",
      }}
    />
  );

  return (
    <Grid
      xs={12}
      sm={12}
      md={4}
      lg={4}
      p={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      {!avatarSrc && image && skeleton}
      {image || imageUploaded ? (
        <Image
          priority
          src={avatarSrc!}
          alt={alt!}
          width={500}
          height={500}
          style={{
            display: isLoadingSrc && avatarSrc ? "block" : "none",
            borderRadius: "100%",
            width: isSmDown ? "70%" : "100%",
            height: "auto",
            objectFit: "cover",
            margin: "0 auto",
            aspectRatio: "1 / 1",
          }}
          onLoad={() => {
            setIsLoadingSrc(avatarSrc);
          }}
        />
      ) : (
        <Image
          priority
          src={avatarPlaceholder.src}
          alt={alt!}
          width={500}
          height={500}
          style={{
            display: "block",
            borderRadius: "100%",
            width: isSmDown ? "70%" : "100%",
            height: "auto",
            objectFit: "cover",
            margin: "0 auto",
            aspectRatio: "1 / 1",
          }}
        />
      )}
      {imageUploaded && (
        <LoadingButton
          loadingIndicator={<CircularProgress size={20} />}
          loading={isMutating}
          onClick={onClickHandler}
          sx={{ borderRadius: "20px" }}
        >
          ثبت عکس پروفایل
        </LoadingButton>
      )}
    </Grid>
  );
};

export default EditContactAvatar;
