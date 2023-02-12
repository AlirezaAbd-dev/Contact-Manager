"use client"
import { AppBar, Slide, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";

const NavbarContainer = (props) => {
  const [appBarLoading, setAppBarLoading] = useState(false);

  useEffect(() => {
    setAppBarLoading(true);

    return () => {
      setAppBarLoading(false);
    };
  }, []);

  return (
    <Slide
      direction="down"
      in={appBarLoading}
      style={{
        transitionDelay: appBarLoading ? "200ms" : "0ms",
      }}
    >
      <AppBar
        enableColorOnDark
        position="sticky"
        sx={{
          boxShadow: "10px 0 50px",
        }}
      >
        <Toolbar
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            "&.MuiToolbar-root": {
              px: 0,
              bgcolor: "navbar.main",
            },
          }}
        >{props.children}</Toolbar>
      </AppBar>
    </Slide>
  );
};

export default NavbarContainer;
