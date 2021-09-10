const Button = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "start",
  gap: "1rem",

  background: "$primary",
  padding: ".25rem 1rem",
  borderRadius: 9999,

  font: "inherit",
  color: "$text",

  "&:hover": {
    background: "$primaryFocus",
  },

  "@media (prefers-reduced-motion: no-preference)": {
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0.14, 0.3, 1)",
  },

  variants: {
    outlined: {
      true: {
        $$borderColor: "$colors$uiElementBorder",
        backgroundColor: "$uiElementBackground",
        boxShadow: "0 0 0 2px $$borderColor",
        border: "none",

        "&:hover": {
          $$borderColor: "$colors$hoveredUiElementBorder",
          backgroundColor: "$hoveredUiElementBackground",
        },

        "&:active": {
          backgroundColor: "$activeUiElementBackground",
        },
        "&:focus": {
          backgroundColor: "$activeUiElementBackground",
        },
      },
    },
  },
});

export default Button;
import { styled } from "../stitches.config";
