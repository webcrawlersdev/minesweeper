const Button = styled("button", {
  all: "unset",
  outline: "none",
  cursor: "pointer",

  display: "inline-flex",
  alignItems: "center",
  justifyContent: "start",
  gap: "1rem",

  color: "$mauve12",

  backgroundColor: "$crimson9",

  $$borderColor: "$colors$crimson7",
  $$borderWidth: "1px",
  boxShadow: `0 0 0 $$borderWidth $$borderColor`,

  borderRadius: "2px",
  padding: "0.5rem 1rem",
  height: "min-content",

  "@motion": {
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0.14, 0.3, 1)",
  },

  "&:hover": {
    $$borderColor: "$colors$mauve8",
    backgroundColor: "$crimson10",
  },
  "&:focus": {
    $$borderColor: "$colors$mauve7",
    backgroundColor: "$crimson10",
    outline: "none",
  },
  "&:active": {
    $$borderColor: "$colors$mauve8",
    backgroundColor: "$crimson11",
    outline: "none",
  },

  variants: {
    outlined: {
      true: {
        $$borderColor: "$colors$uiElementBorder",
        $$borderWidth: "2px",
        backgroundColor: "$uiElementBackground",
        border: "none",

        "&:hover": {
          $$borderColor: "$colors$mauve8",
          backgroundColor: "$mauve4",
        },
        "&:focus": {
          $$borderColor: "$colors$crimson7",
          backgroundColor: "$mauve5",
          outline: "none",
        },
        "&:active": {
          $$borderColor: "$colors$crimson8",
          backgroundColor: "$mauve5",
          outline: "none",
        },
      },
    },
  },
});

export default Button;
import { styled } from "../stitches.config";
