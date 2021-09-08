// sorry for the name future Igor, also, if someone else is seeing this, shoot me a tweet at @bedesqui

// https://v10-beta--use-gesture.netlify.app/docs/gestures/#about-the-pinch-gesture
if (typeof document != "undefined") {
  document.addEventListener("gesturestart", (e) => e.preventDefault());
  document.addEventListener("gesturechange", (e) => e.preventDefault());
}

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

  //animation/gesture stuff bellow
  const target = useRef(null);

  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
  }));

  useGesture(
    {
      onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel();
        api.start({ x, y });
      },
      onPinch: ({ origin: [ox, oy], first, offset: [s], memo }) => {
        if (first) {
          const { width, height, x, y } =
            target.current.getBoundingClientRect();
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);
          memo = [style.x.get(), style.y.get(), tx, ty];
        }
        api.start({ scale: s });
        return memo;
      },
      onWheel: ({ offset: [, s] }) => api.start({ scale: 1 + s / 1200 }),
    },
    {
      target: target,
      eventOptions: { passive: false },
      drag: { from: () => [style.x.get(), style.y.get()], filterTaps: true },
      pinch: { scaleBounds: { min: 0.1, max: 10 }, rubberband: true },
      wheel: {
        bounds: { left: -700, right: 700, top: -700, bottom: 700 },
        rubberband: true,
      },
    }
  );

  return (
    <Box className={darkTheme} ref={target} css={{ touchAction: "none" }}>
      {board && (
        <animated.div
          style={{
            ...style,
          }}
        >
          <GameHandler
            board={board}
            bombNumber={bombNumber}
            dimSize={dimSize}
          />
        </animated.div>
      )}
    </Box>
  );
}

const Box = styled("div", {
  minHeight: "100vh",
  position: "relative",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  overflow: "hidden",
  padding: "4rem",

  backgroundColor: "$background",
});

import { useEffect, useState, useRef } from "react";
import GameHandler from "../components/GameHandler";
import { createBoardWithJustNumbers } from "../lib/utils";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { styled } from "@stitches/react";
import { darkTheme } from "../stitches.config";
