import { m } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = { children: ReactNode; delay?: number; className?: string; y?: number; as?: 'div' | 'li' };

/** Fades + lifts content in when it scrolls into view (once). */
export function Reveal({ children, delay = 0, className, y = 28, as = 'div' }: Props) {
  const Comp = as === 'li' ? m.li : m.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </Comp>
  );
}
