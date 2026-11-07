import { ClubLogo } from './ClubLogo';
import { OrbitArcs } from './OrbitArcs';

/** Shown instead of a missing/broken image: navy field with orbit arcs and the club mark. */
export function BrandPlaceholder({ className = '', logo = true }: { className?: string; logo?: boolean }) {
  return (
    <div className={`overflow-hidden bg-navy ${className || 'relative'}`} aria-hidden="true">
      <OrbitArcs tone="light" className="absolute -end-[15%] top-1/2 aspect-square h-[160%] -translate-y-1/2" strokeWidth={18} />
      <OrbitArcs className="absolute -start-[10%] -top-[30%] aspect-square h-[90%] opacity-30" strokeWidth={14} />
      {logo && (
        <div className="absolute end-[12%] top-[38%] -translate-y-1/2 rounded-full bg-white/95 p-5 shadow-2xl max-sm:hidden">
          <ClubLogo className="w-24 md:w-32" />
        </div>
      )}
    </div>
  );
}
