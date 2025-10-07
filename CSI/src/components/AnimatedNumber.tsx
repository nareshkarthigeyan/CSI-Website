import React, { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 800,
}) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const from = ref.current || 0;
    const delta = value - from;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const current = Math.round(from + delta * eased);
      setDisplay(current);
      if (t < 1) requestAnimationFrame(tick);
      else ref.current = value;
    };

    requestAnimationFrame(tick);
  }, [value, duration]);

  return <>{display}</>;
};

export default AnimatedNumber;
