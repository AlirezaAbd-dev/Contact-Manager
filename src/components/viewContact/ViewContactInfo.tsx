"use client";
import { Box, Divider, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const ViewContactInfo = ({ contact }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      bgcolor="accent.main"
      borderRadius={2}
      m={0}
      mt={2}
      sx={{ overflowX: "hidden" }}
    >
      <Typography
        variant="h1"
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
        px={1}
        py={2}
        textAlign="center"
      >
        <Typography display="inline" variant="body2" color="black">
          نام و نام خانوادگی :{" "}
          <span style={{ fontWeight: "bold" }}>{contact.name}</span>
        </Typography>
        <Divider width="100%" color={grey[600]} />
        <Typography display="inline" variant="body2" color="black">
          شماره موبایل :{" "}
          <span style={{ fontWeight: "bold" }}>{contact.phone.replace("+",' ')}</span>
        </Typography>
        <Divider width="100%" color={grey[600]} />
        <Typography display="inline" variant="body2" color="black">
          ایمیل : <span style={{ fontWeight: "bold" }}>{contact.email}</span>
        </Typography>
        <Divider width="100%" color={grey[600]} />
        <Typography display="inline" variant="body2" color="black">
          شغل : <span style={{ fontWeight: "bold" }}>{contact.company}</span>
        </Typography>
        <Divider width="100%" color={grey[600]} />
        <Typography display="inline" variant="body2" color="black">
          گروه : <span style={{ fontWeight: "bold" }}>همکار</span>
        </Typography>
      </Typography>
    </Box>
  );
};

export default ViewContactInfo;
