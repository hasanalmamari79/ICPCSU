import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { quotes } from '../content/quotes';
import { useLang } from '../i18n/LangProvider';
import { QuoteIcon } from '../components/Icons';
import { OrbitArcs } from '../components/OrbitArcs';
import { Container, Section, SectionHeading } from '../components/ui';

const ROTATE_MS = 7000;

export function Quotes() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const n = quotes.items.length;

  useEffect(() => {
    if (reduce || hold || n < 2) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % n), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduce, hold, n]);

  if (n === 0) return null;
  const q = quotes.items[i];
  return (
    <Section id="voices" labelledBy="quotes-title" className="on-dark bg-navy text-white">
      <OrbitArcs tone="light" className="absolute -end-40 -top-40 h-[36rem] w-[36rem]" strokeWidth={14} />
      <Container>
        <SectionHeading id="quotes-title" label={quotes.label} title={quotes.title} onDark center />
        <div
          className="relative mx-auto max-w-3xl text-center"
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocusCapture={() => setHold(true)}
          onBlurCapture={() => setHold(false)}
        >
          <QuoteIcon className="mx-auto h-12 w-12 text-sun rtl:-scale-x-100" />
          <div className="relative mt-6 min-h-[13rem] sm:min-h-[11rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <m.figure
                key={i}
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="text-2xl font-bold leading-relaxed sm:text-3xl">{t(q.text)}</blockquote>
                <figcaption className="mt-6">
                  <span className="block font-extrabold text-sun">{t(q.name)}</span>
                  <span className="text-sm text-white/70">{t(q.role)}</span>
                </figcaption>
              </m.figure>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {quotes.items.map((_, k) => (
              <button
                key={k}
                type="button"
                onClick={() => setI(k)}
                aria-label={`${t({ ar: 'اقتباس', en: 'Quote' })} ${k + 1}`}
                aria-current={k === i ? 'true' : undefined}
                className="grid h-8 w-8 place-items-center"
              >
                <span className={`block h-2.5 rounded-full transition-all duration-300 ${k === i ? 'w-8 bg-sun' : 'w-2.5 bg-white/40 hover:bg-white/70'}`} />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
