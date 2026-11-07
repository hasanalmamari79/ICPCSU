import { about } from '../content/sections';
import { useLang } from '../i18n/LangProvider';
import { asset } from '../lib/asset';
import { OrbitArcs } from '../components/OrbitArcs';
import { Reveal } from '../components/Reveal';
import { Container, Section, SectionHeading } from '../components/ui';

export function About() {
  const { t } = useLang();
  return (
    <Section id="about" labelledBy="about-title" className="bg-surface dark:bg-ink">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading id="about-title" label={about.label} title={about.title} />
          <Reveal>
            <p className="text-lg leading-relaxed text-ink/80 dark:text-white/80">{t(about.body)}</p>
          </Reveal>
        </div>

        <Reveal className="relative mx-auto w-full max-w-lg" y={40}>
          <OrbitArcs className="absolute -inset-[14%] opacity-90" strokeWidth={10} />
          <figure className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-8 ring-white dark:ring-ink-soft">
            <img
              src={asset('images/team-stage-front-768.webp')}
              srcSet={`${asset('images/team-stage-front-768.webp')} 768w, ${asset('images/team-stage-front.webp')} 1280w`}
              sizes="(min-width: 1024px) 512px, 100vw"
              alt={t({ ar: 'أعضاء نادي ICPC على المسرح مع علم جامعة صحار', en: 'ICPC club members on stage with the Sohar University flag' })}
              width={1280}
              height={720}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
