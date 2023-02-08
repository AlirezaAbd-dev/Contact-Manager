import "../styles/globals.css"
import "../assets/css/style.css"
import MainLayout from "@/layouts/MainLayout";

import {getAllContacts} from "@/services/contactServices";

const Layout = async ({ children }) => {
    const data =await getAllContacts()
  return (
    <html lang="fa">
      <head />
      <body dir="rtl">
        <MainLayout data={data}>{children}</MainLayout>
      </body>
    </html>
  );
};

export default Layout;
