import { join } from '../content/sections';
import { useLang } from '../i18n/LangProvider';
import { OrbitArcs } from '../components/OrbitArcs';
import { Reveal } from '../components/Reveal';
import { ButtonLink, Container, Section, SectionHeading } from '../components/ui';

export function Join() {
  const { t } = useLang();
  const colors = ['bg-sky text-white', 'bg-ruby text-white', 'bg-sun text-sun-ink'];
  return (
    <Section id="join" labelledBy="join-title" className="on-dark bg-navy-deep text-white">
      <OrbitArcs tone="light" className="absolute left-1/2 top-1/2 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 opacity-60" strokeWidth={10} />
      <Container>
        <SectionHeading id="join-title" label={join.label} title={join.title} intro={join.intro} onDark center />
        <ol className="grid gap-5 md:grid-cols-3">
          {join.steps.map((s, i) => (
            <Reveal as="li" key={i} delay={i * 0.15}>
              <div className="group relative h-full rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/10 motion-reduce:transform-none">
                <span className={`grid h-14 w-14 place-items-center rounded-2xl font-mono text-2xl font-bold transition-transform duration-300 group-hover:rotate-6 motion-reduce:transform-none ${colors[i % 3]}`}>
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-extrabold">{t(s.title)}</h3>
                <p className="mt-2 text-white/75">{t(s.text)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-14 text-center" delay={0.3}>
          <ButtonLink href="join" size="lg" className="px-10 py-5 text-xl">
            {t(join.cta)}
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
