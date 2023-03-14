"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { useTheme } from "@mui/material";
import Image from "next/image";
import { useFormik } from "formik";
import addContactValidation from "../../validations/addContactValidation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import useSWRMutation from "swr/mutation";
import useLocalStorage from "../../hooks/useLocalStorage";
import { addContactMutation } from "../../services/contactServices";
import { toast } from "react-toastify";

const initialValues = {
  fullname: "",
  email: "",
  job: "",
  phone: 0,
  image: "",
};

const AddContactForm = () => {
  const token = useLocalStorage("user-token");

  const [formLoading, setFormLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<any>();

  const { trigger, isMutating, error, data } = useSWRMutation(
    ["/api/contact", token],
    addContactMutation
  );

  console.log(error);
  console.log(isMutating);
  console.log(data);

  const theme = useTheme();

  if (isMutating) {
    toast.loading("در حال ارسال درخواست به سرور", { isLoading: isMutating });
  }

  if (error) {
    toast.error(error.response.data.message);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(addContactValidation),
    onSubmit: (values) => {
      trigger({ ...values, phone: values.phone.toString() });
    },
  });

  useEffect(() => {
    setFormLoading(true);

    return () => {
      setFormLoading(false);
    };
  }, []);

  return (
    <Slide
      direction="left"
      in={formLoading}
      style={{
        transitionDelay: formLoading ? "400ms" : "0ms",
      }}
    >
      <Grid xs={12} sm={12} md={7}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 10,
            padding: "0 20px 0 20px",
          }}
          onSubmit={formik.handleSubmit}
        >
          {imageSrc && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Image
                src={imageSrc}
                alt="image"
                width={200}
                height={200}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />

              <Button>ثبت عکس پروفایل</Button>
            </Box>
          )}
          <TextField
            label="نام و نام خانوادگی"
            name="fullname"
            onChange={formik.handleChange}
            error={formik.touched.fullname && !!formik.errors.fullname}
            onBlur={formik.handleBlur}
            helperText={formik.touched.fullname && formik.errors.fullname}
          />
          <TextField
            label="آدرس تصویر"
            name="image"
            onChange={formik.handleChange}
            error={formik.touched.image && !!formik.errors.image}
            onBlur={formik.handleBlur}
            helperText={formik.touched.image && formik.errors.image}
          />
          <TextField
            label="شماره موبایل"
            type="number"
            name="phone"
            onChange={formik.handleChange}
            error={formik.touched.phone && !!formik.errors.phone}
            onBlur={formik.handleBlur}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            label="آدرس ایمیل"
            name="email"
            onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              label="شغل"
              name="job"
              onChange={formik.handleChange}
              error={formik.touched.job && !!formik.errors.job}
              onBlur={formik.handleBlur}
              helperText={formik.touched.job && formik.errors.job}
            />
            <label
              htmlFor="image"
              style={{
                backgroundColor: theme.palette.secondary.main,
                padding: "10px 18px 10px 18px",
                color: "#111",
                cursor: "pointer",
                borderRadius: 10,
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
                }}
              />
              آپلود تصویر
            </label>
          </Box>
          <Box
            width="100%"
            display="flex"
            justifyContent="flex-start"
            gap={1}
            mb={4}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
              }}
            >
              <Button variant="contained" color="error">
                انصراف
              </Button>
            </Link>
            <Button type="submit" variant="contained">
              ساخت مخاطب
            </Button>
          </Box>
        </form>
      </Grid>
    </Slide>
  );
};

export default AddContactForm;
