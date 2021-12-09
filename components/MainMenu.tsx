const MainMenu = ({ startNewGame }: { startNewGame: () => void }) => {
  return (
    <div>
      <DifficultySelector />
      <br />
      <Button outlined onClick={startNewGame}>
        START GAME <PlayIcon />
      </Button>
    </div>
  );
};

export default MainMenu;

import { PlayIcon } from "@modulz/radix-icons";
import DifficultySelector from "components/DifficultySelector";
import Button from "./Button";
