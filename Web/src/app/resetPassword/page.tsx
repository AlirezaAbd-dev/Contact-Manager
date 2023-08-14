import { Metadata } from "next";
import MainResetPasswordPage from "../../components/resetPassword/MainResetPasswordPage";

export const metadata: Metadata = {
  title: "مدیریت مخاطبین | فراموشی رمز عبور",
  description:
    "از طریق این صفحه میتوانید رمز عبور خود را در صورت فراموشی بازیابی کنید.",
};

const ResetPassword = async () => {
  return <MainResetPasswordPage />;
};

export default ResetPassword;
