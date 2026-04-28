import { CheckCircle2 } from 'lucide-react';

const TRUST_ITEMS = [
  'Verified category specialists with consistent quality checks',
  'Transparent pricing and service-tier visibility before booking',
  'Responsive support and claim resolution workflows when needed',
];

export const TrustSection = () => {
  return (
    <section className="rounded-3xl bg-white p-6 md:p-8">
      <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Why Book From Us</h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
        AmarSheba prioritizes trust-first marketplace experiences with clean pricing, vetted providers, and predictable service outcomes.
      </p>

      <div className="mt-6 space-y-4">
        {TRUST_ITEMS.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
            <p className="text-sm text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
