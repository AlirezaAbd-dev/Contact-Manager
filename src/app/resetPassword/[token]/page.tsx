import { Metadata } from "next";
import MainChangePasswordPage from "../../../components/changePassword/MainChangePasswordPage";

export const metadata: Metadata = {
  title: "مدیریت مخاطبین | تغییر رمز عبور",
  description:
    "از طریق این صفحه میتوانید رمز عبور خود را در صورت فراموشی بازیابی کنید.",
};
export default function ChangePassword({
  params: { token },
}: {
  params: { token: string };
}) {
  return <MainChangePasswordPage token={token} />;
}
