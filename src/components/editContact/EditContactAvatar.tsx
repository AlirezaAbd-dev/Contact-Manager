"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import {
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useSWRMutation from "swr/mutation";

import avatarPlaceholder from "../../assets/placeholder-avatar.png";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Contact, uploadImageMutation } from "../../services/contactServices";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { KeyedMutator } from "swr";
import { AxiosProgressEvent } from "axios";

const EditContactAvatar = ({
  avatarSrc,
  alt,
  imageUploaded,
  image,
  uploadedFile,
  contactId,
  setImageUploaded,
  mutate,
}: {
  avatarSrc?: string;
  alt?: string;
  imageUploaded: boolean;
  image?: string;
  uploadedFile?: FileList | null;
  contactId: number;
  setImageUploaded: Dispatch<SetStateAction<boolean>>;
  mutate: KeyedMutator<{
    contact: Contact;
  } | null>;
}) => {
  const token = useLocalStorage("user-token");

  const [isLoadingSrc, setIsLoadingSrc] = useState<string | null>();
  const [imageUploadedProgress, setImageUploadedProgress] = useState(0);

  const router = useRouter();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { trigger, data, error, isMutating } = useSWRMutation(
    [
      `/api/imageUpload/${contactId}`,
      token,
      (e: AxiosProgressEvent) => {
        if (e.total) {
          setImageUploadedProgress(Math.floor((e.loaded / e.total) * 100));
        }
      },
    ],
    uploadImageMutation
  );

  useEffect(() => {
    if (error) {
      toast.error(error?.response?.data?.message);
      setImageUploadedProgress(0);

      if (error.response.statusCode === 401) {
        router.replace("/signIn");
      }
    }
  }, [error]);

  useEffect(() => {
    if (data?.data) {
      toast.success("عکس شما با موفقیت ثبت شد");
      setImageUploaded(false);
      mutate();
    }
  }, [data]);

  const onClickHandler = () => {
    const files = new FormData();
    // @ts-ignore
    files.append("image", uploadedFile);

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
        <>
          <LoadingButton
            loadingIndicator={<CircularProgress size={20} />}
            loading={isMutating}
            onClick={onClickHandler}
            sx={{ borderRadius: "20px" }}
          >
            ثبت عکس پروفایل
          </LoadingButton>
          <Typography variant="caption" color="primary" sx={{ mt: -2 }}>
            {imageUploadedProgress !== 0 && imageUploadedProgress + "%"}
          </Typography>
        </>
      )}
    </Grid>
  );
};

export default EditContactAvatar;
