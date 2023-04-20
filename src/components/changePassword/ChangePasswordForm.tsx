"use client";
import { Box, Button, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { changePasswordService } from "../../services/contactServices";
import { changePasswordValidation } from "../../validations/resetPasswordEmailValidation";

export default function ChangePasswordForm({ token }: { token: string }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: toFormikValidationSchema(changePasswordValidation),
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  const handleSubmit = useCallback(
    async (values: { password: string }) => {
      toast.promise(changePasswordService(values.password, token), {
        pending: "در حال بررسی",
        success: {
          render() {
            router.replace("/signIn");
            return "رمز عبور شما با موفقیت تغییر پیدا کرد";
          },
        },
        error: {
          render({ data }) {
            // @ts-ignore
            if (data.response.status === 401) {
              // router.replace("signIn");
            }
            // @ts-ignore
            return data.response.data.message;
          },
        },
      });
    },
    [token]
  );

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
          name="password"
          onChange={formik.handleChange}
          fullWidth
          error={!!formik.errors.password && formik.touched.password}
          helperText={formik.touched.password && formik.errors?.password}
          onBlur={formik.handleBlur}
          label="رمز عبور"
        />
        <TextField
          name="confirmPassword"
          onChange={formik.handleChange}
          fullWidth
          error={
            !!formik.errors.confirmPassword && formik.touched.confirmPassword
          }
          helperText={
            formik.touched.confirmPassword && formik.errors?.confirmPassword
          }
          onBlur={formik.handleBlur}
          label="تکرار رمز عبور"
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
            <li>رمز عبور جدید خود را وارد کنید</li>
            <li>رمز عبور و تکرار آن باید یکسان باشند</li>
            <li>پس از تغییر یافتن رمز عبور به صفحه ورود بازگردید</li>
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
        تغییر رمز عبور
      </Button>
    </form>
  );
}
