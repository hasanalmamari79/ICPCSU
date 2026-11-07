import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LangProvider';
import { CloseIcon, MenuIcon } from './Icons';
import { ClubLogo } from './ClubLogo';
import { ButtonLink } from './ui';
import { DocumentaryButton } from './Documentary';

/** Sticky header that shrinks after scrolling, with AR/EN toggle and mobile menu. */
export function Header() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const LangToggle = ({ className = '' }: { className?: string }) => (
    <button
      type="button"
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      aria-label={t(ui.switchLangLabel)}
      className={`rounded-full border border-white/30 px-3 py-1.5 font-mono text-xs font-bold text-white transition hover:border-sun hover:text-sun ${className}`}
    >
      <span className={lang === 'ar' ? 'text-sun' : 'opacity-70'}>AR</span>
      <span className="mx-1 opacity-50">/</span>
      <span className={lang === 'en' ? 'text-sun' : 'opacity-70'}>EN</span>
    </button>
  );

  return (
    <header
      className={`on-dark sticky top-0 z-50 bg-navy text-white transition-[box-shadow] duration-300 ${scrolled ? 'shadow-[0_8px_30px_rgba(8,50,94,.35)]' : ''}`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-6 lg:px-8 ${scrolled ? 'h-14' : 'h-[4.5rem] md:h-20'}`}
      >
        <a href="#top" className="flex min-w-0 items-center gap-2.5 rounded-lg">
          <span className={`grid shrink-0 place-items-center rounded-full bg-white transition-all duration-300 ${scrolled ? 'h-9 w-9' : 'h-11 w-11 md:h-12 md:w-12'}`}>
            <ClubLogo className="w-[78%]" />
          </span>
          <span className="truncate font-extrabold leading-tight">
            <span className="block text-[0.95rem] md:text-base">{t(ui.clubShort)}</span>
            <span className={`block text-xs font-medium text-white/70 transition-all duration-300 ${scrolled ? 'h-0 opacity-0' : 'h-4 opacity-100'}`}>
              {t(ui.university)}
            </span>
          </span>
        </a>

        <nav aria-label={t({ ar: 'التنقل الرئيسي', en: 'Main navigation' })} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {ui.nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="relative rounded-md px-3 py-2 text-sm font-semibold text-white/85 transition hover:text-white after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded after:bg-sun after:transition-transform hover:after:scale-x-100">
                  {t(n.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <DocumentaryButton />
          <LangToggle />
          <ButtonLink href="join" className="hidden sm:inline-flex" arrow={false}>
            {t(ui.join)}
          </ButtonLink>
          <button
            ref={menuBtn}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t(open ? ui.close : ui.menu)}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label={t(ui.menu)}
            className="border-t border-white/10 bg-navy-deep xl:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="space-y-1 px-4 py-4">
              {ui.nav.map((n, i) => (
                <m.li key={n.id} initial={{ opacity: 0, x: lang === 'ar' ? 16 : -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-lg font-semibold hover:bg-white/10">
                    {t(n.label)}
                  </a>
                </m.li>
              ))}
              <li className="pt-2">
                <ButtonLink href="join" className="w-full">{t(ui.join)}</ButtonLink>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
