// sorry for the name future Igor, also, if someone else is seeing this, shoot me a tweet at @bedesqui

// https://v10-beta--use-gesture.netlify.app/docs/gestures/#about-the-pinch-gesture
if (typeof document != "undefined") {
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
          <button onClick={startNewGame}>
            {gameState == boardStateEnum.PRISTINE ? (
              <svg
                width="30"
                height="30"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                width="30"
                height="30"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}
          </button>
          <button
            onClick={() => {
              setIsExpanded((prev) => !prev);
            }}
          >
            Hej do
          </button>
        </Bar>
        {!board ? (
          <div>
            Tutorial stuff
            <br />
            <button onClick={startNewGame}>
              Start game{" "}
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
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
import { useGameStateStore } from "../lib/store";
import { boardStateEnum } from "../lib/boardStateEnum";
