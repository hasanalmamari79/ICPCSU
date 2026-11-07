import { AnimatePresence, m } from 'framer-motion';
import { useRef, useState } from 'react';
import { team, type Person } from '../content/team';
import { useLang } from '../i18n/LangProvider';
import { asset, isPlaceholder } from '../lib/asset';
import { ClubLogo } from '../components/ClubLogo';
import { Container, Section, SectionHeading, ButtonLink } from '../components/ui';
import { ui } from '../content/ui';

const soon = { ar: 'يُعلَن قريبًا', en: 'Announced soon' };
const named = (people: Person[]) => people.filter((p) => p.name).length;

const AVATAR_COLORS = ['bg-navy text-white', 'bg-sky text-white', 'bg-ruby text-white', 'bg-sun text-sun-ink'];
const TITLES = /^(prof\.?|dr\.?|eng\.?|أ\.?\s?د\.?|د\.|م\.)\s*/i;

function initials(name: string, lang: string) {
  const words = name.replace(TITLES, '').replace(TITLES, '').trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '?';
  const first = words[0][0];
  // Arabic letters join into a word, so use one letter only.
  if (lang === 'ar') return first;
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}

function Avatar({ person, i }: { person: Person; i: number }) {
  const { t, lang } = useLang();
  const [broken, setBroken] = useState(false);
  const name = person.name ? t(person.name) : '';
  const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
  if (person.photo && !broken) {
    return (
      <img
        src={asset(person.photo)}
        alt=""
        loading="lazy"
        decoding="async"
        width={400}
        height={400}
        onError={() => setBroken(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
      />
    );
  }
  return (
    <div className={`grid h-full w-full place-items-center ${color}`} aria-hidden="true">
      {!name || isPlaceholder(name) ? (
        <ClubLogo className="w-1/2 rounded-full bg-white p-2 opacity-90" />
      ) : (
        <span className="text-4xl font-black tracking-tight">{initials(name, lang)}</span>
      )}
    </div>
  );
}

export function Team() {
  const { t, dir } = useLang();
  const [active, setActive] = useState(team.groups[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = team.groups.find((g) => g.id === active)!;

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern), mirrored in RTL.
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = team.groups.length;
    const fwd = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    let to = -1;
    if (e.key === fwd) to = (i + 1) % n;
    if (e.key === back) to = (i - 1 + n) % n;
    if (e.key === 'Home') to = 0;
    if (e.key === 'End') to = n - 1;
    if (to < 0) return;
    e.preventDefault();
    setActive(team.groups[to].id);
    tabRefs.current[to]?.focus();
  };

  return (
    <Section id="team" labelledBy="team-title" className="bg-white dark:bg-ink-soft">
      <Container>
        <SectionHeading id="team-title" label={team.label} title={team.title} />

        <div role="tablist" aria-label={t(team.title)} className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {team.groups.map((g, i) => {
            const selected = g.id === active;
            return (
              <button
                key={g.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={selected}
                aria-controls={`panel-${g.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(g.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 font-bold transition ${selected ? 'text-white' : 'text-ink/70 hover:bg-surface hover:text-ink dark:text-white/70 dark:hover:bg-ink dark:hover:text-white'}`}
              >
                {selected && (
                  <m.span layoutId="team-tab" className="absolute inset-0 rounded-full bg-navy dark:bg-sky" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">
                  {t(g.label)}
                  {named(g.people) > 0 && <span className="font-mono text-xs opacity-70"> {named(g.people)}</span>}
                </span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={`panel-${group.id}`} aria-labelledby={`tab-${group.id}`} tabIndex={0} className="rounded-3xl">
          <AnimatePresence mode="wait">
            <m.ul
              key={group.id}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
            >
              {group.people.map((p, i) => (
                <m.li
                  key={`${group.id}-${i}`}
                  variants={{ hidden: { opacity: 0, y: 20, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
                  className="group"
                >
                  <article className="h-full overflow-hidden rounded-3xl bg-surface ring-1 ring-ink/5 transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl dark:bg-ink dark:ring-white/10 motion-reduce:transform-none">
                    <div className="relative aspect-square overflow-hidden">
                      <Avatar person={p} i={i} />
                      <span className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-sun transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right" aria-hidden="true" />
                    </div>
                    <div className="p-4">
                      {p.name ? (
                        <>
                          <h3 className="font-extrabold leading-snug text-ink dark:text-white">{t(p.name)}</h3>
                          <p className="mt-1 text-sm font-medium text-sky dark:text-sun">{t(p.role)}</p>
                        </>
                      ) : (
                        <>
                          <h3 className="font-extrabold leading-snug text-ink dark:text-white">{t(p.role)}</h3>
                          <p className="mt-1 text-sm font-semibold text-sky dark:text-sun">{t(soon)}</p>
                        </>
                      )}
                    </div>
                  </article>
                </m.li>
              ))}
            </m.ul>
          </AnimatePresence>
          {group.people.length === 0 && group.emptyNote && (
            <div className="flex flex-col items-start gap-5 rounded-3xl border-2 border-dashed border-ink/15 p-8 dark:border-white/15 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-semibold text-ink/75 dark:text-white/75">{t(group.emptyNote)}</p>
              <ButtonLink href="join">{t(ui.join)}</ButtonLink>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
