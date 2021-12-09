export const GameEndDialog = ({
  playerWon,
  handleReset,
  handleClose,
  ...props
}) => {
  const { timer } = useTimerStore();
  const { difficulty } = useDifficultyStore();

  return (
    <Dialog onOpenChange={handleClose} {...props}>
      <StyledContent className={darkTheme}>
        <DialogPrimitive.Title>
          {playerWon ? "Congratulations!" : "Game over!"}
        </DialogPrimitive.Title>

        <StyledDescription>
          {playerWon
            ? `You revealed all ${difficulty.bombNumber} mines in ${formatTime(
                timer
              )}`
            : `You tried your best but blew up in ${formatTime(timer)}`}
        </StyledDescription>
        <Box
          css={{
            display: "flex",
            justifyContent: "flex-end",

            marginTop: "2rem",
          }}
        >
          <Button
            outlined
            onClick={() => {
              handleReset();
              handleClose();
            }}
          >
            Try again
            <ReloadIcon />
          </Button>
        </Box>
      </StyledContent>
    </Dialog>
  );
};

const Box = styled("div");

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "$mauve3",
  color: "$mauve12",

  borderRadius: "3px",
  position: "fixed",

  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "360px",
  maxHeight: "85vh",
  padding: "1rem 2rem",

  "@motion": {
    animation: `${contentShow} 110ms cubic-bezier(0, 0, 0.3, 1)`,
  },

  "&:focus": { outline: "none" },
});

const StyledDescription = styled(DialogPrimitive.Description, {
  marginTop: "0.5rem",
  color: "$mauve11",
});

import { ReloadIcon } from "@radix-ui/react-icons";
import Button from "./Button";
import Dialog from "./Dialog";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled, keyframes, darkTheme } from "stitches.config";
import { useDifficultyStore, useTimerStore } from "lib/store";
import { formatTime } from "lib/format";
