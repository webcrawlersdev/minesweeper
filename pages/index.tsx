// sorry for the name future Igor, also, if someone else is seeing this, shoot me a tweet at @bedesqui

// https://v10-beta--use-gesture.netlify.app/docs/gestures/#about-the-pinch-gesture
if (typeof document != "undefined") {
  //  Should probably wrap this in a useEffect so I can clean when re rendering
  document.addEventListener("gesturestart", (e) => e.preventDefault());
  document.addEventListener("gesturechange", (e) => e.preventDefault());
}

export default function Home() {
  // set up variable to track game state
  const { gameState, reset } = useGameStateStore();

  // game logic stuff
  const [board, setBoard] = useState<null | number[][]>(null);

  let bombNumber = 10;
  let dimSize = 9;

  useEffect(() => {
    console.log(board);
  }, [board]);

  const startNewGame = () => {
    revealedCells.current = [];
    setBoard(createBoardWithJustNumbers(dimSize, bombNumber));
    let tempArray = new Array(dimSize * dimSize).fill(false);
    setIsThisCellRevealed(singleToMultiDimentionalArray(tempArray, dimSize));
    reset();
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

  // show dialog when win/lose
  useEffect(() => {
    if (gameState == boardStateEnum.LOST || gameState == boardStateEnum.WON) {
      setOpen(true);
    }
  }, [gameState]);

  // barStuff
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      className={darkTheme}
      css={{
        position: "relative",
        height: "100vh",
      }}
    >
      <GameContainer ref={target} css={{ touchAction: "none" }}>
        <Bar expanded={isExpanded}>
          <button
            onClick={() => {
              gameState !== boardStateEnum.PRISTINE && startNewGame();
            }}
          >
            {gameState == boardStateEnum.PRISTINE ? (
              <PlayIcon width="30" height="30" />
            ) : (
              <ReloadIcon width="30" height="30" />
            )}
          </button>
          <button
            onClick={() => {
              setIsExpanded((prev) => !prev);
            }}
          >
            Hej do
          </button>

          {gameState !== boardStateEnum.PRISTINE && <Timer />}
        </Bar>
        {!board ? (
          <div>
            Tutorial stuff
            <br />
            <button
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              onClick={startNewGame}
            >
              START <PlayIcon />
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
        {open && (
          <GameEndDialog
            handleReset={startNewGame}
            playerWon={gameState == boardStateEnum.WON}
            onClose={() => setOpen(false)}
          />
        )}
      </GameContainer>
    </Box>
  );
}

const Box = styled("div");

const GameContainer = styled("div", {
  position: "fixed",
  top: "0",
  right: 0,
  width: "100%",
  height: "calc(100% - 88px)",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  backgroundColor: "$background",

  color: "$text",
});

import { useEffect, useState, useRef } from "react";
import GameHandler from "../components/GameHandler";
import { createBoardWithJustNumbers } from "../lib/utils";

import { styled } from "../stitches.config";
import { darkTheme } from "../stitches.config";
import { singleToMultiDimentionalArray } from "../lib/utils";
import { GameEndDialog } from "../components/GameEndDialog";
import GestureContainer from "../components/GestureContainer";
import Bar from "../components/Bar";
import Timer from "../components/Timer";
import { useGameStateStore } from "../lib/store";
import { boardStateEnum } from "../lib/boardStateEnum";
import { PlayIcon, ReloadIcon } from "@modulz/radix-icons";
