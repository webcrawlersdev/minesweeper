import { mauveDark, mauve, crimson, crimsonDark } from "@radix-ui/colors";

// Spread the scales in your light and dark themes
import { createStitches } from "@stitches/react";

export const { createTheme, theme } = createStitches({
  theme: {
    colors: {
      background: mauve.mauve1,

      border: mauve.mauve6,
      revealed: "transparent",
      hidden: crimson.crimson9,
      flagged: mauve.mauve10,
      text: crimson.crimson12,
    },
  },
});

export const darkTheme = createTheme({
  colors: {
    background: mauveDark.mauve1,

    border: mauveDark.mauve6,
    revealed: "transparent",
    hidden: crimsonDark.crimson9,
    flagged: mauveDark.mauve10,
    text: crimsonDark.crimson12,
  },
});
