import type { L } from '../i18n/types';

/**
 * "TEST YOUR LEVEL" QUIZ.
 * Each option has points. Total score → track (see `tracks`, checked from the top).
 * Max score is 12.
 */
export type QuizOption = { text: L; points: number };
export type QuizQuestion = { q: L; code?: string; options: QuizOption[] };

export const quiz = {
  label: '// test_your_level',
  title: { ar: 'اختبر مستواك', en: 'Test your level' },
  intro: {
    ar: '5 أسئلة سريعة، بلا ضغط. سنقترح عليك المسار المناسب لتبدأ منه.',
    en: '5 quick questions, no pressure. We’ll suggest the right track to start from.',
  },
  start: { ar: 'ابدأ الاختبار', en: 'Start the quiz' },
  next: { ar: 'التالي', en: 'Next' },
  back: { ar: 'السابق', en: 'Back' },
  finish: { ar: 'اعرض نتيجتي', en: 'See my result' },
  retake: { ar: 'أعد الاختبار', en: 'Retake' },
  questionOf: { ar: 'السؤال', en: 'Question' },
  of: { ar: 'من', en: 'of' },
  resultLabel: { ar: 'المسار المقترح لك', en: 'Your recommended track' },
  questions: [
    {
      q: { ar: 'هل كتبت كودًا من قبل؟', en: 'Have you written code before?' },
      options: [
        { text: { ar: 'لا، أبدًا', en: 'No, never' }, points: 0 },
        { text: { ar: 'قليلًا في مقرر دراسي', en: 'A little, in a course' }, points: 1 },
        { text: { ar: 'نعم، بانتظام', en: 'Yes, regularly' }, points: 2 },
        { text: { ar: 'نعم، وحللت مسائل على Codeforces أو LeetCode', en: 'Yes, and I solve problems on Codeforces or LeetCode' }, points: 3 },
      ],
    },
    {
      q: { ar: 'ماذا يطبع هذا الكود؟', en: 'What does this code print?' },
      code: 'total = 0\nfor i in range(1, 5):\n    total += i\nprint(total)',
      options: [
        { text: { ar: '15', en: '15' }, points: 0 },
        { text: { ar: '10', en: '10' }, points: 2 },
        { text: { ar: '4', en: '4' }, points: 0 },
        { text: { ar: 'لست متأكدًا', en: 'Not sure' }, points: 0 },
      ],
    },
    {
      q: {
        ar: 'أي بنية بيانات هي الأسرع (في المتوسط) لمعرفة هل قيمة ما موجودة؟',
        en: 'Which data structure is fastest (on average) to check whether a value exists?',
      },
      options: [
        { text: { ar: 'مصفوفة عادية', en: 'A plain array' }, points: 0 },
        { text: { ar: 'قائمة مترابطة', en: 'A linked list' }, points: 0 },
        { text: { ar: 'مصفوفة مرتبة مع بحث ثنائي', en: 'A sorted array with binary search' }, points: 1 },
        { text: { ar: 'جدول تجزئة (Hash Set)', en: 'A hash set' }, points: 2 },
      ],
    },
    {
      q: {
        ar: 'البحث الثنائي في مليون رقم مرتب يحتاج تقريبًا إلى كم خطوة؟',
        en: 'Binary search over 1,000,000 sorted numbers takes about how many steps?',
      },
      options: [
        { text: { ar: '20', en: '20' }, points: 2 },
        { text: { ar: '1,000', en: '1,000' }, points: 0 },
        { text: { ar: '500,000', en: '500,000' }, points: 0 },
        { text: { ar: '1,000,000', en: '1,000,000' }, points: 0 },
      ],
    },
    {
      q: {
        ar: 'ما مدى معرفتك بالبرمجة الديناميكية أو خوارزميات الرسوم (BFS/DFS)؟',
        en: 'How familiar are you with dynamic programming or graph algorithms (BFS/DFS)?',
      },
      options: [
        { text: { ar: 'لم أسمع بها', en: 'Never heard of them' }, points: 0 },
        { text: { ar: 'سمعت بها فقط', en: 'Heard of them' }, points: 1 },
        { text: { ar: 'استخدمتها مرة أو مرتين', en: 'Used them once or twice' }, points: 2 },
        { text: { ar: 'أستخدمها بانتظام', en: 'I use them regularly' }, points: 3 },
      ],
    },
  ] as QuizQuestion[],
  tracks: [
    {
      id: 'advanced',
      min: 9,
      name: { ar: 'متقدم', en: 'Advanced' },
      text: {
        ar: 'مستواك ممتاز! مكانك في تدريبات فرق المسابقات: رسوم، برمجة ديناميكية، نظرية أعداد، واستراتيجية العمل كفريق. جرّب حظك في تصفيات الفرق.',
        en: 'Excellent! Your place is in contest-team training: graphs, DP, number theory and team strategy. Try out for the contest teams.',
      },
    },
    {
      id: 'intermediate',
      min: 5,
      name: { ar: 'متوسط', en: 'Intermediate' },
      text: {
        ar: 'أساسك جيد. الخطوة التالية: الترتيب، البحث الثنائي، الخوارزميات الجشعة، والتدرّب على مسابقات بوقت محدد.',
        en: 'You have a solid base. Next: sorting, binary search, greedy algorithms and timed practice contests.',
      },
    },
    {
      id: 'beginner',
      min: 0,
      name: { ar: 'مبتدئ', en: 'Beginner' },
      text: {
        ar: 'بداية رائعة — كل الأبطال بدأوا من هنا! سنبدأ معك بالأساسيات: المتغيرات، الحلقات، المصفوفات، وأول مسائلك المحلولة.',
        en: 'A great place to start — every champion began here! We’ll begin with the basics: variables, loops, arrays and your first solved problems.',
      },
    },
  ],
};
