import { AnimatePresence, m } from 'framer-motion';
import { useRef, useState } from 'react';
import { quiz } from '../content/quiz';
import { ui } from '../content/ui';
import { useLang } from '../i18n/LangProvider';
import { ChevronIcon } from '../components/Icons';
import { OrbitArcs } from '../components/OrbitArcs';
import { ButtonLink, Container, Section, SectionHeading } from '../components/ui';

type Stage = 'intro' | 'questions' | 'result';
const MAX = quiz.questions.reduce((s, q) => s + Math.max(...q.options.map((o) => o.points)), 0);

export function Quiz() {
  const { t, dir } = useLang();
  const s = dir === 'rtl' ? -1 : 1;
  const [stage, setStage] = useState<Stage>('intro');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => quiz.questions.map(() => null));
  const cardRef = useRef<HTMLDivElement>(null);

  const focusCard = () => requestAnimationFrame(() => cardRef.current?.focus({ preventScroll: true }));
  const q = quiz.questions[step];
  const chosen = answers[step];
  const last = step === quiz.questions.length - 1;

  const score = answers.reduce<number>((s, a, i) => s + (a == null ? 0 : quiz.questions[i].options[a].points), 0);
  const track = quiz.tracks.find((tr) => score >= tr.min)!;

  const choose = (k: number) => setAnswers((a) => a.map((v, i) => (i === step ? k : v)));
  const goNext = () => {
    if (last) setStage('result');
    else setStep((s) => s + 1);
    focusCard();
  };
  const restart = () => {
    setAnswers(quiz.questions.map(() => null));
    setStep(0);
    setStage('questions');
    focusCard();
  };

  return (
    <Section id="quiz" labelledBy="quiz-title" className="bg-surface dark:bg-ink">
      <OrbitArcs className="absolute -start-40 bottom-[-10rem] h-[30rem] w-[30rem] opacity-[0.08] dark:opacity-15" strokeWidth={16} />
      <Container className="max-w-3xl">
        <SectionHeading id="quiz-title" label={quiz.label} title={quiz.title} intro={quiz.intro} center />

        <div
          ref={cardRef}
          tabIndex={-1}
          className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-ink/5 outline-none dark:bg-ink-soft dark:ring-white/10 sm:p-10"
        >
          <AnimatePresence mode="wait" initial={false}>
            {stage === 'intro' && (
              <m.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <p dir="ltr" className="font-mono text-sm text-ink/60 dark:text-white/60">
                  <span className="text-sky dark:text-sun">while</span> (curious) {'{'} learn(); {'}'}
                </p>
                <div className="mt-6 flex justify-center gap-3" aria-hidden="true">
                  {['Beginner', 'Intermediate', 'Advanced'].map((l, k) => (
                    <span key={l} className={`h-3 rounded-full ${['w-10 bg-sky', 'w-14 bg-sun', 'w-20 bg-ruby'][k]}`} />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStage('questions');
                    focusCard();
                  }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-sky motion-reduce:transform-none dark:bg-sky dark:hover:bg-navy"
                >
                  {t(quiz.start)}
                  <ChevronIcon className="h-5 w-5 rtl:-scale-x-100" />
                </button>
              </m.div>
            )}

            {stage === 'questions' && (
              <m.div key={`q-${step}`} initial={{ opacity: 0, x: 24 * s }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 * s }} transition={{ duration: 0.25 }}>
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-sm font-bold text-sky dark:text-sun">
                    {t(quiz.questionOf)} {step + 1} {t(quiz.of)} {quiz.questions.length}
                  </p>
                  <div className="flex gap-1.5" aria-hidden="true">
                    {quiz.questions.map((_, k) => (
                      <span key={k} className={`h-1.5 w-6 rounded-full transition-colors ${k <= step ? 'bg-sun' : 'bg-ink/10 dark:bg-white/15'}`} />
                    ))}
                  </div>
                </div>

                <fieldset className="mt-5">
                  <legend className="text-xl font-extrabold text-ink dark:text-white sm:text-2xl">{t(q.q)}</legend>
                  {q.code && (
                    <pre dir="ltr" className="mt-5 overflow-x-auto rounded-2xl bg-ink p-5 text-left font-mono text-[0.95rem] leading-relaxed text-white/90 ring-1 ring-white/10">
                      <code>{q.code}</code>
                    </pre>
                  )}
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {q.options.map((o, k) => {
                      const sel = chosen === k;
                      return (
                        <label
                          key={k}
                          className={`group flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 font-semibold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sky ${
                            sel
                              ? 'border-navy bg-navy text-white dark:border-sun dark:bg-sun dark:text-sun-ink'
                              : 'border-ink/10 text-ink hover:border-sky hover:bg-sky/5 dark:border-white/15 dark:text-white dark:hover:border-sun'
                          }`}
                        >
                          <input type="radio" name={`q${step}`} className="sr-only" checked={sel} onChange={() => choose(k)} />
                          <span
                            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${sel ? 'border-current' : 'border-ink/25 dark:border-white/30'}`}
                            aria-hidden="true"
                          >
                            {sel && <span className="h-2.5 w-2.5 rounded-full bg-current" />}
                          </span>
                          <span dir="auto">{t(o.text)}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1 rounded-full px-4 py-2 font-bold text-ink/70 transition hover:text-ink disabled:invisible dark:text-white/70 dark:hover:text-white"
                  >
                    <ChevronIcon className="h-5 w-5 -scale-x-100 rtl:scale-x-100" />
                    {t(quiz.back)}
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={chosen == null}
                    className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-bold text-white transition enabled:hover:bg-sky disabled:cursor-not-allowed disabled:opacity-40 dark:bg-sky dark:enabled:hover:bg-navy"
                  >
                    {t(last ? quiz.finish : quiz.next)}
                    <ChevronIcon className="h-5 w-5 rtl:-scale-x-100" />
                  </button>
                </div>
              </m.div>
            )}

            {stage === 'result' && (
              <m.div key="result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center" aria-live="polite">
                <p className="font-mono text-sm font-bold text-sky dark:text-sun">{t(quiz.resultLabel)}</p>
                <m.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
                  className="mt-2 text-5xl font-black text-navy dark:text-white sm:text-6xl"
                >
                  {t(track.name)}
                </m.p>
                {/* score meter */}
                <div className="mx-auto mt-6 h-3 max-w-sm overflow-hidden rounded-full bg-ink/10 dark:bg-white/10" aria-hidden="true">
                  <m.div
                    className="h-full origin-left rounded-full bg-sun rtl:origin-right"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: Math.max(0.06, score / MAX) }}
                    transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
                  />
                </div>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/80 dark:text-white/80">{t(track.text)}</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <ButtonLink href="join" size="lg">{t(ui.join)}</ButtonLink>
                  <button type="button" onClick={restart} className="rounded-full px-5 py-3 font-bold text-ink/70 underline-offset-4 hover:underline dark:text-white/70">
                    {t(quiz.retake)}
                  </button>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
