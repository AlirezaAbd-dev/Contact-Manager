import "../styles/globals.css"
import "../assets/css/style.css"
import MainLayout from "@/layouts/MainLayout";

const Layout = ({ children }) => {
  return (
    <html lang="fa">
      <head />
      <body dir="rtl">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
};

export default Layout;
