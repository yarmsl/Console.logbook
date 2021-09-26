import { createTheme } from "@material-ui/core/styles";

const lightTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      dark: "#00695f",
      main: "#b0bec5",
      light: "#78909c",
    },
    secondary: {
      dark: "#00a152",
      main: "#00e676",
      light: "#33eb91",
      contrastText: "#fff",
    },
  },
  // shadows: [
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none', //используется выпадашки из селектов TextField
  // 	'none',
  // 	'none',
  // 	'0px 0px 16px rgba(0, 0, 0, 0.25)',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none',
  // 	'none'
  // ],
  shape: {
    borderRadius: 8,
  },
  overrides: {
    MuiContainer: {
      root: {
        display: "flex",
      },
    },
    MuiCssBaseline: {
      "@global": {
        "::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#e9e9e9",
          borderRadius: "8px",
        },
        html: {
          width: "100%",
          height: "100%",
        },
        body: {
          width: "100%",
          height: "100%",
        },
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 30px #fafafa inset !important",
          },
        },
        img: {
          pointerEvents: "none",
          userSelect: "none",
        },
        "#root": {
          width: "100%",
          minWidth: "320px",
          height: "100%",
          minHeight: "265px",
          display: "flex",
          flexDirection: "column",
        },
      },
    },
  },
});

export default lightTheme;
