import { createMuiTheme } from "@material-ui/core/styles";
// import blueGrey from '@material-ui/core/colors/blueGrey';
import blueGrey from "@material-ui/core/colors/red";

const blueGrey500 = blueGrey[500];

const palette = {
  secondary: {
    main: "rgba(0,27,255,0.79)",
    light: "rgba(69,255,81,0.32)",
    dark: "rgba(25,78,74,0.95)",
    contrastText: "#fafafa"
  },
  primary1: {
    main: "rgba(61,66,255,0.91)",
    light: "rgba(31,32,255,0.36)",
    dark: "rgba(0,27,255,0.79)",
    contrastText: "#ffffff"
  },

  primary: {
    main: "#435395",
    light: "#5E6CA3",
    dark: "#2D3874",
    contrastText: "#ffffff"
  },

  thirdly: {
    main: "#00BCD4",
    light: "rgba(0,150,167,0.32)",
    dark: "#0097A7",
    contrastText: "#ffffff"
  },
  fourthly: {
    main: "rgba(226,227,255,0.85)",
    light: "rgba(230,74,25,0.32)",
    dark: "#E64A19",
    contrastText: "#ffffff"
  }
};

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },

  palette

  // palette: {
  //   primary: blueGrey,
  //   // primary: deepOrange,
  //   // primary: cyan,
  //   // secondary: indigo, // Indigo is probably a good match with pink
  //   secondary: orange, // Indigo is probably a good match with pink
  //   third: 'cadetblue',
  // },
});

export function getTheme(dir) {
  const t = createMuiTheme({
    direction: dir,
    typography: {
      useNextVariants: true
    },

    palette
    // palette: {
    //   primary: blueGrey,
    //   // primary: deepOrange,
    //   // primary: cyan,
    //   // secondary: indigo, // Indigo is probably a good match with pink
    //   secondary: orange, // Indigo is probably a good match with pink
    //   third: 'cadetblue',
    // },
  });
  return t;
}

export default theme;

// https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/getPageContext.js
// function createPageContext() {
//   return {
//     theme,
//     // This is needed in order to deduplicate the injection of CSS in the page.
//     sheetsManager: new Map(),
//     // This is needed in order to inject the critical CSS.
//     sheetsRegistry: new SheetsRegistry(),
//     // The standard class name generator.
//     generateClassName: createGenerateClassName(),
//   };
// }
//
// let pageContext;
//
// export function getPageContext() {
//   // Make sure to create a new context for every server-side request so that data
//   // isn't shared between connections (which would be bad).
//   if (!process.browser) {
//     return createPageContext();
//   }
//
//   // Reuse context on the client-side.
//   if (!pageContext) {
//     pageContext = createPageContext();
//   }
//
//   return pageContext;
// }
