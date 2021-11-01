export const GameEndDialog = ({ playerWon, onClose, handleReset }) => (
  <Dialog className={dialog()} onClose={onClose}>
    <h2 className={heading()}>
      {playerWon ? "Congratulations!" : "Game over!"}
    </h2>

    <Box
      css={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Button
        outlined
        onClick={() => {
          handleReset();
          onClose();
        }}
      >
        Try again
        <ArrowRightIcon />
      </Button>
      <Button onClick={onClose}>close</Button>
    </Box>
  </Dialog>
);

const Box = styled("div");

const dialog = css({
  minWidth: 300,
});

const heading = css({
  margin: "0 0 20px",
});

import { ArrowRightIcon } from "@radix-ui/react-icons";
import Button from "./Button";
import { Dialog } from "./Dialog";
import { styled, css } from "../stitches.config";
