"use client";
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

const ContactCard = ({ user }) => {
  const setIsModalOpen = useStore((state) => state.setIsModalOpen);

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
            <Image
              src={user.avatar}
              alt={user.username}
              width={500}
              height={200}
              style={{
                height: 200,
                width: "100%",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
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
                <span style={{ fontWeight: "bold" }}>{user.name}</span>
              </Typography>
              <Divider width="100%" color={grey[600]} />
              <Typography display="inline" variant="body2" color="black">
                <ArrowLeftRounded fontSize="medium" color="error" />
                شماره موبایل :{" "}
                <span style={{ fontWeight: "bold" }}>
                  {user.phone.replace("+", "")}
                </span>
              </Typography>
              <Divider width="100%" color={grey[600]} />
              <Typography display="inline" variant="body2" color="black">
                <ArrowLeftRounded fontSize="medium" color="error" />
                ایمیل : <span style={{ fontWeight: "bold" }}>{user.email}</span>
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
              <Link href={`/editContact/${user.id}`} prefetch={false}>
                <Button color="warning">
                  <Edit />
                </Button>
              </Link>
            </Tooltip>

            <Tooltip arrow title="جزئیات">
              <Link href={`/contact/${user.id}`} prefetch={false}>
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
