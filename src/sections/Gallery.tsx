import { AnimatePresence, m } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { gallery, type Photo } from '../content/gallery';
import { useLang } from '../i18n/LangProvider';
import { asset } from '../lib/asset';
import { BrandPlaceholder } from '../components/BrandPlaceholder';
import { ChevronIcon, CloseIcon } from '../components/Icons';
import { Container, Section, SectionHeading } from '../components/ui';
import { Reveal } from '../components/Reveal';

function Thumb({ photo, big }: { photo: Photo; big: boolean }) {
  const { t } = useLang();
  const [broken, setBroken] = useState(false);
  if (broken) return <BrandPlaceholder className="absolute inset-0" logo={false} />;
  return (
    <img
      src={asset(big ? photo.image : (photo.imageSmall ?? photo.image))}
      alt={t(photo.alt)}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
      style={{ objectPosition: photo.position ?? 'center' }}
      className="block h-auto w-full transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none md:absolute md:inset-0 md:h-full md:object-cover"
    />
  );
}

function Lightbox({ photos, index, onClose, onGo }: { photos: Photo[]; index: number; onClose: () => void; onGo: (i: number) => void }) {
  const { t, dir } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const p = photos[index];
  const n = photos.length;
  const next = useCallback(() => onGo((index + 1) % n), [index, n, onGo]);
  const prev = useCallback(() => onGo((index - 1 + n) % n), [index, n, onGo]);

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      const fwd = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
      const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
      if (e.key === 'Escape') onClose();
      if (e.key === fwd) next();
      if (e.key === back) prev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [dir, next, prev, onClose]);

  return (
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label={t(p.caption)}
      className="on-dark fixed inset-0 z-[80] flex flex-col bg-ink/95 text-white backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 45) ((dir === 'rtl' ? dx > 0 : dx < 0) ? next : prev)();
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-mono text-sm text-white/70" dir="ltr">{index + 1} / {n}</span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t({ ar: 'إغلاق', en: 'Close' })} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
          <CloseIcon />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <AnimatePresence mode="wait">
          <m.img
            key={p.image}
            src={asset(p.image)}
            alt={t(p.alt)}
            className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
        {n > 1 && (
          <>
            <button type="button" onClick={prev} aria-label={t({ ar: 'الصورة السابقة', en: 'Previous photo' })} className="absolute start-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/40 hover:bg-white/20 sm:start-4">
              <ChevronIcon className="h-6 w-6 -scale-x-100 rtl:scale-x-100" />
            </button>
            <button type="button" onClick={next} aria-label={t({ ar: 'الصورة التالية', en: 'Next photo' })} className="absolute end-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/40 hover:bg-white/20 sm:end-4">
              <ChevronIcon className="h-6 w-6 rtl:-scale-x-100" />
            </button>
          </>
        )}
      </div>
      <p className="px-4 py-5 text-center text-lg font-semibold sm:px-6" aria-live="polite">{t(p.caption)}</p>
    </m.div>
  );
}

const PHONE_LIMIT = 4;

function AlbumGrid({ photos, onOpen }: { photos: Photo[]; onOpen: (i: number, el: HTMLElement) => void }) {
  const { t } = useLang();
  const [all, setAll] = useState(false);
  const hiddenCount = photos.length - PHONE_LIMIT;
  return (
    <>
    {/* Phones: one column, each photo shown whole. Wider screens: mosaic grid. */}
    <ul className="grid grid-cols-1 gap-3 md:auto-rows-[12rem] md:grid-cols-3 md:gap-4 lg:auto-rows-[14rem]">
      {photos.map((p, i) => {
        const big = i === 0;
        // Fill the last row so the grid never leaves an empty hole.
        const isLast = i === photos.length - 1 && i > 0;
        const n = photos.length;
        const rem = n > 3 ? (n - 3) % 3 : 0;
        const span = isLast && rem === 2 ? 'md:col-span-2' : isLast && rem === 1 ? 'md:col-span-3' : '';
        const phoneHidden = !all && i >= PHONE_LIMIT ? 'max-md:hidden' : '';
        return (
          <m.li
            key={p.image}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
            className={`${big ? 'md:col-span-2 md:row-span-2' : span} ${phoneHidden}`}
          >
            <button
              type="button"
              onClick={(e) => onOpen(i, e.currentTarget)}
              className="group relative block w-full overflow-hidden rounded-3xl bg-navy text-start md:h-full"
              aria-label={`${t(p.caption)} — ${t({ ar: 'عرض الصورة', en: 'view photo' })}`}
            >
              <Thumb photo={p} big={big} />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-sm font-bold text-white transition-opacity duration-300 sm:text-base lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                {t(p.caption)}
              </span>
            </button>
          </m.li>
        );
      })}
    </ul>
    {!all && hiddenCount > 0 && (
      <button
        type="button"
        onClick={() => setAll(true)}
        className="mt-4 w-full rounded-2xl border-2 border-navy/20 py-3 font-bold text-navy dark:border-white/20 dark:text-white md:hidden"
      >
        {t({ ar: `عرض كل الصور (${photos.length})`, en: `Show all photos (${photos.length})` })}
      </button>
    )}
    </>
  );
}

function ComingSoon({ count }: { count: number }) {
  const { t } = useLang();
  return (
    <ul className="grid grid-cols-1 gap-3 md:auto-rows-[12rem] md:grid-cols-3 md:gap-4 lg:auto-rows-[14rem]">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className={`relative aspect-video overflow-hidden rounded-3xl md:aspect-auto ${i === 0 ? 'md:col-span-2 md:row-span-2' : 'max-md:hidden'}`}>
          <BrandPlaceholder className="absolute inset-0" logo={i === 0} />
          {i === 0 && (
            <span className="absolute bottom-4 start-4 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-navy shadow">{t(gallery.soon)}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Gallery() {
  const { t } = useLang();
  const [open, setOpen] = useState<{ album: string; i: number } | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const byAlbum = (id: string) => gallery.photos.filter((p) => p.album === id);

  const close = () => {
    setOpen(null);
    requestAnimationFrame(() => opener.current?.focus());
  };

  return (
    <Section id="highlights" labelledBy="gallery-title" className="bg-white dark:bg-ink-soft">
      <Container>
        <SectionHeading id="gallery-title" label={gallery.label} title={gallery.title} intro={gallery.intro} />
        <div className="space-y-16">
          {gallery.albums.map((a, k) => {
            const photos = byAlbum(a.id);
            return (
              <div key={a.id}>
                <Reveal className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="inline-flex items-center gap-2 font-mono text-sm font-bold text-sky dark:text-sun">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-xs text-white dark:bg-sun dark:text-sun-ink">{k + 1}</span>
                      <span>{photos.length ? t({ ar: `${photos.length} صور`, en: `${photos.length} photos` }) : t(gallery.soon)}</span>
                    </p>
                    <h3 className="mt-2 text-2xl font-extrabold text-ink dark:text-white md:text-3xl">{t(a.label)}</h3>
                  </div>
                  <p className="max-w-md text-ink/70 dark:text-white/70">{t(a.text)}</p>
                </Reveal>
                {photos.length ? (
                  <AlbumGrid
                    photos={photos}
                    onOpen={(i, el) => {
                      opener.current = el;
                      setOpen({ album: a.id, i });
                    }}
                  />
                ) : (
                  <ComingSoon count={a.placeholders ?? 3} />
                )}
              </div>
            );
          })}
        </div>
      </Container>
      <AnimatePresence>
        {open && (
          <Lightbox photos={byAlbum(open.album)} index={open.i} onClose={close} onGo={(i) => setOpen({ album: open.album, i })} />
        )}
      </AnimatePresence>
    </Section>
  );
}
