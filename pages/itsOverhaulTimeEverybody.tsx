// sorry for the name future Igor, also, if someone else is seeing this, shoot me a tweet at @bedesqui

// Genereate the board here!

export default function Home() {
  const [board, setBoard] = useState<null | number[][]>(null);

  let bombNumber = 40;
  let dimSize = 22;

  useEffect(() => {
    setBoard(createBoardWithJustNumbers(dimSize, bombNumber));
  }, []);

  useEffect(() => {
    console.log(board);
  }, [board]);

  return (
    <Box className={darkTheme}>
      {board && (
        <GameHandler board={board} bombNumber={bombNumber} dimSize={dimSize} />
      )}
    </Box>
  );
}

const Box = styled("div", {
  minHeight: "100vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "4rem",

  backgroundColor: "$background",
});

import { useEffect, useState } from "react";
import GameHandler from "../components/GameHandler";
import { createBoardWithJustNumbers } from "../lib/utils";
import { styled } from "@stitches/react";
import { darkTheme } from "../stitches.config";
