import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  globalStyles();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

const globalStyles = globalCss({
  body: { overflow: "hidden" },
});

import Head from "next/head";
import { globalCss } from "@stitches/react";
