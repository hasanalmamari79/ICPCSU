import type { L } from '../i18n/types';

/**
 * TEAM — edit this file when the new team is formed.
 *
 * - The High Board currently lists ROLES ONLY (no names yet). To add a person, give the role a name:
 *     { role: { ar: 'رئيسة النادي', en: 'Chairwoman' }, name: { ar: '…', en: '…' } },
 * - Coaches / Members: add people to the empty `people: []` lists the same way, e.g.
 *     { name: { ar: '…', en: '…' }, role: { ar: 'فريق التدريب', en: 'Coach' } },
 *   While a list is empty, a "coming soon" note with a Join button is shown instead.
 * - photo (optional): 'images/team/name.webp' in /public (square, ~400×400).
 *   Without a photo, initials are shown on a brand colour (or the club mark if there is no name).
 */
export type Person = { name?: L; role: L; photo?: string };
export type TeamGroup = { id: string; label: L; people: Person[]; emptyNote?: L };

export const team = {
  label: '// our_team',
  title: { ar: 'فريق النادي', en: 'Meet the team' },
  groups: [
    {
      id: 'founders',
      label: { ar: 'المؤسسون', en: 'Founders' },
      people: [
        {
          name: { en: 'Prof. Ahmed Kayed', ar: 'أ.د. أحمد كايد' }, // VERIFY
          role: { en: 'Dean, FCIT', ar: 'عميد كلية الحاسوب وتقنية المعلومات' },
        },
        {
          name: { en: 'Dr. Abdallah Mohamad', ar: 'د. عبدالله محمد' }, // VERIFY
          role: { en: 'Assistant Dean', ar: 'مساعد العميد' },
        },
        {
          name: { en: 'Dr. Ibrahem Abdelatief', ar: 'د. إبراهيم عبداللطيف' }, // VERIFY
          role: { en: 'Club Supervisor', ar: 'مشرف النادي' },
        },
        {
          name: { en: 'Dr. Mariam Al-Jabri', ar: 'د. مريم الجابري' }, // VERIFY
          role: { en: 'Club Supervisor', ar: 'مشرفة النادي' },
        },
      ],
    },
    {
      id: 'board',
      label: { ar: 'الهيئة الإدارية', en: 'High Board' },
      // New board not formed yet — roles only. Add `name` to each role when announced.
      people: [
        { role: { ar: 'رئيسة النادي', en: 'Chairwoman' } },
        { role: { ar: 'نائب الرئيس', en: 'Vice Chair' } },
        { role: { ar: 'قائد الموارد البشرية', en: 'HR Leader' } },
        { role: { ar: 'قائد العلاقات العامة', en: 'PR Leader' } },
        { role: { ar: 'قائد الإعلام', en: 'Media Leader' } },
      ],
    },
    {
      id: 'coaches',
      label: { ar: 'المدربون', en: 'Coaches' },
      people: [],
      emptyNote: {
        ar: 'سيُعلَن فريق التدريب الجديد قريبًا.',
        en: 'The new coaching team will be announced soon.',
      },
    },
    {
      id: 'members',
      label: { ar: 'الأعضاء', en: 'Members' },
      people: [],
      emptyNote: {
        ar: 'قائمة الأعضاء قريبًا — انضم الآن ليظهر اسمك هنا.',
        en: 'Member list coming soon — join now and your name could be here.',
      },
    },
  ] as TeamGroup[],
};
