function MyApp({ Component, pageProps }) {
  globalStyles();

  return (
    <IdProvider>
      <Head>
        <title>Minesweeper</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <Component {...pageProps} />
    </IdProvider>
  );
}

export default MyApp;

const globalStyles = globalCss({
  "@font-face": {
    fontFamily: "IBM Plex Mono",
  },

  "*": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    userSelect: "none",
    fontFamily: "IBM Plex Mono",
  },

  body: {
    overflow: "hidden",
    minHeight: "100vh",
    backgroundColor: "$background",
    margin: 0,
  },

  // Normalizing button
  button: {
    cursor: "pointer",

    margin: 0,
    padding: 0,

    fontFamily: "inherit",
    lineHeight: "inherit",
    fontSize: "100%",
    textTransform: "none",
    color: "inherit",

    backgroundColor: "transparent",
    backgroundImage: "none",
    border: "none",

    "&:focus": {
      outline: "1px dotted",
      outline: "5px auto -webkit-focus-ring-color",
    },
  },
});

import Head from "next/head";
import { globalCss } from "../stitches.config";
import { IdProvider } from "@radix-ui/react-id";
