import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CategoryNavItemProps {
  id: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: (id: string) => void;
}

export const CategoryNavItem = ({ id, label, icon: Icon, active, onClick }: CategoryNavItemProps) => {
  return (
    <button
      onClick={() => onClick(id)}
      className="relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-colors md:text-sm"
      style={{ color: active ? '#0B1C30' : '#64748B' }}
    >
      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${active ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
        <Icon size={14} />
      </span>
      <span>{label}</span>
      {active && (
        <motion.span
          layoutId="activeCategoryUnderline"
          className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-[#004AC6]"
        />
      )}
    </button>
  );
};
