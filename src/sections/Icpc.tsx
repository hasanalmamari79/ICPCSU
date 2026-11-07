import { m } from 'framer-motion';
import { site } from '../config/site';
import { icpc } from '../content/sections';
import { useLang } from '../i18n/LangProvider';
import { CountUp } from '../components/CountUp';
import { ExternalIcon } from '../components/Icons';
import { OrbitArcs } from '../components/OrbitArcs';
import { Reveal } from '../components/Reveal';
import { Container, Section, SectionHeading } from '../components/ui';

export function Icpc() {
  const { t } = useLang();
  return (
    <Section id="icpc" labelledBy="icpc-title" className="on-dark bg-navy text-white">
      <OrbitArcs tone="light" className="absolute -start-56 top-1/2 h-[46rem] w-[46rem] -translate-y-1/2" strokeWidth={14} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <SectionHeading id="icpc-title" label={icpc.label} title={icpc.title} onDark />
            <Reveal>
              <p className="text-lg leading-relaxed text-white/85">{t(icpc.body)}</p>
              <a
                href={site.icpcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 border-b-2 border-sun pb-1 font-bold text-sun transition hover:gap-3"
              >
                {t(icpc.link)} <span dir="ltr" className="font-mono text-sm">icpc.global</span>
                <ExternalIcon className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          <ul className="grid grid-cols-3 gap-3 sm:gap-4">
            {icpc.stats.map((s, i) => (
              <Reveal as="li" key={i} delay={i * 0.12}>
                <div className="rounded-3xl bg-white/[0.07] p-4 text-center ring-1 ring-white/10 backdrop-blur-sm sm:p-6">
                  <CountUp value={s.value} className="block font-mono text-5xl font-bold leading-none text-sun sm:text-7xl" />
                  <span className="mt-3 block text-sm font-semibold text-white/80 sm:text-base">{t(s.label)}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Path: University → National → Regional (ACPC) → World Finals */}
        <Reveal className="mt-20">
          <h3 className="text-2xl font-extrabold">{t(icpc.pathTitle)}</h3>
        </Reveal>
        <ol className="relative mt-10 grid gap-8 md:grid-cols-4 md:gap-4">
          {/* connecting line that draws itself */}
          <m.span
            aria-hidden="true"
            className="absolute start-[1.375rem] top-2 h-[calc(100%-1rem)] w-1 origin-top rounded-full bg-sun/70 md:start-0 md:top-[1.375rem] md:h-1 md:w-full md:origin-left rtl:md:origin-right"
            initial={{ scaleY: 0, scaleX: 0 }}
            whileInView={{ scaleY: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
          {icpc.path.map((p, i) => {
            const last = i === icpc.path.length - 1;
            return (
              <Reveal as="li" key={i} delay={0.25 + i * 0.25} className="relative flex gap-5 md:block">
                <span
                  className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full font-mono text-lg font-bold ring-4 ring-navy ${last ? 'bg-sun text-sun-ink' : 'bg-white text-navy'}`}
                >
                  {i + 1}
                </span>
                <div className="md:mt-5">
                  <p className={`text-xl font-extrabold ${last ? 'text-sun' : ''}`}>{t(p.title)}</p>
                  <p className="mt-1 text-white/75">{t(p.text)}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
