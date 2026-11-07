import type { L } from '../i18n/types';

/**
 * QUOTES FROM MEMBERS — rotate automatically.
 * Replace each placeholder with a REAL quote (with the member's permission).
 */
export const quotes = {
  label: '// voices',
  title: { ar: 'بكلمات أعضائنا', en: 'In our members’ words' },
  // No quotes yet → the whole section is hidden. Add real ones (with permission) like:
  // { text: { ar: '…', en: '…' }, name: { ar: '…', en: '…' }, role: { ar: 'علوم الحاسوب · السنة 2', en: 'Computer Science · Year 2' } },
  items: [] as { text: L; name: L; role: L }[],
};
