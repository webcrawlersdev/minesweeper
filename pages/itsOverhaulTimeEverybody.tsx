// sorry for the name future Igor, also, if someone else is seeing this, shoot me a tweet at @bedesqui

// https://v10-beta--use-gesture.netlify.app/docs/gestures/#about-the-pinch-gesture
if (typeof document != "undefined") {
  document.addEventListener("gesturestart", (e) => e.preventDefault());
  document.addEventListener("gesturechange", (e) => e.preventDefault());
}

export default function Home() {
  // game logic stuff
  const [board, setBoard] = useState<null | number[][]>(null);

  let bombNumber = 40;
  let dimSize = 22;

  useEffect(() => {
    console.log(board);
  }, [board]);

  const startNewGame = () => {
    revealedCells.current = [];
    setBoard(createBoardWithJustNumbers(dimSize, bombNumber));
    let tempArray = new Array(dimSize * dimSize).fill(false);
    setIsThisCellRevealed(singleToMultiDimentionalArray(tempArray, dimSize));
  };

  // make a bidimentional array the same size of board, give cells a calback so they can update themsemves here;
  const [isThisCellRevealed, setIsThisCellRevealed] = useState(null);
  useEffect(() => {
    let tempArray = new Array(dimSize * dimSize).fill(false);
    setIsThisCellRevealed(singleToMultiDimentionalArray(tempArray, dimSize));
  }, [dimSize, board]);

  // make a bidimentional array the same size of board, This will be used and reseted to set staggers to the cell animations;
  const [cellStaggerValues, setCellStaggerValues] = useState(null);
  useEffect(() => {
    let tempArray = new Array(dimSize * dimSize).fill(0);
    setCellStaggerValues(singleToMultiDimentionalArray(tempArray, dimSize));
  }, [dimSize, board]);

  useEffect(() => {
    if (!isThisCellRevealed) {
      return;
    }

    // console.table(isThisCellRevealed);
  }, [isThisCellRevealed]);

  const revealedCells = useRef([]);

  //animation/gesture stuff
  const target = useRef(null);

  //Dialog stuff
  const [open, setOpen] = useState(false);

  return (
    <Box
      className={darkTheme}
      css={{
        position: "relative",
        height: "100vh",
      }}
    >
      <UiBar>Hej do</UiBar>
      <GameContainer ref={target} css={{ touchAction: "none" }}>
        {!board ? (
          <div>
            Tutorial stuff
            <br />
            <button onClick={startNewGame}>Start game {">"}</button>
          </div>
        ) : (
          <>
            <Ui css={{ top: "5%", left: "2rem" }}>
              <button onClick={startNewGame}>Start new game</button>
              <br />
              <button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Open dialog
              </button>
            </Ui>
            <GestureContainer targetRef={target}>
              <GameHandler
                cellStaggerValues={cellStaggerValues}
                setCellStaggerValues={setCellStaggerValues}
                isThisCellRevealed={isThisCellRevealed}
                setIsThisCellRevealed={setIsThisCellRevealed}
                revealedCells={revealedCells}
                board={board}
                bombNumber={bombNumber}
                dimSize={dimSize}
              />
            </GestureContainer>
            <Ui css={{ bottom: "2rem" }}>
              <div>
                bombNumber: {bombNumber} <br />
                dimSize: {dimSize}
              </div>
            </Ui>
          </>
        )}
        {open && (
          <GameEndDialog playerWon={true} onClose={() => setOpen(false)} />
        )}
      </GameContainer>
      <UiBar></UiBar>
    </Box>
  );
}

const Box = styled("div");

const UiBar = styled(Box, {
  position: "relative",
  height: "10%",
  width: "100%",
  background: "$background",
  zIndex: "10",
});

const GameContainer = styled("div", {
  position: "relative",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  backgroundColor: "$background",
  height: "80%",

  color: "$text",
});

const Ui = styled("div", {
  position: "absolute",
  zIndex: "10",
});

import { useEffect, useState, useRef } from "react";
import GameHandler from "../components/GameHandler";
import { createBoardWithJustNumbers } from "../lib/utils";

import { styled } from "../stitches.config";
import { darkTheme } from "../stitches.config";
import { singleToMultiDimentionalArray } from "../lib/utils";
import { GameEndDialog } from "../components/GameEndDialog";
import GestureContainer from "../components/GestureContainer";
