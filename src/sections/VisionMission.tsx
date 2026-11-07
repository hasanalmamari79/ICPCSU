import { about } from '../content/sections';
import { useLang } from '../i18n/LangProvider';
import { OrbitArcs } from '../components/OrbitArcs';
import { Reveal } from '../components/Reveal';
import { Container } from '../components/ui';

/** Big, bold Vision & Mission block. Text lives in src/content/sections.ts (about.vision / about.mission). */
export function VisionMission() {
  const { t } = useLang();
  const blocks = [
    { ...about.vision, code: '// vision', accent: 'bg-sun', glyph: 'eye' as const },
    { ...about.mission, code: '// mission', accent: 'bg-ruby', glyph: 'target' as const },
  ];
  return (
    <section id="vision" aria-label={`${t(about.vision.title)} · ${t(about.mission.title)}`} className="on-dark relative scroll-mt-16 overflow-hidden bg-navy py-20 text-white md:py-28">
      <OrbitArcs tone="light" className="absolute -end-64 top-1/2 h-[52rem] w-[52rem] -translate-y-1/2" strokeWidth={12} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {blocks.map((b, i) => (
            <Reveal key={b.code} delay={i * 0.15} y={36}>
              <article className="relative">
                <p dir="ltr" className="font-mono text-sm font-bold text-sun rtl:text-right">{b.code}</p>
                <div className="mt-3 flex items-center gap-4">
                  <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${b.accent} ${b.accent === 'bg-sun' ? 'text-sun-ink' : 'text-white'}`} aria-hidden="true">
                    {b.glyph === 'eye' ? (
                      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>
                    )}
                  </span>
                  <h2 className="text-4xl font-black md:text-5xl">{t(b.title)}</h2>
                </div>
                <span className={`mt-6 block h-1.5 w-20 rounded-full ${b.accent}`} aria-hidden="true" />
                <p className="mt-6 text-2xl font-bold leading-relaxed text-white md:text-[2rem] md:leading-[1.55]">{t(b.text)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
