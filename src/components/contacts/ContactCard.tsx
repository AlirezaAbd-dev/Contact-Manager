"use client";
import React, { useRef, useState } from "react";
import {
  ArrowLeftRounded,
  Delete,
  Edit,
  RemoveRedEye,
} from "@mui/icons-material";
import {
  Card as CardItem,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Typography,
  CardActions,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { grey } from "@mui/material/colors";

import { useStore } from "../../zustand/store";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import { contactType } from "../../services/contactServices";

const ContactCard = ({
  user: { username, avatar, name, phone, email, id },
}: {
  user: contactType;
}) => {
  const setIsModalOpen = useStore((state) => state.setIsModalOpen);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  imageRef.current.src = avatar;
  imageRef.current.onload = () => {
    setImageIsLoaded(true);
  };

  return (
    <Grid xs={12} sm={12} md={4} lg={4} xl={4} mb={5}>
      <CardItem
        sx={{
          bgcolor: "card.main",
          maxWidth: {
            xs: "100%",
            sm: "85%",
          },
          m: "0 auto",
        }}
      >
        <CardActionArea>
          <CardContent>
            <CardMedia
              sx={{
                width: "100%",
                height: 200,
                mb: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {!imageIsLoaded ? (
                <Skeleton
                  variant="rectangular"
                  animation={false}
                  sx={{
                    width: "100%",
                    height: "200px",
                  }}
                />
              ) : (
                <Image
                  ref={imageRef}
                  src={avatar}
                  alt={username}
                  width={400}
                  height={200}
                  priority
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </CardMedia>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              bgcolor="accent.main"
              width="100%"
              p={1}
              overflow="hidden"
              gap={0.5}
            >
              <Typography display="inline" variant="body2" color="black">
                <ArrowLeftRounded fontSize="medium" color="error" />
                نام و نام خانوادگی :{" "}
                <span style={{ fontWeight: "bold" }}>{name}</span>
              </Typography>
              <Divider color={grey[600]} sx={{ width: "100%" }} />
              <Typography display="inline" variant="body2" color="black">
                <ArrowLeftRounded fontSize="medium" color="error" />
                شماره موبایل :{" "}
                <span style={{ fontWeight: "bold" }}>
                  {phone.replace("+", "")}
                </span>
              </Typography>
              <Divider color={grey[600]} sx={{ width: "100%" }} />
              <Typography display="inline" variant="body2" color="black">
                <ArrowLeftRounded fontSize="medium" color="error" />
                ایمیل : <span style={{ fontWeight: "bold" }}>{email}</span>
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box display="flex" justifyContent="center" width="100%" gap={2}>
            {/* BUTTONS */}
            <Tooltip arrow title="حذف مخاطب">
              <Button color="error" onClick={setIsModalOpen}>
                <Delete />
              </Button>
            </Tooltip>

            <Tooltip arrow title="ویرایش مخاطب">
              <Link href={`/editContact/${id}`}>
                <Button color="warning">
                  <Edit />
                </Button>
              </Link>
            </Tooltip>

            <Tooltip arrow title="جزئیات">
              <Link href={`/contact/${id}`}>
                <Button color="info">
                  <RemoveRedEye />
                </Button>
              </Link>
            </Tooltip>
          </Box>
        </CardActions>
      </CardItem>
    </Grid>
  );
};

export default ContactCard;
