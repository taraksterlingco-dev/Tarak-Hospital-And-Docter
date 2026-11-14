import { useEffect } from 'react';
import { Check, X } from './Icons';

export interface BookingSummary {
  title: string;
  subtitle: string;
  details: Array<{ label: string; value: string }>;
}

interface BookingModalProps {
  open: boolean;
  summary: BookingSummary | null;
  onClose: () => void;
}

export function BookingModal({ open, summary, onClose }: BookingModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open || !summary) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-xs"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close confirmation dialog"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-teal-600"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 mb-4">
          <Check className="w-6 h-6" aria-hidden="true" />
        </div>

        <h3 id="booking-modal-title" className="font-display text-xl font-bold text-slate-900">
          {summary.title}
        </h3>
        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{summary.subtitle}</p>

        <dl className="mt-5 divide-y divide-slate-100 rounded-xl border border-slate-200/80 bg-slate-50/70 px-4">
          {summary.details.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 py-2.5 text-sm">
              <dt className="text-slate-500">{row.label}</dt>
              <dd className="font-medium text-slate-900 text-right tabular-nums">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
