"use client"
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./theme/theme";
import rtlPlugin from "stylis-plugin-rtl";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import Header from "@/components/navbar/Header";
import {usePathname} from "next/navigation";

// Create rtl cache
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

const MainLayout = ({data, children}) => {
    const pathname = usePathname();

    return (
        <ThemeProvider theme={theme}>
            <CacheProvider value={cacheRtl}>
                <CssBaseline/>
                <Header
                    data={data}
                    showSearch={pathname === "/"}
                    showLogout={pathname === "/"}
                />
                {children}
            </CacheProvider>
        </ThemeProvider>
    );
};

export default MainLayout;
