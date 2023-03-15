"use client";
import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import Link from "next/link";
import { Dispatch } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Contact } from "../../services/contactServices";
import addContactValidation from "../../validations/addContactValidation";

const initialValues = {
  fullname: "",
  email: "",
  job: "",
  phone: 0,
  image: "",
};

const EditContactForm = ({
  setImageSrc,
  contact,
  setImageUploaded,
}: {
  setImageSrc: Dispatch<string | undefined>;
  setImageUploaded: Dispatch<boolean>;
  contact: Contact | undefined;
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(addContactValidation),
    onSubmit(values) {},
  });

  return (
    <Grid xs={12} sm={12} md={8} lg={8} p={1}>
      <Box width="100%" display="flex" flexDirection="column" gap={1}>
        <TextField
          label="نام و نام خانوادگی"
          defaultValue={contact?.fullname}
        />
        <TextField label="آدرس تصویر" defaultValue={contact?.image} />
        <TextField
          label="شماره موبایل"
          type="number"
          defaultValue={+contact?.phone.replace("+", " ")!}
        />
        <TextField label="آدرس ایمیل" defaultValue={contact?.email} />
        <Box display="flex" alignItems="center" gap={2}>
          <TextField label="شغل" defaultValue={contact?.job} />
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: "20px", p: 0 }}
          >
            <label
              htmlFor="image"
              style={{
                padding: "5px 10px 5px 10px",
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            >
              <input
                id="image"
                type="file"
                accept=".jpg, .jpeg, .png"
                name="image"
                style={{ display: "none" }}
                onChange={(e) => {
                  e.target.files &&
                    setImageSrc(URL.createObjectURL(e.target.files[0]));
                  setImageUploaded(true);
                }}
              />
              آپلود تصویر
            </label>
          </Button>
        </Box>
        <Box display="flex" gap={1} width="100%">
          <Link
            href="/"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ borderRadius: "20px" }}
            >
              انصراف
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "20px" }}
          >
            ویرایش مخاطب
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default EditContactForm;
