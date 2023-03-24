"use client";

import { useCallback } from "react";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { red } from "@mui/material/colors";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";
import Link from "next/link";

import { resetPasswordService } from "../../services/contactServices";
import resetPasswordEmailValidation from "../../validations/resetPasswordEmailValidation";

const SignInForm = () => {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: toFormikValidationSchema(resetPasswordEmailValidation),
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  const handleSubmit = useCallback(async (values: { email: string }) => {
    toast.promise(resetPasswordService(values.email), {
      pending: "در حال ارسال ایمیل",
      success: "ایمیل با موفقیت ارسال شد",
      error: {
        render({ data }) {
          // @ts-ignore
          return data.response.data.message;
        },
      },
    });
  }, []);

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        width="80%"
        my={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        <TextField
          name="email"
          onChange={formik.handleChange}
          fullWidth
          error={!!formik.errors.email && formik.touched.email}
          helperText={formik.touched.email && formik.errors?.email}
          onBlur={formik.handleBlur}
          label="ایمیل"
        />
        <Box width="100%" textAlign="left" mt={2} px={2}>
          <ul
            style={{
              fontSize: "14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 5,
            }}
          >
            <li>
              آدرس ایمیل خود را در فیلد بالا وارد کنید و روی دکمه ارسال ایمیل
              کلیک کنید
            </li>
            <li>بعد از ارسال شدن ایمیل روی دکمه تغییر رمز عبور کلیک کنید</li>
            <li>سپس رمز جدید خود را وارد کرده و دوباره وارد اکانت خود شوید</li>
            <li>
              اگر ایمیل ارسال شده برای شما نمایش داده نشد بخش هرزنامه ها را
              بررسی کنید
            </li>
          </ul>
        </Box>
        <Box width="100%" textAlign="left" mt={1}>
          <Link
            href="/signIn"
            style={{ color: red[300], textDecoration: "none" }}
          >
            بازگشت به صفحه ورود
          </Link>
        </Box>
      </Box>
      <Button type="submit" variant="contained" color="secondary">
        ارسال ایمیل
      </Button>
    </form>
  );
};

export default SignInForm;
