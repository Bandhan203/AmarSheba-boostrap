interface StatsBadgeProps {
  label: string;
  value: string;
  tone?: 'neutral' | 'purple' | 'green' | 'amber';
}

const toneClassMap = {
  neutral: 'bg-slate-50 text-slate-700',
  purple: 'bg-purple-50 text-purple-700',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
};

export const StatsBadge = ({ label, value, tone = 'neutral' }: StatsBadgeProps) => {
  return (
    <div className={`rounded-xl px-3 py-2 ${toneClassMap[tone]}`}>
      <p className="text-[10px] uppercase tracking-wide opacity-75">{label}</p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
};
