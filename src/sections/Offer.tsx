import { offer } from '../content/sections';
import { useLang } from '../i18n/LangProvider';
import { OfferIcons } from '../components/Icons';
import { OrbitArcs } from '../components/OrbitArcs';
import { Reveal } from '../components/Reveal';
import { Container, Section, SectionHeading } from '../components/ui';

const accents = [
  { bg: 'bg-sky', ring: 'group-hover:ring-sky', text: 'text-sky' },
  { bg: 'bg-sun', ring: 'group-hover:ring-sun', text: 'text-sun' },
  { bg: 'bg-ruby', ring: 'group-hover:ring-ruby', text: 'text-ruby' },
  { bg: 'bg-navy', ring: 'group-hover:ring-navy dark:group-hover:ring-white/60', text: 'text-navy dark:text-white' },
];

export function Offer() {
  const { t } = useLang();
  return (
    <Section id="offer" labelledBy="offer-title" className="bg-white dark:bg-ink-soft">
      <OrbitArcs className="absolute -end-48 -top-48 h-[34rem] w-[34rem] opacity-[0.08] dark:opacity-15" strokeWidth={16} />
      <Container>
        <SectionHeading id="offer-title" label={offer.label} title={offer.title} intro={offer.intro} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offer.items.map((item, i) => {
            const Icon = OfferIcons[item.icon];
            const a = accents[i % accents.length];
            return (
              <Reveal as="li" key={item.icon} delay={i * 0.1}>
                <article
                  className={`group relative h-full overflow-hidden rounded-3xl bg-surface p-7 ring-2 ring-transparent transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-xl dark:bg-ink dark:hover:bg-ink ${a.ring} motion-reduce:transform-none`}
                >
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl ${a.bg} ${a.bg === 'bg-sun' ? 'text-sun-ink' : 'text-white'} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transform-none`}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <p dir="ltr" className="mt-6 font-mono text-xs font-bold text-ink/40 dark:text-white/40 rtl:text-right">0{i + 1}</p>
                  <h3 className="mt-1 text-xl font-extrabold text-ink dark:text-white">{t(item.title)}</h3>
                  <p className="mt-2 leading-relaxed text-ink/70 dark:text-white/70">{t(item.text)}</p>
                  <span className={`absolute -bottom-10 -end-10 h-24 w-24 rounded-full border-[10px] border-current opacity-0 transition-all duration-500 group-hover:opacity-20 ${a.text}`} aria-hidden="true" />
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
