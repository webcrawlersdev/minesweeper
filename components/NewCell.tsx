//Hello future igor, I'm sorry for this file's name. It is late and I just want to work on it

export default function NewCell({
  value,
  coords,
  isRevealed,
  handleBomb,
  handleEmptyCell,
  handleReveal,
}: {
  value: number;
  coords: [number, number];
  isRevealed: boolean;
  handleBomb: any;
  handleEmptyCell: any;
  handleReveal: any;
}) {
  const [isFlagged, setIsFlagged] = useState(false);
  //The cell should handle itself entirely.

  const reveal = () => {
    // if this cell is flagged, return without doing anything.
    if (isFlagged || isRevealed) {
      return;
    }

    // Update the cell state
    handleReveal();
    // Update the cell UI -- maybe this can be done reactivelly, stitches to the rescue huh

    // if the value if this cell is 0, send the coordinates of this cell to the game handler so it can reveal the correct neighboring cells;
    console.log("Handling reveal");
  };

  const handleFlag = () => {
    if (isRevealed) {
      return;
    }

    setIsFlagged((prev) => !prev);

    // Update the cell state
    // Update the cell UI -- maybe this can be done reactivelly, stitches to the rescue huh
    console.log("Handling flag");
  };

  return (
    <Box>
      <Cell
        variant={isRevealed ? "revealed" : isFlagged ? "flagged" : "hidden"}
        disabled={isRevealed}
        bomb={value === 9}
        onClick={reveal}
        onContextMenu={(e) => {
          e.preventDefault();
          handleFlag();
        }}
        // Style this, make the style reactive to cellState
      >
        {isRevealed ? (value === 9 ? "*" : value > 0 && value) : " "}
      </Cell>
    </Box>
  );
}

const Box = styled("div", {
  position: "relative",
  zIndex: "1",

  width: "3rem",
  height: "3rem",
});

const reveal = keyframes({
  "0%": { scale: "1", color: "transparent", backgroundColor: "$hidden" },
  "50%": { scale: "1.3", color: "transparent", backgroundColor: "$hidden" },
  "100%": { scale: ".9", color: "$text" },
});

const Cell = styled("button", {
  //position and zindex so this is displayed above the grid lines
  position: "relative",
  zIndex: "1",

  borderRadius: "4px",
  width: "100%",
  height: "100%",
  color: "$text",

  transitionDuration: "150ms",
  transitionTimingFunction: "cubic-bezier(0.4, 0.14, 0.3, 1)",

  animationTimingFunction: "cubic-bezier(0.4, 0.14, 0.3, 1)",

  variants: {
    variant: {
      revealed: {
        animation: `${reveal} 240ms`,
      },
      hidden: {
        scale: "1.1",
        borderRadius: "3px",
        backgroundColor: "$hidden",
      },
      flagged: {
        scale: "0.8",
        backgroundColor: "$flagged",
      },
    },
    bomb: {
      true: {},
    },
  },

  compoundVariants: [
    {
      variant: "revealed",
      bomb: true,
      css: {
        scale: "0.8",
        backgroundColor: "$bombBackground",
        borderRadius: "3px",
      },
    },
  ],
});

import { useState } from "react";
import { styled, keyframes } from "@stitches/react";