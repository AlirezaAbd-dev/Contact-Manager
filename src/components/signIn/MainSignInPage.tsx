"use client";
import { ChangeEvent, useState } from "react";
import { Typography } from "@mui/material";

import MainContainer from "../../containers/MainContainer";
import SignInCard from "./SignInCard";
import SignInTabs from "./SignInTabs";
import SignInForm from "./SignInForm";

const MainSignInPage = () => {
  const [page, setPage] = useState(0);

  const pageHandler = (_e: ChangeEvent, newValue: number) => {
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

export default MainSignInPage;
