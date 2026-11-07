import type { L } from '../i18n/types';

/**
 * TEXT FOR HOME-PAGE SECTIONS (About, What we offer, ICPC, Join).
 * Anything in [brackets] is a placeholder — search for "[" to find them all.
 */

export const about = {
  label: '// about_us',
  title: { ar: 'عن النادي', en: 'About the club' },
  body: {
    ar: 'نادي ICPC بجامعة صحار مجتمع طلابي للبرمجة التنافسية، تأسس في أواخر عام 2025 بإشراف كلية الحاسوب وتقنية المعلومات. ندرّب الطلاب على حل المسائل الخوارزمية، ونبني فرقًا للمنافسة في مسابقة ICPC، ونرحّب بكل من يريد أن يبدأ — مهما كان مستواه.',
    en: 'The ICPC Sohar University Club is a student community for competitive programming, founded in late 2025 under the supervision of the Faculty of Computing and IT. We train students to solve algorithmic problems, build teams to compete in the ICPC, and welcome anyone who wants to start — whatever their level.',
  },
  vision: {
    title: { ar: 'رؤيتنا', en: 'Vision' },
    text: {
      ar: 'أن تصبح جامعة صحار اسمًا حاضرًا في البرمجة التنافسية — من عُمان إلى نهائيات ICPC العالمية.',
      en: 'To make Sohar University a recognized name in competitive programming — from Oman to the ICPC World Finals.',
    },
  },
  mission: {
    title: { ar: 'رسالتنا', en: 'Mission' },
    text: {
      ar: 'نساعد الطلاب على تعلّم أساسيات البرمجة ومهارات حل المشكلات، ونرافقهم خطوة بخطوة حتى يتأهلوا للمنافسة في مستويات أعلى.',
      en: 'To help students learn programming fundamentals and problem-solving skills, and support them step by step until they qualify to compete at higher levels.',
    },
  },
};

export type OfferIcon = 'training' | 'coaching' | 'teams' | 'community';
export const offer = {
  label: '// what_we_offer',
  title: { ar: 'ماذا نقدّم', en: 'What we offer' },
  intro: {
    ar: 'كل ما تحتاجه للانتقال من أول سطر كود إلى أول مسابقة.',
    en: 'Everything you need to go from your first line of code to your first contest.',
  },
  items: [
    {
      icon: 'training',
      title: { ar: 'جلسات تدريبية', en: 'Training sessions' },
      text: {
        ar: 'مسائل متدرّجة من الأساسيات إلى الخوارزميات المتقدمة، مع حل جماعي وشرح.',
        en: 'Problem sets that grow from the basics to advanced algorithms, solved and explained together.',
      },
    },
    {
      icon: 'coaching',
      title: { ar: 'إرشاد شخصي', en: 'Personal coaching' },
      text: {
        ar: 'مدرب يتابع تقدّمك ويقترح عليك الخطوة التالية المناسبة لمستواك.',
        en: 'A coach who follows your progress and suggests the right next step for your level.',
      },
    },
    {
      icon: 'teams',
      title: { ar: 'فرق المسابقات', en: 'Contest teams' },
      text: {
        ar: 'نكوّن فرقًا ثلاثية ونجهّزها لمسابقات الجامعة والوطنية والإقليمية.',
        en: 'We form three-person teams and prepare them for university, national and regional contests.',
      },
    },
    {
      icon: 'community',
      title: { ar: 'مجتمع داعم', en: 'Community' },
      text: {
        ar: 'زملاء يشاركونك الشغف نفسه، ومسابقات داخلية، وتحديات ممتعة.',
        en: 'Peers who share the same passion, internal contests and fun challenges.',
      },
    },
  ] as { icon: OfferIcon; title: L; text: L }[],
};

/** Facts from the official ICPC site: https://icpc.global */
export const icpc = {
  label: '// about_icpc',
  title: { ar: 'ما هي مسابقة ICPC؟', en: 'What is the ICPC?' },
  body: {
    ar: 'المسابقة الدولية للبرمجة الجامعية (ICPC) هي أعرق مسابقة برمجة لطلاب الجامعات في العالم. تتنافس الفرق على حل أكبر عدد من المسائل الخوارزمية في أقل وقت.',
    en: 'The International Collegiate Programming Contest (ICPC) is the oldest and most prestigious programming contest for university students. Teams race to solve as many algorithmic problems as possible, as fast as possible.',
  },
  stats: [
    { value: 3, label: { ar: 'طلاب في كل فريق', en: 'students per team' } },
    { value: 1, label: { ar: 'جهاز حاسوب واحد', en: 'computer to share' } },
    { value: 5, label: { ar: 'ساعات من التحدي', en: 'hours of contest' } },
  ],
  pathTitle: { ar: 'الطريق إلى النهائيات العالمية', en: 'The road to the World Finals' },
  path: [
    { title: { ar: 'التصفيات الإقليمية', en: 'Regional qualifiers' }, text: { ar: 'على مستوى المحافظات — مثل تصفيات الباطنة', en: 'Governorate level — e.g. Al Batinah' } },
    { title: { ar: 'الوطنية (OCPC)', en: 'National (OCPC)' }, text: { ar: 'مسابقة عُمان للبرمجة الجامعية', en: 'Oman Collegiate Programming Contest' } },
    { title: { ar: 'الإقليمية (ACPC)', en: 'Regional (ACPC)' }, text: { ar: 'البطولة العربية الأفريقية للبرمجة', en: 'Africa & Arab Collegiate Programming Championship' } },
    { title: { ar: 'النهائيات العالمية', en: 'World Finals' }, text: { ar: 'أفضل فرق العالم', en: "The world's best teams" } },
  ],
  link: { ar: 'الموقع الرسمي لـ ICPC', en: 'Official ICPC website' },
};

export const join = {
  label: '// join_us',
  title: { ar: 'كيف تنضم إلينا؟', en: 'How to join' },
  intro: {
    ar: 'ثلاث خطوات فقط. لا يُشترط أي مستوى سابق.',
    en: 'Just three steps. No prior level required.',
  },
  steps: [
    {
      title: { ar: 'املأ النموذج', en: 'Fill in the form' },
      text: { ar: 'نموذج قصير يأخذ دقيقتين.', en: 'A short form that takes two minutes.' },
    },
    {
      title: { ar: 'انضم إلى مجموعة النادي', en: 'Join the club group' },
      text: {
        ar: '[أكّد الخطوة: مثلاً نضيفك إلى مجموعة واتساب ونرسل لك جدول التدريب]',
        en: '[Confirm this step: e.g. we add you to the WhatsApp group and send the training schedule]',
      },
    },
    {
      title: { ar: 'احضر أول جلسة', en: 'Attend your first session' },
      text: { ar: 'تعال كما أنت — سنبدأ معك من مستواك.', en: 'Come as you are — we start from your level.' },
    },
  ],
  cta: { ar: 'انضم إلى النادي', en: 'Join the club' },
};

export const footer = {
  supervision: {
    ar: 'بإشراف كلية الحاسوب وتقنية المعلومات – جامعة صحار',
    en: 'Under the supervision of the Faculty of Computing and Information Technology – Sohar University',
  },
  rights: { ar: 'جميع الحقوق محفوظة.', en: 'All rights reserved.' },
  follow: { ar: 'تابعنا', en: 'Follow us' },
};
