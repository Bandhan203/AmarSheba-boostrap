import { ArrowRight } from 'lucide-react';

interface PricingBarProps {
  startingFrom: number;
  color: string;
  onClick: () => void;
}

export const PricingBar = ({ startingFrom, color, onClick }: PricingBarProps) => {
  return (
    <div className="mt-auto flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
      <div>
        <p className="text-xs text-slate-400">Starting From</p>
        <p className="mt-1 text-2xl font-extrabold" style={{ color }}>
          ৳{startingFrom}
          <span className="ml-1 text-sm font-medium text-slate-400">/service</span>
        </p>
      </div>
      <button
        onClick={onClick}
        className="inline-flex min-w-36 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        style={{ backgroundColor: color }}
      >
        View Service
        <ArrowRight size={15} />
      </button>
    </div>
  );
};
