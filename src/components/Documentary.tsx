import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { documentary, type Chapter } from '../content/documentary';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LangProvider';
import { asset } from '../lib/asset';
import { BrandPlaceholder } from './BrandPlaceholder';
import { ChevronIcon, CloseIcon, FilmIcon, PauseIcon, PlayIcon, ReplayIcon } from './Icons';
import { ButtonLink } from './ui';

type Ctx = { open: (opener?: HTMLElement | null) => void };
const DocContext = createContext<Ctx>({ open: () => {} });
export const useDocumentary = () => useContext(DocContext);

/** Wraps the app: provides open() and renders the full-screen documentary viewer. */
export function DocumentaryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((el?: HTMLElement | null) => {
    opener.current = el ?? (document.activeElement as HTMLElement);
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    if (location.hash === '#documentary') history.replaceState(null, '', location.pathname + location.search);
    requestAnimationFrame(() => opener.current?.focus());
  }, []);

  // Shareable link: …/#documentary opens it directly.
  useEffect(() => {
    const check = () => location.hash === '#documentary' && setOpen(true);
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  return (
    <DocContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>{isOpen && <Viewer key="doc" onClose={close} />}</AnimatePresence>
    </DocContext.Provider>
  );
}

function youtubeId(url: string) {
  const mt = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return mt ? mt[1] : null;
}

function Media({ ch, reduce }: { ch: Chapter; reduce: boolean | null }) {
  const { t } = useLang();
  const [broken, setBroken] = useState(false);
  if (ch.video) {
    const id = youtubeId(ch.video);
    return id ? (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
        title={t(ch.title)}
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    ) : (
      <video className="absolute inset-0 h-full w-full bg-black object-contain" src={asset(ch.video)} controls playsInline />
    );
  }
  if (!ch.image || broken) return <BrandPlaceholder className="absolute inset-0" />;
  return (
    <m.img
      src={asset(ch.image)}
      alt=""
      onError={() => setBroken(true)}
      style={{ objectPosition: ch.imagePosition ?? 'center' }}
      className="absolute inset-0 h-full w-full object-cover"
      initial={{ scale: 1.02 }}
      animate={{ scale: reduce ? 1.02 : 1.14 }}
      transition={{ duration: documentary.secondsPerChapter + 2, ease: 'linear' }}
    />
  );
}

function Viewer({ onClose }: { onClose: () => void }) {
  const { t, dir } = useLang();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const chapters = documentary.chapters;
  const ch = chapters[i];
  const last = i === chapters.length - 1;
  const autoplay = !reduce && !ch.video && !last;
  const running = autoplay && !paused && !holding;

  const next = useCallback(() => setI((x) => Math.min(x + 1, chapters.length - 1)), [chapters.length]);
  const prev = useCallback(() => setI((x) => Math.max(x - 1, 0)), []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const fwd = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
      const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
      if (e.key === 'Escape') onClose();
      else if (e.key === fwd) next();
      else if (e.key === back) prev();
      else if (e.key === 'Tab' && boxRef.current) {
        // keep keyboard focus inside the dialog
        const f = boxRef.current.querySelectorAll<HTMLElement>('button, a[href], iframe, video');
        const first = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dir, next, prev, onClose]);

  return (
    <m.div
      ref={boxRef}
      role="dialog"
      aria-modal="true"
      aria-label={t(documentary.title)}
      className="on-dark fixed inset-0 z-[90] overflow-hidden bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence initial={false}>
        <m.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
          <Media ch={ch} reduce={reduce} />
          {!ch.video && (
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.92)_0%,rgba(0,0,0,.55)_38%,rgba(0,0,0,0)_65%,rgba(0,0,0,.55)_100%)]" />
          )}
        </m.div>
      </AnimatePresence>

      {/* Tap zones: start half = previous, end half = next. Hold to pause. */}
      {!ch.video && (
        <div
          className="absolute inset-0 z-10 flex"
          onPointerDown={() => setHolding(true)}
          onPointerUp={() => setHolding(false)}
          onPointerLeave={() => setHolding(false)}
        >
          <button type="button" tabIndex={-1} aria-hidden="true" className="h-full w-1/3 cursor-default focus:outline-none" onClick={prev} />
          <span className="h-full w-1/3" />
          <button type="button" tabIndex={-1} aria-hidden="true" className="h-full w-1/3 cursor-default focus:outline-none" onClick={next} />
        </div>
      )}

      {/* Top bar: progress + title + controls */}
      <div className="absolute inset-x-0 top-0 z-20 mx-auto max-w-5xl px-4 pt-4 sm:px-6">
        <div className="flex gap-1.5" aria-hidden="true">
          {chapters.map((_, k) => (
            <span key={k} className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              {k < i && <span className="absolute inset-0 bg-white" />}
              {k === i && (
                <span
                  key={`p-${i}`}
                  className="absolute inset-0 origin-left bg-sun rtl:origin-right"
                  onAnimationEnd={autoplay ? next : undefined}
                  style={
                    autoplay
                      ? { animation: `progress ${documentary.secondsPerChapter}s linear forwards`, animationPlayState: running ? 'running' : 'paused' }
                      : undefined
                  }
                />
              )}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="flex min-w-0 items-center gap-2 text-sm font-bold">
            <FilmIcon className="h-5 w-5 shrink-0 text-sun" />
            <span className="truncate">{t(documentary.title)}</span>
          </p>
          <div className="flex shrink-0 gap-2">
            {autoplay && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={t(paused ? ui.play : ui.pause)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              >
                {paused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
              </button>
            )}
            <button ref={closeRef} type="button" onClick={onClose} aria-label={t(documentary.close)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Caption */}
      {!ch.video && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto max-w-5xl px-4 pb-24 sm:px-6 sm:pb-28">
          <AnimatePresence mode="wait">
            <m.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              aria-live="polite"
            >
              <p className="font-mono text-xs font-bold uppercase ltr:tracking-widest text-sun sm:text-sm">
                {t(documentary.chapter)} {i + 1} · {t(ch.kicker)}
              </p>
              <h2 className="mt-2 text-4xl font-black leading-tight sm:text-6xl">{t(ch.title)}</h2>
              <p className="mt-3 max-w-2xl text-lg text-white/85 sm:text-2xl">{t(ch.text)}</p>
              {ch.cta && (
                <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-3">
                  <ButtonLink href="join" size="lg">{t(ui.join)}</ButtonLink>
                  <button type="button" onClick={() => setI(0)} className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-5 py-3 font-bold hover:bg-white hover:text-ink">
                    <ReplayIcon className="h-5 w-5" />
                    {t({ ar: 'شاهد من البداية', en: 'Watch again' })}
                  </button>
                </div>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      )}

      {/* Bottom arrows (also usable by keyboard) */}
      <div className="absolute inset-x-0 bottom-0 z-30 mx-auto flex max-w-5xl items-center justify-between px-4 pb-6 sm:px-6">
        <button type="button" onClick={prev} disabled={i === 0} aria-label={t({ ar: 'الفصل السابق', en: 'Previous chapter' })} className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/30 hover:bg-white/20 disabled:opacity-30">
          <ChevronIcon className="h-5 w-5 -scale-x-100 rtl:scale-x-100" />
        </button>
        <span className="font-mono text-sm text-white/70" dir="ltr">{i + 1} / {chapters.length}</span>
        <button type="button" onClick={next} disabled={last} aria-label={t({ ar: 'الفصل التالي', en: 'Next chapter' })} className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/30 hover:bg-white/20 disabled:opacity-30">
          <ChevronIcon className="h-5 w-5 rtl:-scale-x-100" />
        </button>
      </div>
    </m.div>
  );
}

/** The film icon button in the header. */
export function DocumentaryButton() {
  const { t } = useLang();
  const { open } = useDocumentary();
  return (
    <button
      type="button"
      onClick={(e) => open(e.currentTarget)}
      aria-label={t(documentary.watch)}
      className="group relative inline-flex h-10 items-center gap-2 rounded-full bg-white/10 pe-2 ps-2 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-white hover:text-navy sm:pe-4"
    >
      <span className="relative grid h-7 w-7 place-items-center rounded-full bg-ruby text-white">
        <span className="absolute inset-0 rounded-full bg-ruby motion-safe:animate-ping motion-safe:[animation-duration:2.2s]" aria-hidden="true" />
        <FilmIcon className="relative h-4 w-4" />
      </span>
      <span className="hidden sm:inline">{t(documentary.button)}</span>
    </button>
  );
}
