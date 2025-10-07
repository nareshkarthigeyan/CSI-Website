import { useEffect, useRef, useState } from "react";

type UseInViewOptions = IntersectionObserverInit;

export default function useInView<T extends Element = Element>(
  options?: UseInViewOptions
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setInView(entry.isIntersecting));
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // options intentionally omitted from deps to keep behavior stable for this simple hook
  }, []);

  return [ref as React.RefObject<T>, inView] as const;
}
