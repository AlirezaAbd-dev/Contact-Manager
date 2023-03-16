"use client";
import React, { useState } from "react";
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
import NextImage from "next/image";
import Skeleton from "@mui/material/Skeleton";
import { Contact } from "../../services/contactServices";

import avatarPlaceholder from "../../assets/placeholder-avatar.png";

const ContactCard = ({
  user: { fullname, image, phone, email, _id },
}: {
  user: Contact;
}) => {
  const setIsModalOpen = useStore((state) => state.setIsModalOpen);
  const setSelectedContactId = useStore((state) => state.setSelectedContactId);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

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
          "&.MuiPaper-root": {
            borderRadius: "30px",
          },
          "& .muirtl-46bh2p-MuiCardContent-root": {
            p: 0,
          },
          "& .MuiCardContent-root": {
            p: 0,
          },
        }}
      >
        <CardActionArea>
          <CardContent>
            <CardMedia
              sx={{
                width: "100%",
                height: 250,
                mb: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {!avatarSrc && image && (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{
                    width: "100%",
                    height: "250px",
                    borderRadius: "30px",
                  }}
                />
              )}
              {image ? (
                <NextImage
                  src={image}
                  alt={fullname}
                  width={400}
                  height={250}
                  priority
                  style={{
                    width: avatarSrc ? "100%" : "0px",
                    height: avatarSrc ? "250px" : "0px",
                    objectFit: "cover",
                    borderRadius: "0 0 30px 30px",
                  }}
                  onLoad={() => {
                    setAvatarSrc(image);
                  }}
                />
              ) : (
                <NextImage
                  src={avatarPlaceholder.src}
                  alt={fullname}
                  width={400}
                  height={250}
                  priority
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "0 0 30px 30px",
                  }}
                />
              )}
            </CardMedia>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              bgcolor="accent.main"
              width="auto"
              p={1}
              m={1}
              borderRadius={6}
              overflow="hidden"
              gap={0.5}
            >
              <Typography display="inline" variant="body2" color="black">
                <ArrowLeftRounded fontSize="medium" color="error" />
                نام و نام خانوادگی :{" "}
                <span style={{ fontWeight: "bold" }}>{fullname}</span>
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
                ایمیل :{" "}
                <span style={{ fontWeight: "bold" }}>{email || "ندارد"}</span>
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box display="flex" justifyContent="center" width="100%" gap={2}>
            {/* BUTTONS */}
            <Tooltip arrow title="حذف مخاطب">
              <Button
                color="error"
                sx={{ borderRadius: "15px" }}
                onClick={() => {
                  setIsModalOpen();
                  setSelectedContactId(_id);
                }}
              >
                <Delete />
              </Button>
            </Tooltip>

            <Tooltip arrow title="ویرایش مخاطب">
              <Link href={`/editContact/${_id}`}>
                <Button color="warning" sx={{ borderRadius: "15px" }}>
                  <Edit />
                </Button>
              </Link>
            </Tooltip>

            <Tooltip arrow title="جزئیات">
              <Link href={`/contact/${_id}`}>
                <Button color="info" sx={{ borderRadius: "15px" }}>
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
