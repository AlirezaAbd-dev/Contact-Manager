"use client";

import { useState, useCallback } from "react";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-toastify";

import loginValidation from "../../validations/loginValidation";
import { loginService, signInService } from "../../services/contactServices";
import Link from "next/link";
import { red } from "@mui/material/colors";

const initialValues = { email: "", password: "" };

const SignInForm = ({ page }: { page: number }) => {
  const [isPassword, setIsPassword] = useState(true);

  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(loginValidation),
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  const handleSubmit = useCallback(
    async (values: { email: string; password: string }) => {
      if (page === 1) {
        toast.promise(
          signInService(values.email, values.password).then((res) => {
            const token = res.headers["x-authentication-token"];
            localStorage.setItem("user-token", token);
            router.replace("/");
          }),
          {
            pending: "در حال ساخت حساب کاربری",
            success: "حساب شما با موفقیت ساخته شد",
            error: {
              render({ data }) {
                // @ts-ignore
                return data.response.data.message;
              },
            },
          }
        );
      } else {
        toast.promise(
          loginService(values.email, values.password).then((res) => {
            const token = res.headers["x-authentication-token"];
            localStorage.setItem("user-token", token);
            router.replace("/");
          }),
          {
            pending: "در حال ورود به حساب کاربری",
            success: "با موفقیت به حساب خود وارد شدید",
            error: {
              render({ data }) {
                // @ts-ignore
                return data.response.data.message;
              },
            },
          }
        );
      }
    },
    [page]
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
        my={2}
        mb={2}
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
        <TextField
          name="password"
          type={isPassword ? "password" : "text"}
          onChange={formik.handleChange}
          error={!!formik.errors.password && formik.touched.password}
          helperText={formik.touched.password && formik.errors?.password}
          onBlur={formik.handleBlur}
          fullWidth
          label="رمز عبور"
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setIsPassword((prev) => !prev)}>
                {!isPassword ? <RemoveRedEye /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <Box width="100%" textAlign="left">
          <Link
            href="/resetPassword"
            style={{ color: red[300], textDecoration: "none" }}
          >
            رمز عبور خود را فراموش کرده اید؟
          </Link>
        </Box>
      </Box>
      <Button type="submit" variant="contained" color="secondary">
        {page === 0 ? "ورود" : "ثبت نام"}
      </Button>
    </form>
  );
};

export default SignInForm;
