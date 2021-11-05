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

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...mauve,
      ...crimson,

      background: mauve.mauve1,
      subtleBackground: mauve.mauve2,
      uiElementBackground: mauve.mauve3,
      hoveredUiElementBackground: mauve.mauve4,
      uiElementBorder: "$mauve6",
      hoveredUiElementBorder: "$mauve7",

      border: mauve.mauve6,
      revealed: "transparent",
      primary: crimson.crimson9,
      primaryFocus: crimson.crimson10,
      flagged: mauve.mauve10,
      flagColor: "$background",
      bombBackground: red.red8,
      text: crimson.crimson12,
    },
  },
  media: {
    motion: "(prefers-reduced-motion: no-preference)",
  },
});

export const darkTheme = createTheme({
  colors: {
    ...mauveDark,
    ...crimsonDark,

    background: mauveDark.mauve1,
    subtleBackground: mauveDark.mauve2,
    uiElementBackground: mauveDark.mauve3,
    hoveredUiElementBackground: mauveDark.mauve4,
    activeUiElementBackground: "$mauve5",
    uiElementBorder: "$mauve6",
    hoveredUiElementBorder: "$mauve7",

    border: mauveDark.mauve6,
    revealed: "transparent",
    primary: crimsonDark.crimson9,
    primaryFocus: crimsonDark.crimson10,
    flagged: mauveDark.mauve10,
    flagColor: "$background",
    bombBackground: redDark.red8,
    text: crimsonDark.crimson12,
  },
});
