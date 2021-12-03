//Hello future igor, I'm sorry for this file's name. It is late and I just want to work on it

export default function NewCell({
  value,
  isRevealed,
  handleBomb,
  staggerValue,
  handleReveal,
}: {
  value: number;
  isRevealed: boolean;
  staggerValue: number;
  handleBomb: () => void;
  handleReveal: () => void;
}) {
  const { currentTool } = useToolStore();

  const { gameState } = useGameStateStore();
  useEffect(() => {
    if (gameState == boardStateEnum.PRISTINE) {
      setIsFlagged(false);
    }
  }, [gameState]);

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

  const handlePrimaryAction = () => {
    if (currentTool === toolOptionsEnum.DIG) {
      reveal();
    }
    if (currentTool === toolOptionsEnum.FLAG) {
      handleFlag();
    }
  };

  const handleSecondaryAction = () => {
    if (currentTool === toolOptionsEnum.DIG) {
      handleFlag();
    }
    if (currentTool === toolOptionsEnum.FLAG) {
      reveal();
    }
  };

  return (
    <Box>
      <Cell
        css={{
          animationDelay: `${staggerValue}ms`,
          transitionDelay: `${staggerValue}ms`,
        }}
        variant={isRevealed ? "revealed" : isFlagged ? "flagged" : "hidden"}
        style={{ WebkitTapHighlightColor: "transparent" }}
        tabIndex={0}
        bomb={value === 9}
        onClick={handlePrimaryAction}
        onContextMenu={(e) => {
          e.preventDefault();
          handleSecondaryAction();
        }}
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "Space") {
            // this will most likely become a switch case when I try to handle navigation with the arrow keys
            handlePrimaryAction();
          }
        }}
        // Style this, make the style reactive to cellState
      >
        {isRevealed ? (
          value === 9 ? (
            <GearIcon width="30" height="30" />
          ) : (
            value > 0 && value
          )
        ) : isFlagged ? (
          <BookmarkIcon width="30" height="30" />
        ) : (
          " "
        )}
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
  "0%": {
    transform: "scale(1)",
    color: "transparent",
    backgroundColor: "$primary",
  },
  "50%": {
    transform: "scale(1.3)",
    color: "transparent",
    backgroundColor: "$primary",
  },
  "100%": { transform: "scale(.9)", color: "$text" },
});

const Cell = styled("div", {
  //position and zindex so this is displayed above the grid lines
  position: "relative",
  zIndex: "1",

  borderRadius: "2px",
  width: "100%",
  height: "100%",
  color: "$text",
  userSelect: "none",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "@motion": {
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0.14, 0.3, 1)",

    animationTimingFunction: "cubic-bezier(0.4, 0.14, 0.3, 1)",
  },

  variants: {
    variant: {
      revealed: {
        "@motion": {
          animation: `${reveal} 240ms`,
        },
      },
      hidden: {
        cursor: "pointer",
        transform: "scale(1.1)",
        borderRadius: "3px",
        backgroundColor: "$primary",

        "&:focus": {
          transform: "scale(1)",
          backgroundColor: "$primaryFocus",
        },
      },
      flagged: {
        transform: "scale(0.8)",
        backgroundColor: "$flagged",
        color: "$flagColor",
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
        transform: "scale(0.8)",
        backgroundColor: "$bombBackground",
        borderRadius: "2px",
      },
    },
  ],
});

import { useEffect, useState } from "react";
import { BookmarkIcon, GearIcon } from "@radix-ui/react-icons";
import { styled, keyframes } from "stitches.config";
import { useGameStateStore } from "../lib/store";
import { boardStateEnum } from "../lib/boardStateEnum";
import { useToolStore, toolOptionsEnum } from "../lib/store";
