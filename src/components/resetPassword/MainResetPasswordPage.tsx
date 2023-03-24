"use client";
import { Typography } from "@mui/material";

import MainContainer from "../../containers/MainContainer";
import SignInCard from "../signIn/SignInCard";
import ResetPasswordForm from "./ResetPasswordForm";

const MainSignInPage = () => {
  return (
    <MainContainer>
      <SignInCard>
        <Typography variant="h5" mt={2}>
          فراموشی رمز عبور
        </Typography>

        {/* FORM */}
        <ResetPasswordForm />
      </SignInCard>
    </MainContainer>
  );
};

export default MainSignInPage;
