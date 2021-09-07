import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  globalStyles();
  return <Component {...pageProps} />;
}

export default MyApp;

const globalStyles = globalCss({
  body: { overflow: "hidden" },
});

import { globalCss } from "@stitches/react";
