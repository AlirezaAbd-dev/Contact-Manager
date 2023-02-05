import { Typography } from "@mui/material";
import MainContainer from "@/containers/MainContainer";
import { useState } from "react";
import SignInCard from "@/components/signIn/SignInCard";
import SignInTabs from "@/components/signIn/SignInTabs";
import SignInForm from "@/components/signIn/SignInForm";

const SignIn = () => {
  const [page, setPage] = useState(0);

  const pageHandler = (_e, newValue) => {
    setPage(newValue);
  };

  return (
    <MainContainer>
      <SignInCard>
        {/* TABS */}
        <SignInTabs page={page} pageHandler={pageHandler} />

        <Typography variant="h5" mt={2}>
          {page === 0 ? "ورود" : "ثبت نام"}
        </Typography>

        {/* FORM */}
        <SignInForm page={page} />
      </SignInCard>
    </MainContainer>
  );
};

export default SignIn;
