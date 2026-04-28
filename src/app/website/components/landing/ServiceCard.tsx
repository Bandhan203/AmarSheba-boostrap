import { motion } from 'framer-motion';
import {
    Activity, ArrowRight, Car,
    ChefHat,
    HeartPulse,
    House,
    Siren,
    Wrench,
    Zap,
    type LucideIcon
} from 'lucide-react';
import { Provider } from '../../../data/mockData';

interface ServiceItem {
  id: string;
  name: string;
  nameBn: string;
  color: string;
  bg: string;
  emoji: string;
}

interface ServiceCardProps {
  service: ServiceItem;
  providers: Provider[];
  onClick: () => void;
}

const SERVICE_ICONS: Record<string, LucideIcon> = {
  maid: House,
  driver: Car,
  chef: ChefHat,
  plumber: Wrench,
  electrician: Zap,
  nursing: HeartPulse,
  physiotherapy: Activity,
  ambulance: Siren,
};

export const ServiceCard = ({ service, providers, onClick }: ServiceCardProps) => {
  const minPrice = providers.length ? Math.min(...providers.map((provider) => provider.price)) : 0;
  const Icon = SERVICE_ICONS[service.id] ?? House;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:border-slate-300 hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: service.color }} />
            <p className="text-xs text-slate-500" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
              {service.nameBn}
            </p>
          </div>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-transparent text-slate-700">
          <Icon size={18} />
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-slate-400">Providers</p>
          <p className="mt-0.5 font-semibold text-slate-700">{providers.length}</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-slate-400">Starting</p>
          <p className="mt-0.5 font-semibold text-slate-700">{minPrice > 0 ? `৳${minPrice}` : 'N/A'}</p>
        </div>
      </div>

      <div className="mt-5 inline-flex items-center justify-center gap-1 rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white transition-colors group-hover:bg-blue-600">
        Browse providers
        <ArrowRight size={12} />
      </div>
    </motion.button>
  );
};
