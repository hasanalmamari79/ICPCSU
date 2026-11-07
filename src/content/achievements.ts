import type { L } from '../i18n/types';

/**
 * ACHIEVEMENTS — timeline (oldest first) + count-up numbers.
 * Only add real, checkable facts. Placeholders are in [brackets].
 */
export const achievements = {
  label: '// achievements',
  title: { ar: 'رحلتنا حتى الآن', en: 'Our journey so far' },
  intro: {
    ar: 'عام واحد فقط… المراكز الثلاثة الأولى في الباطنة، و5 فرق في OCPC، وفريق في ACPC.',
    en: 'Just one year in… the top 3 places in Al Batinah, 5 teams at OCPC and one at ACPC.',
  },
  counters: [
    { value: 3, label: { ar: 'المراكز الثلاثة الأولى في تصفيات الباطنة — كلها لجامعة صحار', en: 'top-3 places at the Al Batinah qualifiers — all Sohar University' } },
    { value: 5, label: { ar: 'فرق تأهلت إلى OCPC', en: 'teams qualified for OCPC' } },
    { value: 15, label: { ar: 'متسابقًا من جامعة صحار', en: 'Sohar University contestants' } },
    { value: 1, label: { ar: 'فريق تأهل إلى ACPC (Error 418) — الأول في تاريخ الجامعة', en: 'team qualified for ACPC (Error 418) — a first for SU' } },
  ] as { value: number; label: L; plain?: boolean }[],
  timeline: [
    {
      date: { ar: 'أواخر 2025', en: 'Late 2025' },
      title: { ar: 'تأسيس النادي', en: 'The club is founded' },
      text: {
        ar: 'بإشراف كلية الحاسوب وتقنية المعلومات بجامعة صحار.',
        en: 'Under the supervision of the Faculty of Computing and IT, Sohar University.',
      },
    },
    {
      date: { ar: '[أضف التاريخ]', en: '[Add date]' },
      title: { ar: 'انطلاق التدريب', en: 'Training begins' },
      text: { ar: '[أضف التفاصيل: عدد الجلسات، عدد الحضور]', en: '[Add details: number of sessions, attendance]' },
    },
    {
      date: { ar: '[أضف التاريخ]', en: '[Add date]' },
      title: { ar: 'المراكز الثلاثة الأولى في تصفيات الباطنة', en: 'Top 3 places at the Al Batinah qualifiers' },
      text: {
        ar: 'في التصفيات على مستوى محافظة الباطنة التي استضافتها جامعة صحار، حصدت فرق جامعة صحار المراكز الثلاثة الأولى.',
        en: 'At the Al Batinah governorate qualifiers, hosted by Sohar University, SU teams took first, second and third place.',
      },
      highlight: true,
    },
    {
      date: { ar: '2026', en: '2026' },
      title: { ar: '5 فرق تتأهل إلى OCPC', en: '5 teams qualify for OCPC' },
      text: {
        ar: '15 متسابقًا من جامعة صحار في مسابقة عُمان للبرمجة الجامعية بجامعة السلطان قابوس — وفريق Error 418 يحلّ خامسًا على مستوى عُمان.',
        en: '15 Sohar University contestants at the Oman Collegiate Programming Contest at Sultan Qaboos University — with team Error 418 finishing 5th in Oman.',
      },
    },
    {
      date: { ar: '[أضف التاريخ]', en: '[Add date]' },
      title: { ar: 'لأول مرة: فريق يتأهل إلى ACPC', en: 'First ever ACPC qualification' },
      text: {
        ar: 'فريق Error 418 يتأهل إلى البطولة العربية الأفريقية للبرمجة ACPC 2026 في مصر — لأول مرة في تاريخ جامعة صحار.',
        en: 'Team Error 418 qualifies for the Africa & Arab Collegiate Programming Championship (ACPC 2026) in Egypt — a first in Sohar University history.',
      },
      highlight: true,
    },
    {
      date: { ar: 'اليوم', en: 'Today' },
      title: { ar: 'الفصل التالي', en: 'The next chapter' },
      text: { ar: 'هيئة إدارية جديدة، وأعضاء جدد… ومكانك محجوز.', en: 'A new board, new members… and a seat saved for you.' },
    },
  ] as { date: L; title: L; text: L; highlight?: boolean }[],
};
