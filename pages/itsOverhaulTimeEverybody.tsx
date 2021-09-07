// sorry for the name future Igor, also, if someone else is seeing this, shoot me a tweet at @bedesqui

// Genereate the board here!

export default function Home() {
  const [board, setBoard] = useState<null | number[][]>(null);

  let bombNumber = 8;
  let dimSize = 8;

  useEffect(() => {
    setBoard(createBoardWithJustNumbers(dimSize, bombNumber));
  }, []);

  useEffect(() => {
    console.log(board);
  }, [board]);

  return (
    <div>
      {board && (
        <GameHandler board={board} bombNumber={bombNumber} dimSize={dimSize} />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import GameHandler from "../components/GameHandler";
import { createBoardWithJustNumbers } from "../lib/utils";
