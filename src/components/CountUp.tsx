import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Props = { value: number; plain?: boolean; duration?: number; className?: string };

/** Counts from 0 to `value` when scrolled into view. `plain` skips thousands separators (years). */
export function CountUp({ value, plain = false, duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const start = plain && value > 100 ? value - 25 : 0; // years count the last stretch only
  const [n, setN] = useState(reduce ? value : start);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(value);
    const controls = animate(start, value, { duration, ease: [0.15, 0.8, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, value, start, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`}>
      <span aria-hidden="true">{plain ? n : n.toLocaleString('en-US')}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
