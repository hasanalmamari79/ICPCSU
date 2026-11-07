import { m, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { achievements } from '../content/achievements';
import { useLang } from '../i18n/LangProvider';
import { isPlaceholder } from '../lib/asset';
import { CountUp } from '../components/CountUp';
import { Reveal } from '../components/Reveal';
import { Container, Section, SectionHeading } from '../components/ui';
import { useDocumentary } from '../components/Documentary';
import { documentary } from '../content/documentary';
import { FilmIcon } from '../components/Icons';

export function Achievements() {
  const { t, lang } = useLang();
  const { open } = useDocumentary();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section id="achievements" labelledBy="ach-title" className="bg-surface dark:bg-ink">
      <Container>
        <SectionHeading id="ach-title" label={achievements.label} title={achievements.title} intro={achievements.intro} />

        <Reveal className="-mt-4 mb-10">
          <button
            type="button"
            onClick={(e) => open(e.currentTarget)}
            className="inline-flex items-center gap-3 rounded-full bg-navy py-2 pe-6 ps-2 font-bold text-white transition hover:-translate-y-0.5 hover:bg-sky motion-reduce:transform-none dark:bg-sky dark:hover:bg-navy"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ruby"><FilmIcon className="h-5 w-5" /></span>
            {t(documentary.watch)}
          </button>
        </Reveal>
        <ul className={`grid gap-4 ${achievements.counters.length % 2 ? 'sm:grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}>
          {achievements.counters.map((c, i) => (
            <Reveal as="li" key={i} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 dark:bg-ink-soft dark:ring-white/10">
                <p className="font-mono text-4xl font-bold text-navy dark:text-sun md:text-5xl">
                  <span dir="ltr"><CountUp value={c.value} plain={c.plain} /></span>
                </p>
                <span className="mt-3 block h-1.5 w-10 rounded-full bg-sun" aria-hidden="true" />
                <p className="mt-3 font-semibold text-ink/75 dark:text-white/75">{t(c.label)}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <ol ref={listRef} className="relative mt-20 space-y-10 md:space-y-14">
          {/* track + scroll-linked progress line */}
          <span className="absolute inset-y-0 start-[1.1rem] w-1 rounded-full bg-ink/10 md:start-1/2 md:-ms-0.5 dark:bg-white/10" aria-hidden="true" />
          <m.span
            style={{ scaleY: lineScale }}
            className="absolute inset-y-0 start-[1.1rem] w-1 origin-top rounded-full bg-sky md:start-1/2 md:-ms-0.5 dark:bg-sun"
            aria-hidden="true"
          />
          {achievements.timeline.map((e, i) => {
            const side = i % 2 === 0 ? 'md:ps-0 md:pe-[calc(50%+2.5rem)]' : 'md:ps-[calc(50%+2.5rem)]';
            return (
              <li key={i} className={`relative ps-14 ${side}`}>
                <span
                  className={`absolute start-0 top-1 grid h-10 w-10 place-items-center rounded-full ring-4 ring-surface dark:ring-ink md:start-1/2 md:-ms-5 ${e.highlight ? 'bg-sun' : 'bg-navy dark:bg-sky'}`}
                  aria-hidden="true"
                >
                  <span className={`h-3 w-3 rounded-full ${e.highlight ? 'bg-ruby' : 'bg-white'}`} />
                </span>
                <Reveal y={20} className={i % 2 === 0 ? 'md:text-end' : ''}>
                  <div
                    className={`inline-block w-full rounded-3xl p-6 text-start ${
                      e.highlight
                        ? 'bg-navy text-white shadow-xl ring-4 ring-sun'
                        : 'bg-white shadow-sm ring-1 ring-ink/5 dark:bg-ink-soft dark:ring-white/10'
                    }`}
                  >
                    <p className={`font-mono text-sm font-bold ${e.highlight ? 'text-sun' : 'text-sky dark:text-sun'} ${isPlaceholder(t(e.date)) ? 'opacity-70' : ''}`}>
                      {t(e.date)}
                    </p>
                    <h3 className={`mt-1 text-xl font-extrabold ${e.highlight ? '' : 'text-ink dark:text-white'}`}>{t(e.title)}</h3>
                    <p className={`mt-2 ${e.highlight ? 'text-white/85' : 'text-ink/70 dark:text-white/70'}`} lang={lang}>
                      {t(e.text)}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
