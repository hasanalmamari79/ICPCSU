import type { L } from '../i18n/types';

/**
 * DOCUMENTARY — the story mode opened from the film icon in the header.
 * Each chapter = one full-screen photo with a title and short text (auto-advances).
 * - image: a photo in /public (leave it out → branded placeholder).
 * - video (optional): a YouTube link (https://www.youtube.com/watch?v=…) or an .mp4 in /public.
 *   A video chapter does not auto-advance.
 */
export type Chapter = { kicker: L; title: L; text: L; image?: string; imagePosition?: string; video?: string; cta?: boolean };

export const documentary = {
  button: { ar: 'الوثائقي', en: 'Documentary' },
  title: { ar: 'وثائقي: من صحار إلى ACPC', en: 'Documentary: Sohar to ACPC' },
  watch: { ar: 'شاهد الوثائقي', en: 'Watch the documentary' },
  chapter: { ar: 'الفصل', en: 'Chapter' },
  close: { ar: 'إغلاق الوثائقي', en: 'Close documentary' },
  secondsPerChapter: 7,
  chapters: [
    {
      kicker: { ar: 'أواخر 2025', en: 'Late 2025' },
      title: { ar: 'البداية', en: 'The beginning' },
      text: {
        ar: 'بإشراف كلية الحاسوب وتقنية المعلومات، وُلد نادي ICPC بجامعة صحار بفكرة واحدة: أن ننافس.',
        en: 'Under the Faculty of Computing and IT, the ICPC Sohar University Club was born with one idea: to compete.',
      },
      // [Add a photo from the club's first meeting or training]
    },
    {
      kicker: { ar: 'تصفيات الباطنة · جامعة صحار', en: 'Al Batinah qualifiers · Sohar University' },
      title: { ar: 'الأول والثاني والثالث', en: 'First, second, third' },
      text: {
        ar: 'على أرضنا، في تصفيات محافظة الباطنة، حصدت فرق جامعة صحار المراكز الثلاثة الأولى كلها.',
        en: 'On home ground, at the Al Batinah governorate qualifiers, Sohar University teams took all three top places.',
      },
      image: 'images/gallery/batinah-trophy-3rd.webp',
      imagePosition: 'center 30%',
    },
    {
      kicker: { ar: 'التأهل', en: 'Qualification' },
      title: { ar: '5 فرق… 15 متسابقًا', en: '5 teams… 15 contestants' },
      text: {
        ar: 'ومن هناك، تأهلت 5 فرق من جامعة صحار إلى مسابقة عُمان للبرمجة الجامعية OCPC.',
        en: 'From there, 5 Sohar University teams qualified for the Oman Collegiate Programming Contest (OCPC).',
      },
      image: 'images/gallery/ocpc-opening-ceremony.webp',
    },
    {
      kicker: { ar: 'OCPC 2026 · جامعة السلطان قابوس', en: 'OCPC 2026 · Sultan Qaboos University' },
      title: { ar: 'يوم المسابقة', en: 'Contest day' },
      text: {
        ar: 'خمس ساعات، جهاز واحد لكل فريق، ولوحة نتائج لا ترحم.',
        en: 'Five hours, one computer per team, and an unforgiving scoreboard.',
      },
      image: 'images/gallery/ocpc-triple-bits.webp',
    },
    {
      kicker: { ar: 'لأول مرة', en: 'For the first time' },
      title: { ar: 'إلى ACPC', en: 'On to ACPC' },
      text: {
        ar: 'المركز الخامس على مستوى عُمان… وفريق Error 418 يتأهل إلى البطولة العربية الأفريقية للبرمجة ACPC 2026 في مصر — الأول في تاريخ الجامعة.',
        en: '5th place in Oman… and team Error 418 qualifies for the Africa & Arab Collegiate Programming Championship (ACPC 2026) in Egypt — a first in the university’s history.',
      },
      image: 'images/gallery/ocpc-scoreboard-team.webp',
    },
    {
      kicker: { ar: 'الفصل القادم', en: 'Next chapter' },
      title: { ar: 'القصة لم تنتهِ', en: 'The story isn’t over' },
      text: {
        ar: 'الفصل القادم يُكتب الآن… وقد تكون أنت فيه.',
        en: 'The next chapter is being written now… and you could be in it.',
      },
      image: 'images/gallery/ocpc-sunset-selfie.webp',
      imagePosition: 'center 40%',
      cta: true,
    },
  ] as Chapter[],
};
