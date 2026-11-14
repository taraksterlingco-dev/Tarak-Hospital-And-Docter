import { Link } from 'react-router-dom';
import { BRAND_ASSETS } from '../data/mockHealthcareData';
import { ArrowLeft } from './Icons';

export function TarakSterlingLogo({ className = 'h-10 w-auto' }: { className?: string }) {
  return (
    <img
      src={BRAND_ASSETS.logo}
      alt="Tarak Sterling"
      referrerPolicy="no-referrer"
      className={`${className} object-contain mix-blend-multiply select-none`}
    />
  );
}

export function DemoBrandBadge() {
  return (
    <div
      className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 rounded-xl border border-slate-200/90 bg-white/95 px-2.5 sm:px-3 py-1.5 shadow-sm backdrop-blur-sm shrink-0"
      aria-label="Demo by Tarak Sterling"
    >
      <img
        src={BRAND_ASSETS.logo}
        alt="Tarak Sterling logo"
        referrerPolicy="no-referrer"
        className="h-3.5 sm:h-4 w-auto object-contain mix-blend-multiply"
      />
      <span className="text-[11px] sm:text-xs font-medium text-slate-600 whitespace-nowrap">
        Demo by Tarak Sterling
      </span>
    </div>
  );
}

export function BackToSelectorButton() {
  return (
    <Link
      to="/"
      className="pointer-events-auto inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-900 px-3 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-white shadow-md transition-all duration-150 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 whitespace-nowrap shrink-0"
    >
      <ArrowLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span className="sm:hidden">Demo Selector</span>
      <span className="hidden sm:inline">Back to Demo Selector</span>
    </Link>
  );
}

export function FloatingDemoControls({ showBack }: { showBack: boolean }) {
  return (
    <div
      className={`pointer-events-none fixed bottom-3 inset-x-3 z-40 flex items-center gap-2 ${
        showBack ? 'justify-between' : 'justify-end'
      }`}
    >
      {showBack ? <BackToSelectorButton /> : null}
      <DemoBrandBadge />
    </div>
  );
}

export function SiteFooter({
  entityName,
  subtitle,
  links,
}: {
  entityName?: string;
  subtitle?: string;
  links?: Array<{ label: string; href: string }>;
}) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            {entityName ? (
              <p className="font-display text-base font-bold text-slate-900">{entityName}</p>
            ) : null}
            {subtitle ? <p className="text-sm text-slate-600 max-w-md">{subtitle}</p> : null}
            <div className="flex items-center gap-3 pt-1">
              <TarakSterlingLogo className="h-7 w-auto" />
              <span className="text-xs font-medium text-slate-500">· Demo by Tarak Sterling</span>
            </div>
          </div>

          {links && links.length > 0 ? (
            <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-600 hover:text-teal-700 transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
