// made by jjenzz at https://jjenzz.com/avoid-global-state-colocate, thanks for this amazing pattern if you ever see this.

import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { darkTheme, css } from "../stitches.config";

export const Dialog = ({ onClose, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      const dialog = ref.current;
      if (!dialog.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  });

  return ReactDOM.createPortal(
    <div
      {...props}
      ref={ref}
      className={darkTheme + " " + props.className + " " + dialog()}
    />,
    document.body
  );
};

const dialog = css({
  position: "fixed",
  zIndex: "9999",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  background: "$background",
  border: "1px solid $border",

  color: "$text",

  borderRadius: 4,
  padding: 20,
});
