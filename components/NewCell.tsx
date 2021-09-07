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
    <div
      className="border border-blue-600"
      onClick={reveal}
      onContextMenu={(e) => {
        e.preventDefault();
        handleFlag();
      }}
      // Style this, make the style reactive to cellState
    >
      {isFlagged ? "flagged" : isRevealed ? "revealed" : "hidden"} - {value}
    </div>
  );
}

import { useState } from "react";
