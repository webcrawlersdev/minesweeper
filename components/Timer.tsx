const Timer = () => {
  const { gameState } = useGameStateStore();
  const { timer, increaseTimerBy, resetTimer } = useTimerStore();
  const { isOpen: cmdkOpen } = useCmdkStore();
  const { isVisible } = useTimerVisibilityStore();

  useEffect(() => {
    if (gameState == boardStateEnum.PRISTINE) {
      resetTimer();
    }

    if (gameState == boardStateEnum.IN_PROGRESS) {
      const interval = setInterval(() => {
        // pause timer when command menu is open
        if (!cmdkOpen) {
          increaseTimerBy(1);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [gameState, cmdkOpen]);

  if (isVisible) return <div>{formatTime(timer)}</div>;

  return null;
};

export default Timer;

import { useEffect } from "react";
import { boardStateEnum } from "../lib/boardStateEnum";
import {
  useCmdkStore,
  useGameStateStore,
  useTimerStore,
  useTimerVisibilityStore,
} from "../lib/store";
import { formatTime } from "../lib/format";
