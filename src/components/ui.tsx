import type { ReactNode } from 'react';
import { site } from '../config/site';
import { useLang } from '../i18n/LangProvider';
import type { L } from '../i18n/types';
import { ArrowIcon } from './Icons';
import { Reveal } from './Reveal';

/** Resolves content hrefs: 'join' → Google Form, '#id' → section, else as-is. */
export function resolveHref(href: string) {
  if (href === 'join') return { href: site.joinFormUrl, external: true };
  return { href, external: /^https?:/.test(href) };
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'ghost-dark';
  size?: 'md' | 'lg';
  className?: string;
  arrow?: boolean;
};

/** Link styled as a button. Primary = yellow "action" colour with dark text. */
export function ButtonLink({ href, children, variant = 'primary', size = 'md', className = '', arrow = true }: BtnProps) {
  const { href: url, external } = resolveHref(href);
  const { t } = useLang();
  const sizes = size === 'lg' ? 'px-8 py-4 text-lg' : 'px-5 py-2.5 text-[0.95rem]';
  const variants = {
    primary: 'bg-sun text-sun-ink hover:bg-[#f7c35e] shadow-[0_6px_0_0_rgba(15,26,42,.25)] hover:shadow-[0_8px_0_0_rgba(15,26,42,.25)] active:shadow-[0_2px_0_0_rgba(15,26,42,.25)] active:translate-y-[3px]',
    ghost: 'border-2 border-white/70 text-white hover:bg-white hover:text-ink',
    'ghost-dark': 'border-2 border-navy text-navy hover:bg-navy hover:text-white dark:border-white/70 dark:text-white dark:hover:bg-white dark:hover:text-ink',
  }[variant];
  return (
    <a
      href={url}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none ${sizes} ${variants} ${className}`}
    >
      {children}
      {arrow && <ArrowIcon className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />}
      {external && <span className="sr-only">{t({ ar: '(يفتح في نافذة جديدة)', en: '(opens in a new tab)' })}</span>}
    </a>
  );
}

/** Mono code label + big title + optional intro, revealed on scroll. */
export function SectionHeading({
  label, title, intro, onDark = false, center = false, id,
}: { label: string; title: L; intro?: L; onDark?: boolean; center?: boolean; id?: string }) {
  const { t } = useLang();
  return (
    <Reveal className={`mb-10 md:mb-14 ${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <p dir="ltr" className={`font-mono text-sm font-bold tracking-wide ${onDark ? 'text-sun' : 'text-sky dark:text-sun'} ${center ? '' : 'rtl:text-right'}`}>
        {label}
      </p>
      <h2 id={id} className={`mt-2 text-3xl font-extrabold leading-tight md:text-5xl ${onDark ? 'text-white' : 'text-ink dark:text-white'}`}>
        {t(title)}
      </h2>
      {intro && <p className={`mt-4 text-lg ${onDark ? 'text-white/80' : 'text-ink/70 dark:text-white/70'}`}>{t(intro)}</p>}
    </Reveal>
  );
}

/** Standard section wrapper with scroll offset for the sticky header. */
export function Section({
  id, children, className = '', labelledBy,
}: { id: string; children: ReactNode; className?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative scroll-mt-16 overflow-hidden py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);
