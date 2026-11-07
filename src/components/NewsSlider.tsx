import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { site } from '../config/site';
import { news, type NewsItem } from '../content/news';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LangProvider';
import { asset } from '../lib/asset';
import { BrandPlaceholder } from './BrandPlaceholder';
import { ChevronIcon, PauseIcon, PlayIcon } from './Icons';
import { ButtonLink } from './ui';

function SlideImage({ item, active, priority }: { item: NewsItem; active: boolean; priority: boolean }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [broken, setBroken] = useState(false);
  if (!item.image || broken) return <BrandPlaceholder className="absolute inset-0" />;
  return (
    <m.img
      src={asset(item.image)}
      srcSet={item.imageSmall ? `${asset(item.imageSmall)} 600w, ${asset(item.image)} 1280w` : undefined}
      sizes="100vw"
      alt={t(item.imageAlt)}
      width={1280}
      height={720}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchpriority: 'high' } : {})}
      onError={() => setBroken(true)}
      style={{ objectPosition: item.imagePosition ?? 'center' }}
      className="absolute inset-0 h-full w-full object-cover"
      // Ken Burns: slow zoom while the slide is on screen.
      initial={{ scale: 1 }}
      animate={{ scale: active && !reduce ? 1.09 : 1 }}
      transition={{ duration: site.newsSlideSeconds + 1.5, ease: 'linear' }}
    />
  );
}

/** Newspaper-style headline slider at the top of the home page. */
export function NewsSlider() {
  const { t, dir } = useLang();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = news.length;

  const go = useCallback(
    (to: number, d?: number) => {
      setDirection(d ?? (to > index ? 1 : -1));
      setIndex(((to % count) + count) % count);
    },
    [index, count],
  );
  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  // Auto-advance is off for reduced-motion users; they can still use the arrows.
  const autoplay = !reduce && count > 1;
  const paused = !autoplay || hovered || focused || userPaused;

  const onKey = (e: React.KeyboardEvent) => {
    const fwd = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === fwd) next();
    if (e.key === back) prev();
  };

  const onTouchEnd = (x: number) => {
    if (touchX.current == null) return;
    const dx = x - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 45) return;
    // Swipe toward the reading direction = next.
    const forward = dir === 'rtl' ? dx > 0 : dx < 0;
    forward ? next() : prev();
  };

  const item = news[index];
  const sign = dir === 'rtl' ? -1 : 1;

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label={t({ ar: 'آخر الأخبار', en: 'Latest news' })}
      className="on-dark relative isolate h-[clamp(460px,78svh,760px)] w-full overflow-hidden bg-ink text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setFocused(false)}
      onKeyDown={onKey}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <m.div
          key={item.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} / ${count}`}
          className="absolute inset-0"
          custom={direction}
          initial={{ opacity: 0, x: `${direction * sign * 6}%` }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: `${-direction * sign * 6}%` }}
          transition={{ duration: 0.8, ease: [0.3, 0.7, 0.2, 1] }}
        >
          <SlideImage item={item} active priority={index === 0} />
          {/* Legibility scrim: dark at the bottom where the headline sits */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,26,42,.95)_0%,rgba(15,26,42,.75)_35%,rgba(15,26,42,.1)_70%,rgba(15,26,42,.25)_100%)]" />

          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:pb-28 lg:px-8">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase ltr:tracking-widest text-sun sm:text-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-ruby motion-safe:animate-pulse" aria-hidden="true" />
                {t(item.kicker)}
              </p>
              <h2 className="text-[1.9rem] font-black leading-[1.15] sm:text-5xl md:text-6xl">{t(item.headline)}</h2>
              <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-xl">{t(item.subtitle)}</p>
              <div className="mt-6">
                <ButtonLink href={item.cta.href} size="md">
                  {t(item.cta.label)}
                </ButtonLink>
              </div>
            </m.div>
          </div>
        </m.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-6xl items-center gap-3 px-4 pb-6 sm:px-6 md:pb-8 lg:px-8">
        <div className="flex flex-1 gap-2" role="group" aria-label={t(ui.goToSlide)}>
          {news.map((n, i) => (
            <button
              key={n.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`${t(ui.goToSlide)} ${i + 1}: ${t(n.headline)}`}
              aria-current={i === index ? 'true' : undefined}
              className="group relative h-6 flex-1 cursor-pointer"
            >
              <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/25 transition group-hover:bg-white/40">
                {i === index && (
                  <span
                    key={`${n.id}-${index}`}
                    className="absolute inset-0 origin-left rounded-full bg-sun rtl:origin-right"
                    onAnimationEnd={autoplay ? next : undefined}
                    style={
                      autoplay
                        ? {
                            animation: `progress ${site.newsSlideSeconds}s linear forwards`,
                            animationPlayState: paused ? 'paused' : 'running',
                          }
                        : undefined
                    }
                  />
                )}
                {i < index && <span className="absolute inset-0 rounded-full bg-white/60" />}
              </span>
            </button>
          ))}
        </div>
        {autoplay && (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={t(userPaused ? ui.play : ui.pause)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/30 hover:bg-white/15"
          >
            {userPaused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
          </button>
        )}
        <button type="button" onClick={prev} aria-label={t(ui.prev)} className="grid h-10 w-10 place-items-center rounded-full border border-white/30 hover:bg-white/15">
          <ChevronIcon className="h-5 w-5 -scale-x-100 rtl:scale-x-100" />
        </button>
        <button type="button" onClick={next} aria-label={t(ui.next)} className="grid h-10 w-10 place-items-center rounded-full border border-white/30 hover:bg-white/15">
          <ChevronIcon className="h-5 w-5 rtl:-scale-x-100" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">{`${index + 1} / ${count}: ${t(item.headline)}`}</p>
    </section>
  );
}
