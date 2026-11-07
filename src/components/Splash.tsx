import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LangProvider';
import { ui } from '../content/ui';
import { asset } from '../lib/asset';
import { ClubLogo } from './ClubLogo';
import { OrbitArcs } from './OrbitArcs';
import { ChevronIcon } from './Icons';

const KEY = 'icpc-splash-seen';
const DURATION_MS = 2300;
const REDUCED_MS = 1100;

function alreadySeen() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

/** Full-screen intro shown once per browser session. */
export function Splash() {
  const [show, setShow] = useState(() => !alreadySeen());
  const reduce = useReducedMotion();
  const { t } = useLang();
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    document.body.style.overflow = 'hidden';
    skipRef.current?.focus({ preventScroll: true });
    const timer = window.setTimeout(() => setShow(false), reduce ? REDUCED_MS : DURATION_MS);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShow(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [show, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          key="splash"
          role="dialog"
          aria-modal="true"
          aria-label={t(ui.clubName)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-surface dark:bg-ink"
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.45, ease: 'easeInOut' } }}
        >
          <OrbitArcs className="absolute left-1/2 top-1/2 h-[150vmin] w-[150vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] dark:opacity-[0.12]" strokeWidth={14} />

          <ClubLogo assemble={!reduce} className="w-40 sm:w-52" label={t(ui.clubName)} />

          <m.div
            className="mt-6 flex flex-col items-center gap-4 px-6 text-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0.1 : 1.15, duration: 0.5 }}
          >
            <p className="text-2xl font-extrabold text-navy dark:text-white sm:text-3xl">{t(ui.clubName)}</p>
            <img src={asset('images/su-logo.webp')} alt={t(ui.university)} width={604} height={170} className="h-12 w-auto dark:hidden sm:h-14" />
            <img src={asset('images/su-logo-white.webp')} alt={t(ui.university)} width={604} height={170} className="hidden h-12 w-auto dark:block sm:h-14" />
          </m.div>

          <button
            ref={skipRef}
            type="button"
            onClick={() => setShow(false)}
            className="absolute bottom-6 end-6 rounded-full border border-navy/30 px-5 py-2 font-mono text-sm font-bold text-navy transition hover:bg-navy hover:text-white dark:border-white/30 dark:text-white dark:hover:bg-white dark:hover:text-ink"
          >
            {t(ui.skip)}
            <ChevronIcon className="ms-1 inline h-4 w-4 align-[-3px] rtl:-scale-x-100" />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
