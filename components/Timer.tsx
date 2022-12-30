const Timer = () => {
  const { gameState } = useGameStateStore();
  const { timer, increaseTimerBy, resetTimer } = useTimerStore();

  useEffect(() => {
    if (
      gameState == boardStateEnum.IN_PROGRESS ||
      gameState == boardStateEnum.PRISTINE
    ) {
      resetTimer();

      const interval = setInterval(() => {
        increaseTimerBy(1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [gameState]);

  return <div>{formatTime(timer)}</div>;
};

export default Timer;

import { useEffect } from "react";
import { boardStateEnum } from "../lib/boardStateEnum";
import { useGameStateStore, useTimerStore } from "../lib/store";
import { formatTime } from "../lib/format";
