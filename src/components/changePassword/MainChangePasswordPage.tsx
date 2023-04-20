"use client";
import { Typography } from "@mui/material";
import React from "react";
import MainContainer from "../../containers/MainContainer";
import SignInCard from "../signIn/SignInCard";
import ChangePasswordForm from "./ChangePasswordForm";

export default function MainChangePasswordPage({ token }: { token: string }) {
  return (<></>
    // <MainContainer>
    //   <SignInCard>
    //     <Typography variant="h5" mt={2}>
    //       تغییر رمز عبور
    //     </Typography>

    //     {/* FORM */}
    //     <ChangePasswordForm token={token} />
    //   </SignInCard>
    // </MainContainer>
  );
}
