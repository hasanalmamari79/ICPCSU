import { m } from 'framer-motion';

/**
 * Vector redraw of the club logo: three figures (blue, yellow, red) orbiting a navy centre.
 * Each figure is its own layer so the intro can rotate them into place.
 * (Original raster logo: assets/club-logo.webp)
 */
const VB = '-830 -830 1660 1660';
const FIGURE_PATH = 'M248 -535 L-7 -605 Q-140 -430 -357 -420 L-417 -115 Q-360 85 -197 150';
const FIGURES = [
  { color: '#1561A4', base: 0 },
  { color: '#F2B43C', base: 120 },
  { color: '#BA2735', base: 240 },
];

function Figure({ color, base }: { color: string; base: number }) {
  return (
    <svg viewBox={VB} className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g transform={`rotate(${base})`}>
        <path d={FIGURE_PATH} fill="none" stroke={color} strokeWidth={138} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={-260} cy={-660} r={105} fill={color} />
      </g>
    </svg>
  );
}

function Centre() {
  // Stepped "cross" core, like the logo centre.
  return (
    <svg viewBox={VB} className="absolute inset-0 h-full w-full" aria-hidden="true">
      <path
        fill="#0B427B"
        d="M-32 -118 H32 V-88 H92 V-30 H122 V30 H92 V88 H32 V118 H-32 V88 H-92 V30 H-122 V-30 H-92 V-88 H-32 Z"
      />
    </svg>
  );
}

type Props = { className?: string; assemble?: boolean; label?: string };

export function ClubLogo({ className = '', assemble = false, label }: Props) {
  return (
    <div className={`relative aspect-square ${className}`} role={label ? 'img' : undefined} aria-label={label}>
      {FIGURES.map((f, i) =>
        assemble ? (
          <m.div
            key={f.color}
            className="absolute inset-0"
            initial={{ rotate: -200, scale: 0.35, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.16, duration: 0.95, ease: [0.2, 0.9, 0.25, 1] }}
          >
            <Figure {...f} />
          </m.div>
        ) : (
          <Figure key={f.color} {...f} />
        ),
      )}
      {assemble ? (
        <m.div
          className="absolute inset-0"
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: [0, 1.25, 1], rotate: 0 }}
          transition={{ delay: 0.75, duration: 0.5, ease: 'easeOut' }}
        >
          <Centre />
        </m.div>
      ) : (
        <Centre />
      )}
    </div>
  );
}
