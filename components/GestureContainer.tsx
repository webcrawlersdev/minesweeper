export default function GestureContainer({ children, targetRef }) {
  // Macbook trackpads support pinching and rotating in Safari. To make sure the zooming gesture doesn't interfere with Safari accessibility zoom, you will need to prevent the gesture. https://v10-beta--use-gesture.netlify.app/docs/gestures/#about-the-pinch-gesture
  if (typeof document != "undefined") {
    useEffect(() => {
      document.addEventListener("gesturestart", (e) => e.preventDefault());
      document.addEventListener("gesturechange", (e) => e.preventDefault());

      return () => {
        document.removeEventListener("gesturestart", (e) => e.preventDefault());
        document.removeEventListener("gesturechange", (e) =>
          e.preventDefault()
        );
      };
    });
  }

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
            targetRef.current.getBoundingClientRect();
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
      target: targetRef,
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
    <animated.div
      style={{
        ...style,
      }}
    >
      {children}
    </animated.div>
  );
}

import { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
