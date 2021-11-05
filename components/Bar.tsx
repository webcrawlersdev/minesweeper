const Bar = styled("div", {
  touchAction: "manipulation",

  position: "fixed",
  bottom: 0,
  left: 0,
  zIndex: "10",

  display: "flex",
  alignItems: "center",

  width: "100%",
  height: "88px",
  padding: "1rem",

  background: "$mauve2",
  borderTop: "1px solid $colors$mauve6",

  "@motion": {
    transitionDuration: "240ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0.14, 0.3, 1)",
    willChange: "height",
  },

  variants: {
    expanded: {
      true: {
        height: "60%",
      },
    },
  },
});

export default Bar;
import { styled } from "../stitches.config";
