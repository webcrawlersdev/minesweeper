const FloatingTimer = () => {
  const { isVisible } = useTimerVisibilityStore();

  return (
    <Box
      css={{
        position: "fixed",
        top: "1rem",
        zIndex: "10",
        width: "100%",

        display: "flex",
        justifyContent: "center",
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      <Box
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",

          backgroundColor: "$mauve3",
          padding: "0.5rem",
          borderRadius: "3px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "$mauve6",
        }}
      >
        <StopwatchIcon />
        <Timer />
      </Box>
    </Box>
  );
};

const Box = styled("div");

export default FloatingTimer;

import { StopwatchIcon } from "@modulz/radix-icons";
import Timer from "./Timer";
import { styled } from "../stitches.config";
import { useTimerVisibilityStore } from "lib/store";
