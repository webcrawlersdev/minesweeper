import {
  mauveDark,
  mauve,
  crimson,
  crimsonDark,
  red,
  redDark,
} from "@radix-ui/colors";

// Spread the scales in your light and dark themes
import { createStitches } from "@stitches/react";

export const { createTheme, theme } = createStitches({
  theme: {
    colors: {
      background: mauve.mauve1,

      border: mauve.mauve6,
      revealed: "transparent",
      hidden: crimson.crimson9,
      hiddenFocus: crimson.crimson10,
      flagged: mauve.mauve10,
      bombBackground: red.red8,
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
    hiddenFocus: crimsonDark.crimson10,
    flagged: mauveDark.mauve10,
    bombBackground: redDark.red8,
    text: crimsonDark.crimson12,
  },
});
