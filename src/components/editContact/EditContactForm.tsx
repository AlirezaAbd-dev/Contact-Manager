"use client";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import Link from "next/link";
import { Dispatch, useEffect } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import useSWRMutation from "swr/mutation";

import { Contact, editContactMutation } from "../../services/contactServices";
import addContactValidation from "../../validations/addContactValidation";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EditContactForm = ({
  setImageSrc,
  contact,
  setImageUploaded,
  token,
  contactId,
}: {
  setImageSrc: Dispatch<string | undefined>;
  setImageUploaded: Dispatch<boolean>;
  contact: Contact;
  token: string | undefined;
  contactId: number;
}) => {
  const { trigger, isMutating, error, data } = useSWRMutation(
    [`/api/contact/${contactId}`, token],
    editContactMutation
  );

  const router = useRouter();

  useEffect(() => {
    if (data) {
      toast.success("مخاطب مورد نظر با موفقیت ویرایش شد");
      router.push("/");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.response.data.message);
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      fullname: contact.fullname,
      email: contact.email || undefined,
      job: contact.job || undefined,
      image: contact.image || undefined,
      phone: +contact.phone,
    },
    validationSchema: toFormikValidationSchema(addContactValidation),
    onSubmit(values) {
      console.log(values);
      trigger({
        fullname: values.fullname,
        phone: values.phone.toString(),
        email: values.email || undefined,
        job: values.job || undefined,
        image: values.image || undefined,
      });
    },
  });

  return (
    <Grid xs={12} sm={12} md={8} lg={8} p={1}>
      <form onSubmit={formik.handleSubmit}>
        <Box width="100%" display="flex" flexDirection="column" gap={1}>
          <TextField
            name="fullname"
            label="نام و نام خانوادگی"
            defaultValue={contact?.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullname && !!formik.errors.fullname}
            helperText={formik.touched.fullname && formik.errors.fullname}
          />
          <TextField
            name="image"
            label="آدرس تصویر"
            defaultValue={contact?.image}
            onBlur={formik.handleBlur}
            error={formik.touched.image && !!formik.errors.image}
            helperText={formik.touched.image && formik.errors.image}
          />
          <TextField
            name="phone"
            label="شماره موبایل"
            type="number"
            defaultValue={+contact?.phone.replace("+", " ")!}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && !!formik.errors.phone}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            name="email"
            label="آدرس ایمیل"
            defaultValue={contact?.email}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              name="job"
              label="شغل"
              defaultValue={contact?.job}
              onBlur={formik.handleBlur}
              error={formik.touched.job && !!formik.errors.job}
              helperText={formik.touched.job && formik.errors.job}
            />
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
            <LoadingButton
              variant="contained"
              color="primary"
              sx={{ borderRadius: "20px" }}
              type="submit"
              loading={isMutating}
              loadingIndicator={<CircularProgress size={20} />}
            >
              ویرایش مخاطب
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Grid>
  );
};

export default EditContactForm;
