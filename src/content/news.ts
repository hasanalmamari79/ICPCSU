import type { L } from '../i18n/types';

/**
 * NEWS HEADLINE SLIDER — the big banner at the top of the home page.
 * - Newest first. Add a slide by copying one block.
 * - image: a wide landscape photo inside /public/images (WebP or JPG, ~1600px wide).
 *   imageSmall (optional): a ~768px version for phones.
 *   Leave image out (or the file missing) and a branded placeholder is shown instead.
 * - cta.href: 'join' = the Google Form from src/config/site.ts,
 *             '#team' = scroll to a section, or any full https:// link.
 */
export type NewsItem = {
  id: string;
  kicker: L; // small label above the headline
  headline: L;
  subtitle: L;
  image?: string;
  imageSmall?: string;
  imageAlt: L;
  /** Which part of the photo to keep when cropped, e.g. 'center 60%'. */
  imagePosition?: string;
  cta: { label: L; href: string };
};

export const news: NewsItem[] = [
  {
    id: 'acpc-first-qualification',
    kicker: { ar: 'خبر عاجل', en: 'Breaking' },
    headline: {
      ar: 'لأول مرة… جامعة صحار تتأهل إلى ACPC',
      en: 'For the first time, Sohar University qualifies for ACPC',
    },
    subtitle: {
      ar: 'فريق Error 418 خامسًا على عُمان في OCPC 2026… ومتأهلًا إلى ACPC 2026 في مصر.',
      en: 'Team Error 418 finished 5th in Oman at OCPC 2026… and is heading to ACPC 2026 in Egypt.',
    },
    image: 'images/gallery/acpc-full-team.webp',
    imageSmall: 'images/gallery/acpc-full-team-600.webp',
    imagePosition: 'center 40%',
    imageAlt: {
      ar: 'فرق جامعة صحار مع المشرف وعلم الجامعة في OCPC 2026',
      en: 'Sohar University teams with their supervisor and the university flag at OCPC 2026',
    },
    cta: { label: { ar: 'انضم الآن', en: 'Join now' }, href: 'join' },
  },
  {
    id: 'batinah-top3',
    kicker: { ar: 'تصفيات الباطنة', en: 'Al Batinah qualifiers' },
    headline: {
      ar: 'المراكز الثلاثة الأولى… كلها لجامعة صحار',
      en: 'First, second and third — all Sohar University',
    },
    subtitle: {
      ar: 'فرقنا تكتسح تصفيات محافظة الباطنة التي استضافتها جامعة صحار.',
      en: 'Our teams swept the Al Batinah governorate qualifiers, hosted at Sohar University.',
    },
    image: 'images/gallery/batinah-team-window.webp',
    imagePosition: 'center 62%',
    imageAlt: { ar: 'فريق من جامعة صحار يحل المسائل في تصفيات الباطنة', en: 'A Sohar University team solving problems at the Al Batinah qualifiers' },
    cta: { label: { ar: 'شاهد المقتطفات', en: 'See highlights' }, href: '#highlights' },
  },
  {
    id: 'training-open',
    kicker: { ar: 'التدريب', en: 'Training' },
    headline: {
      ar: 'التدريب مفتوح للجميع — المبتدئون مرحَّب بهم',
      en: 'Training is open to everyone — beginners welcome',
    },
    subtitle: {
      ar: 'لا تحتاج خبرة سابقة. تحتاج فقط أن تبدأ.',
      en: 'No experience needed. You just need to start.',
    },
    image: 'images/team-stage-front.webp',
    imageSmall: 'images/team-stage-front-768.webp',
    imageAlt: {
      ar: 'أعضاء النادي على المسرح يحملون علم جامعة صحار',
      en: 'Club members on stage holding the Sohar University flag',
    },
    cta: { label: { ar: 'انضم الآن', en: 'Join now' }, href: 'join' },
  },
  {
    id: 'meet-the-team',
    kicker: { ar: 'مجتمعنا', en: 'Community' },
    headline: { ar: 'تعرّف على الفريق خلف الكود', en: 'Meet the team behind the code' },
    subtitle: {
      ar: 'مؤسسون ومدربون وأعضاء يجمعهم شغف حل المسائل.',
      en: 'Founders, coaches and members united by a love of problem solving.',
    },
    image: 'images/gallery/ocpc-sunset-selfie.webp',
    imageSmall: 'images/gallery/ocpc-sunset-selfie-600.webp',
    imagePosition: 'center 40%',
    imageAlt: {
      ar: 'متسابقو جامعة صحار مع المشرف وقت الغروب في جامعة السلطان قابوس',
      en: 'Sohar University contestants with their supervisor at sunset at Sultan Qaboos University',
    },
    cta: { label: { ar: 'اقرأ المزيد', en: 'Read more' }, href: '#team' },
  },
  {
    // No image on purpose → shows the branded navy placeholder. Add one when available.
    id: 'new-board',
    kicker: { ar: 'قريبًا', en: 'Coming soon' },
    headline: { ar: 'الهيئة الإدارية الجديدة… قريبًا', en: 'The new High Board is coming soon' },
    subtitle: {
      ar: '[أضف تاريخ الإعلان عن الهيئة الجديدة]',
      en: '[Add the date the new board will be announced]',
    },
    imageAlt: { ar: 'شعار النادي', en: 'Club emblem' },
    cta: { label: { ar: 'اقرأ المزيد', en: 'Read more' }, href: '#team' },
  },
];
