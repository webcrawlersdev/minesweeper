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
    <Cell
      variant={isFlagged ? "flagged" : isRevealed ? "revealed" : "hidden"}
      onClick={reveal}
      onContextMenu={(e) => {
        e.preventDefault();
        handleFlag();
      }}
      // Style this, make the style reactive to cellState
    >
      {isRevealed ? (value === 9 ? "*" : value > 0 && value) : " "}
    </Cell>
  );
}

const Cell = styled("button", {
  position: "relative",
  width: "3rem",
  height: "3rem",
  borderRadius: "4px",
  color: "$text",

  variants: {
    variant: {
      revealed: {
        backgroundColor: "$revealed",
      },
      hidden: {
        transform: "scale(107%)",
        borderRadius: "3px",
        backgroundColor: "$hidden",
      },
      flagged: {
        transform: "scale(80%)",
        backgroundColor: "$flagged",
      },
    },
  },
});

import { useState } from "react";
import { styled } from "@stitches/react";
