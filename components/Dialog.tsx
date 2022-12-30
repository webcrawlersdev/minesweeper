const Dialog = ({ children, ...props }) => {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      <div style={{ zIndex: 50 }}>{children}</div>
    </DialogPrimitive.Root>
  );
};

export default Dialog;

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 0.1 },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "$mauveA1",
  backdropFilter: "blur(2px)",
  zIndex: "50",

  pointerEvents: "none",
  position: "fixed",
  inset: 0,
  "@motion": {
    animation: `${overlayShow} 110ms cubic-bezier(0, 0, 0.3, 1)`,
  },

  variants: {
    open: {
      true: {
        pointerEvents: "auto",
        "@motion": {
          animation: `${overlayShow} reverse 110ms cubic-bezier(0.4, 0.14, 1, 1)`,
        },
      },
    },
  },
});

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled, keyframes } from "stitches.config";
