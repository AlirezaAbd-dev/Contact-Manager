"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CssBaseline, ThemeProvider } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

import { theme } from "./theme/theme";
import Header from "../components/navbar/Header";
import { contactType } from "../services/contactServices";
import { ToastContainer } from "react-toastify";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const MainLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <CssBaseline />
        <Header
          showSearch={pathname === "/"}
          showLogout={pathname === "/"}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {children}
      </CacheProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
