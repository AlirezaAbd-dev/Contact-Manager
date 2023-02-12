import { createTheme } from "@mui/material";


declare module "@mui/material/styles/createPalette" {
  interface Palette {
    accent: {
      main: string;
    };
    greenAccent: {
      main: string;
    };
    card: {
      main: string;
    };
    navbar: {
      main: string;
    };
  }
  interface PaletteOptions {
    accent?: {
      main?: string;
    };
    greenAccent?: {
      main?: string;
    };
    card?: {
      main?: string;
    };
    navbar?: {
      main?: string;
    };
  }
  export default function createPalette(palette: PaletteOptions): Palette;
}

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
      main: "#bcbcbc",
    },
    greenAccent: {
      main: "#12ff23",
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
