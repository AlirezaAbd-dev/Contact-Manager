import axios from "axios";
import { Metadata } from "next";
import MainSignInPage from "../../components/signIn/MainSignInPage";

export const metadata: Metadata = {
  title: "مدیریت مخاطبین | صفحه ورود",
  description:
    "از طریق این صفحه میتوانید در وبسایت مدیریت مخاطبین ثبت نام کنید و یا به حساب خود وارد شوید.",
};

const signIn = async () => {
  await axios
    .post("http://localhost:3002/api/signIn")
    .then((res) => res.data)
    .catch((err) => console.log("error: ", err.response.data));
};

const SignIn = async () => {
  console.log(await signIn());

  return <MainSignInPage />;
};

export default SignIn;
