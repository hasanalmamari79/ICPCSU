/**
 * Signature motif: thick rounded arcs in blue / yellow / red rotating slowly around a centre,
 * like the arms of the club logo. Purely decorative (aria-hidden). Rotation stops for
 * visitors who prefer reduced motion.
 */
function arc(r: number, from: number, to: number) {
  const rad = (d: number) => ((d - 90) * Math.PI) / 180;
  const x1 = r * Math.cos(rad(from));
  const y1 = r * Math.sin(rad(from));
  const x2 = r * Math.cos(rad(to));
  const y2 = r * Math.sin(rad(to));
  const large = to - from > 180 ? 1 : 0;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

type Props = { className?: string; strokeWidth?: number; tone?: 'brand' | 'light' };

export function OrbitArcs({ className = '', strokeWidth = 22, tone = 'brand' }: Props) {
  const c =
    tone === 'light'
      ? ['rgba(255,255,255,.16)', 'rgba(242,180,60,.55)', 'rgba(255,255,255,.10)']
      : ['#1561A4', '#F2B43C', '#BA2735'];
  const ring = (cls: string, children: React.ReactNode) => (
    <svg viewBox="-200 -200 400 400" className={`absolute inset-0 h-full w-full ${cls} motion-reduce:animate-none`}>
      <g fill="none" strokeLinecap="round" strokeWidth={strokeWidth}>
        {children}
      </g>
    </svg>
  );
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <div className="relative h-full w-full">
        {ring('animate-orbit', <path d={arc(176, 10, 120)} stroke={c[0]} />)}
        {ring('animate-orbit-rev', <path d={arc(138, 150, 250)} stroke={c[1]} />)}
        {ring('animate-orbit-slow', <path d={arc(100, 270, 350)} stroke={c[2]} />)}
      </div>
    </div>
  );
}
