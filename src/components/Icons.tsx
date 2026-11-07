import type { SVGProps } from 'react';

/** Small line-icon set (no emoji). All decorative unless given a title by the parent. */
type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...p,
});

export const ArrowIcon = (p: P) => (<svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const ChevronIcon = (p: P) => (<svg {...base(p)}><path d="M9 6l6 6-6 6" /></svg>);
export const ExternalIcon = (p: P) => (<svg {...base(p)}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>);
export const MenuIcon = (p: P) => (<svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h10" /></svg>);
export const CloseIcon = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const PauseIcon = (p: P) => (<svg {...base(p)}><path d="M9 5v14M15 5v14" /></svg>);
export const PlayIcon = (p: P) => (<svg {...base(p)}><path d="M7 5l12 7-12 7z" /></svg>);
export const CheckIcon = (p: P) => (<svg {...base(p)}><path d="M5 12l5 5 9-10" /></svg>);
export const QuoteIcon = (p: P) => (<svg {...base(p)} fill="currentColor" stroke="none"><path d="M4 18v-5c0-4 2-7 6-8l1 2c-2 1-3 2-3 4h3v7H4zm9 0v-5c0-4 2-7 6-8l1 2c-2 1-3 2-3 4h3v7h-7z" /></svg>);
export const InstagramIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>);
export const LinkedinIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></svg>);
export const MailIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>);

/** Icons for the "What we offer" cards. */
export const OfferIcons = {
  training: (p: P) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M7 9l3 2.5L7 14M12 14h5M8 21h8" /></svg>),
  coaching: (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 12l7-7M16 5h3v3" /></svg>),
  teams: (p: P) => (<svg {...base(p)}><circle cx="12" cy="7" r="2.5" /><circle cx="5.5" cy="10" r="2.2" /><circle cx="18.5" cy="10" r="2.2" /><path d="M8 20v-3a4 4 0 0 1 8 0v3M2 19v-2a3 3 0 0 1 4-2.8M22 19v-2a3 3 0 0 0-4-2.8" /></svg>),
  community: (p: P) => (<svg {...base(p)}><path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /><path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2v2l-3-2h-4" /></svg>),
};
export const FilmIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" /><path d="M10.5 9.5v5l4-2.5z" fill="currentColor" /></svg>);
export const ReplayIcon = (p: P) => (<svg {...base(p)}><path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v5h5" /></svg>);
