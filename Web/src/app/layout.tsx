import "../styles/globals.css";
import "../assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "../layouts/MainLayout";

import AnalyticsWrapper from "./Analytics";
import { Metadata } from "next";
import envSchema from "../../envSchema";

export const metadata: Metadata = {
  title: "مدیریت مخاطبین",
  viewport: "width=device-width, initial-scale=1",
  description:
    "به وبسایت مدیریت مخاطبین خوش آمدید. شما میتوانید از طریق این وبسایت مخاطبین خود را ذخیره و مدیریت کنید.",
  authors: [{ name: "علیرضا عابدی", url: "https://AlirezaAbd-dev.vercel.app" }],
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
  themeColor: { color: "#282a36" },
};

const Layout = async ({ children }) => {
  envSchema.parse(process.env);
  return (
    <html lang="fa">
      <body dir="rtl">
        <MainLayout>{children}</MainLayout>
        <AnalyticsWrapper />
      </body>
    </html>
  );
};

export default Layout;
