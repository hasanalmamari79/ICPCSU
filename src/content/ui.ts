import type { L } from '../i18n/types';

/** Short interface labels: navigation, buttons, section titles. */
export const ui = {
  clubName: { ar: 'نادي ICPC جامعة صحار', en: 'ICPC Sohar University Club' },
  clubShort: { ar: 'نادي ICPC', en: 'ICPC Club' },
  university: { ar: 'جامعة صحار', en: 'Sohar University' },
  tagline: { ar: 'تدرّب. نافس. تطوّر.', en: 'Train. Compete. Grow.' },
  skip: { ar: 'تخطٍّ', en: 'Skip' },
  join: { ar: 'انضم الآن', en: 'Join now' },
  readMore: { ar: 'اقرأ المزيد', en: 'Read more' },
  menu: { ar: 'القائمة', en: 'Menu' },
  close: { ar: 'إغلاق', en: 'Close' },
  switchLang: { ar: 'English', en: 'العربية' },
  switchLangLabel: { ar: 'Switch to English', en: 'التبديل إلى العربية' },
  prev: { ar: 'الخبر السابق', en: 'Previous headline' },
  next: { ar: 'الخبر التالي', en: 'Next headline' },
  pause: { ar: 'إيقاف مؤقت', en: 'Pause' },
  play: { ar: 'تشغيل', en: 'Play' },
  goToSlide: { ar: 'اذهب إلى الخبر', en: 'Go to headline' },
  skipToContent: { ar: 'انتقل إلى المحتوى', en: 'Skip to content' },
  nav: [
    { id: 'about', label: { ar: 'عن النادي', en: 'About' } },
    { id: 'offer', label: { ar: 'ماذا نقدّم', en: 'What we offer' } },
    { id: 'icpc', label: { ar: 'مسابقة ICPC', en: 'ICPC' } },
    { id: 'achievements', label: { ar: 'إنجازاتنا', en: 'Achievements' } },
    { id: 'highlights', label: { ar: 'مقتطفات', en: 'Highlights' } },
    { id: 'team', label: { ar: 'الفريق', en: 'Team' } },
    { id: 'quiz', label: { ar: 'اختبر مستواك', en: 'Test your level' } },
  ] as { id: string; label: L }[],
};
