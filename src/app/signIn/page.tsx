import { Metadata } from "next";
import MainSignInPage from "../../components/signIn/MainSignInPage";

export const metadata: Metadata = {
  title: "مدیریت مخاطبین | صفحه ورود",
  description:
    "از طریق این صفحه میتوانید در وبسایت مدیریت مخاطبین ثبت نام کنید و یا به حساب خود وارد شوید.",
};

const SignIn = async () => {
  return <MainSignInPage />;
};

export default SignIn;
