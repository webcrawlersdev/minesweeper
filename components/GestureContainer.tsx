export default function ({ children, targetRef }) {
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

import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
