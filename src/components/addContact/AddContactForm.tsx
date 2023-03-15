"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import Image from "next/image";
import { CircularProgress, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import useSWRMutation from "swr/mutation";
import useLocalStorage from "../../hooks/useLocalStorage";
import { addContactMutation } from "../../services/contactServices";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

import addContactValidation from "../../validations/addContactValidation";

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
  const router = useRouter();

  const { trigger, isMutating, error, data } = useSWRMutation(
    ["/api/contact", token],
    addContactMutation
  );

  const theme = useTheme();

  if (data) {
    toast.success("مخاطب جدید با موفقیت ساخته شد");
    router.push("/");
  }

  useEffect(() => {
    if (error && !isMutating) {
      toast.error(error.response.data.message);
    }
  }, [error]);

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(addContactValidation),
    onSubmit: (values) => {
      trigger({
        fullname: values.fullname,
        email: values.email || undefined,
        job: values.job || undefined,
        phone: values.phone.toString(),
      });
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
            <Button
              variant="contained"
              color="secondary"
              sx={{ borderRadius: "20px" }}
            >
              <label htmlFor="image" style={{ padding: "3px 7px 3px 7px" }}>
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
            </Button>
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
              <Button
                variant="contained"
                color="error"
                sx={{ borderRadius: "20px" }}
              >
                انصراف
              </Button>
            </Link>
            <LoadingButton
              loading={isMutating}
              loadingIndicator={<CircularProgress size={20} />}
              type="submit"
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              ساخت مخاطب
            </LoadingButton>
          </Box>
        </form>
      </Grid>
    </Slide>
  );
};

export default AddContactForm;
