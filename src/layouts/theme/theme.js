import { createTheme } from "@mui/material";

export const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
    primary: {
      main: "#BD93F9",
    },
    secondary: {
      main: "#F273BC",
    },
    accent: {
      main: "#b0b0b1",
    },
    greenAccent:{
      main:'#12ff23'
    },
    card: {
      main: "#44475a",
    },
    navbar: {
      main: "#282a36",
    },
    background: {
      default: "#282a36",
    },
  },
  typography: {
    fontFamily: "Vazir",
  },
});
