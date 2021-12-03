const MainMenu = ({ startNewGame }: { startNewGame: () => void }) => {
  return (
    <div>
      <DifficultySelector />
      <br />
      <button
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        onClick={startNewGame}
      >
        START GAME <PlayIcon />
      </button>
    </div>
  );
};

export default MainMenu;

import { PlayIcon } from "@modulz/radix-icons";
import DifficultySelector from "components/DifficultySelector";
