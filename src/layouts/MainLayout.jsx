import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import Header from "@/components/navbar/Header";
import { useRouter } from "next/router";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const MainLayout = ({ children }) => {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <CssBaseline />
        <Header
          showSearch={router.pathname === "/" ? true : false}
          showLogout={router.pathname === "/" ? true : false}
        />
        {children}
      </CacheProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
