import type { L } from '../i18n/types';

/**
 * HIGHLIGHTS GALLERY — "مقتطفات".
 * Add a photo: put it in /public/images/gallery/ (landscape ~1600px wide, WebP/JPG under ~300 KB),
 * then copy one block below and set `album` to 'batinah' or 'ocpc' (or add a new album).
 */
export type Album = { id: string; label: L; text: L; placeholders?: number };
/** position (optional): which part of the photo to keep when cropped, e.g. 'center 30%' (keeps faces in tall photos). */
export type Photo = { image: string; imageSmall?: string; alt: L; caption: L; album: string; position?: string };

export const gallery = {
  label: '// highlights',
  title: { ar: 'مقتطفات من رحلتنا', en: 'Highlights' },
  intro: {
    ar: 'لحظات من المسابقات والتدريب والإنجازات.',
    en: 'Moments from contests, training and achievements.',
  },
  soon: { ar: 'الصور قريبًا', en: 'Photos coming soon' },
  // Albums appear in this order. An album with no photos shows `placeholders` "coming soon" tiles.
  albums: [
    {
      id: 'batinah',
      label: { ar: 'تصفيات الباطنة · جامعة صحار', en: 'Al Batinah qualifiers · Sohar University' },
      text: {
        ar: 'المراكز الثلاثة الأولى كلها لفرق جامعة صحار.',
        en: 'All three top places went to Sohar University teams.',
      },
      placeholders: 3,
    },
    {
      id: 'ocpc',
      label: { ar: 'OCPC · جامعة السلطان قابوس', en: 'OCPC · Sultan Qaboos University' },
      text: {
        ar: '5 فرق و15 متسابقًا في مسابقة عُمان للبرمجة الجامعية 2026.',
        en: '5 teams and 15 contestants at the Oman Collegiate Programming Contest 2026.',
      },
      placeholders: 3,
    },
  ] as Album[],
  photos: [
    // ── Al Batinah qualifiers · Sohar University ──
    {
      album: 'batinah',
      image: 'images/gallery/batinah-trophy-3rd.webp',
      imageSmall: 'images/gallery/batinah-trophy-3rd-600.webp',
      position: 'center 35%',
      alt: { ar: 'فريق من جامعة صحار يحمل كأس المركز الثالث', en: 'A Sohar University team holding the third-place trophy' },
      caption: { ar: 'كأس المركز الثالث — والمراكز الثلاثة كلها لجامعة صحار', en: 'The third-place trophy — all three top spots went to SU' },
    },
    {
      album: 'batinah',
      image: 'images/gallery/batinah-team-window.webp',
      imageSmall: 'images/gallery/batinah-team-window-600.webp',
      position: 'center 60%',
      alt: { ar: 'ثلاثة متسابقين يعملون معًا على حاسوب واحد', en: 'Three contestants working together at one computer' },
      caption: { ar: 'ثلاثة عقول… وجهاز واحد', en: 'Three minds… one computer' },
    },
    {
      album: 'batinah',
      image: 'images/gallery/batinah-team-focus.webp',
      imageSmall: 'images/gallery/batinah-team-focus-600.webp',
      position: 'center 45%',
      alt: { ar: 'متسابقات يركّزن على الشاشة أثناء المسابقة', en: 'Contestants focused on the screen during the contest' },
      caption: { ar: 'تركيز كامل أثناء حل المسائل', en: 'Full focus while solving problems' },
    },
    {
      album: 'batinah',
      image: 'images/gallery/batinah-explaining.webp',
      imageSmall: 'images/gallery/batinah-explaining-600.webp',
      position: 'center 35%',
      alt: { ar: 'متسابقة تشرح فكرة أثناء الفعالية', en: 'A participant explaining an idea during the event' },
      caption: { ar: 'من أجواء التصفيات في جامعة صحار', en: 'Inside the qualifiers at Sohar University' },
    },
    {
      album: 'batinah',
      image: 'images/gallery/batinah-pride-post.webp',
      imageSmall: 'images/gallery/batinah-pride-post-600.webp',
      position: 'center 40%',
      alt: { ar: 'متسابقون مع عبارة: الإنجاز جماعي والفخر للجميع', en: 'Contestants with the words: the achievement is shared, the pride belongs to all' },
      caption: { ar: 'الإنجاز جماعي… والفخر للجميع', en: 'A shared achievement… pride for everyone' },
    },
    // ── OCPC · Sultan Qaboos University ──
    {
      album: 'ocpc',
      image: 'images/gallery/ocpc-scoreboard-team.webp',
      imageSmall: 'images/gallery/ocpc-scoreboard-team-600.webp',
      alt: { ar: 'متسابقو جامعة صحار مع المشرفين أمام لوحة النتائج في OCPC 2026', en: 'Sohar University contestants and supervisors in front of the OCPC 2026 scoreboard' },
      caption: { ar: 'أمام لوحة النتائج: Error 418 (SU) في المركز الخامس على عُمان', en: 'The scoreboard: Error 418 (SU) in 5th place in Oman' },
    },
    {
      album: 'ocpc',
      image: 'images/gallery/ocpc-sunset-selfie.webp',
      imageSmall: 'images/gallery/ocpc-sunset-selfie-600.webp',
      alt: { ar: 'سيلفي لمتسابقي جامعة صحار مع المشرف وقت الغروب في حرم جامعة السلطان قابوس', en: 'Sohar University contestants taking a sunset selfie with their supervisor on the Sultan Qaboos University campus' },
      caption: { ar: 'سيلفي الغروب في حرم جامعة السلطان قابوس', en: 'Sunset selfie on the Sultan Qaboos University campus' },
    },
    {
      album: 'ocpc',
      image: 'images/gallery/ocpc-flag-banner.webp',
      imageSmall: 'images/gallery/ocpc-flag-banner-600.webp',
      position: 'center 55%',
      alt: { ar: 'متسابقون من جامعة صحار يرفعون علم الجامعة تحت لافتة OCPC 2026', en: 'Sohar University contestants holding the university flag under the OCPC 2026 banner' },
      caption: { ar: 'علم جامعة صحار تحت لافتة OCPC 2026', en: 'The Sohar University flag under the OCPC 2026 banner' },
    },
    {
      album: 'ocpc',
      image: 'images/gallery/ocpc-women-flag.webp',
      imageSmall: 'images/gallery/ocpc-women-flag-600.webp',
      alt: { ar: 'متسابقات جامعة صحار يرفعن علم الجامعة أمام جدار OCPC 2026', en: 'Sohar University contestants holding the university flag in front of the OCPC 2026 wall' },
      caption: { ar: 'متسابقات جامعة صحار أمام جدار OCPC 2026', en: 'Sohar University contestants at the OCPC 2026 wall' },
    },
    {
      album: 'ocpc',
      image: 'images/gallery/ocpc-triple-bits.webp',
      imageSmall: 'images/gallery/ocpc-triple-bits-600.webp',
      alt: { ar: 'فريق Triple Bits من جامعة صحار يحل المسائل على الورق', en: 'The Triple Bits team from Sohar University working through problems on paper' },
      caption: { ar: 'فريق Triple Bits في قلب المنافسة', en: 'Team Triple Bits in the thick of the contest' },
    },
    {
      album: 'ocpc',
      image: 'images/gallery/ocpc-selfie.webp',
      imageSmall: 'images/gallery/ocpc-selfie-600.webp',
      alt: { ar: 'صورة سيلفي لمشرف النادي مع متسابقين في جامعة السلطان قابوس', en: 'A selfie of the club supervisor with contestants at Sultan Qaboos University' },
      caption: { ar: 'سيلفي الفريق في جامعة السلطان قابوس', en: 'Team selfie at Sultan Qaboos University' },
    },
    {
      album: 'ocpc',
      image: 'images/gallery/ocpc-opening-ceremony.webp',
      imageSmall: 'images/gallery/ocpc-opening-ceremony-600.webp',
      alt: { ar: 'قاعة حفل OCPC 2026 ممتلئة بالمتسابقين والضيوف', en: 'The OCPC 2026 ceremony hall filled with contestants and guests' },
      caption: { ar: 'حفل مسابقة عُمان للبرمجة الجامعية 2026', en: 'The Oman Collegiate Programming Contest 2026 ceremony' },
    },
    {
      album: 'ocpc',
      image: 'images/gallery/ocpc-regional-director.webp',
      imageSmall: 'images/gallery/ocpc-regional-director-600.webp',
      alt: { ar: 'شاشة حفل OCPC تعلن كلمة المدير الإقليمي لمسابقة عُمان الجامعية للبرمجة', en: 'The OCPC ceremony screen announcing the regional director’s speech' },
      caption: { ar: 'كلمة المدير الإقليمي في حفل OCPC 2026', en: 'The regional director’s address at OCPC 2026' },
    },
    {
      album: 'ocpc',
      image: 'images/gallery/ocpc-honoring.webp',
      imageSmall: 'images/gallery/ocpc-honoring-600.webp',
      alt: { ar: 'تكريم ممثل جامعة صحار على المسرح في حفل OCPC 2026', en: 'A Sohar University representative honoured on stage at the OCPC 2026 ceremony' },
      caption: { ar: 'لحظة تكريم في حفل OCPC 2026', en: 'An honouring moment at the OCPC 2026 ceremony' },
    },
    {
      album: 'ocpc',
      image: 'images/gallery/ocpc-thumbs-up.webp',
      imageSmall: 'images/gallery/ocpc-thumbs-up-600.webp',
      position: 'center 35%',
      alt: { ar: 'مشرف النادي يرفع إبهامه مبتسمًا في قاعة المسابقة', en: 'The club supervisor smiling with a thumbs-up in the contest hall' },
      caption: { ar: 'كل شيء تمام!', en: 'All good!' },
    },
    {
      album: 'ocpc',
      image: 'images/gallery/ocpc-hall-portrait.webp',
      imageSmall: 'images/gallery/ocpc-hall-portrait-600.webp',
      position: 'center 40%',
      alt: { ar: 'مشرف النادي مع أحد المتسابقين في قاعة المسابقة', en: 'The club supervisor with a contestant in the contest hall' },
      caption: { ar: 'المشرف مع أحد متسابقينا في قاعة المسابقة', en: 'Our supervisor with one of our contestants in the hall' },
    },
    {
      album: 'ocpc',
      image: 'images/news-acpc-scoreboard.webp',
      imageSmall: 'images/news-acpc-scoreboard-768.webp',
      alt: { ar: 'متسابقو جامعة صحار على المسرح أمام لوحة النتائج', en: 'Sohar University contestants on stage in front of the scoreboard' },
      caption: { ar: 'على المسرح أمام لوحة النتائج في OCPC', en: 'On stage in front of the OCPC scoreboard' },
    },
    {
      album: 'ocpc',
      image: 'images/team-stage-front.webp',
      imageSmall: 'images/team-stage-front-768.webp',
      alt: { ar: 'فريق جامعة صحار يرفع علم الجامعة على المسرح', en: 'The Sohar University team raising the university flag on stage' },
      caption: { ar: 'فريق جامعة صحار كاملًا مع العلم', en: 'The full Sohar University squad with the flag' },
    },
    {
      album: 'ocpc',
      image: 'images/team-stage-side.webp',
      imageSmall: 'images/team-stage-side-768.webp',
      alt: { ar: 'صف من متسابقي جامعة صحار بجانب علم الجامعة', en: 'A line of Sohar University contestants beside the university flag' },
      caption: { ar: 'لحظة فخر في جامعة السلطان قابوس', en: 'A proud moment at Sultan Qaboos University' },
    },
  ] as Photo[],
};
