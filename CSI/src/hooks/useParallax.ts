import { useEffect, useRef } from "react";

export default function useParallax(strength = 0.15) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight / 2) * strength;
      el.style.transform = `translateY(${offset}px)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // strength intentionally left out of deps for stability in this simple hook
  }, []);

  return ref;
}
