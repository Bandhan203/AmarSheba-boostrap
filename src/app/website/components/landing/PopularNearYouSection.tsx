import { motion } from 'framer-motion';
import { ArrowRight, Flame, MapPin } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

interface PopularNearYouItem {
  categoryId: string;
  name: string;
  nameBn: string;
  startingFrom: number;
}

interface PopularNearYouSectionProps {
  area: string;
  services: PopularNearYouItem[];
  onOpenCategory: (categoryId: string, area: string) => void;
}

export const PopularNearYouSection = ({ area, services, onOpenCategory }: PopularNearYouSectionProps) => {
  return (
    <section className="bg-slate-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Popular Near You"
          title={`Trending in ${area}`}
          description="Location-aware suggestions people are booking most right now."
          align="left"
        />

        <div className="mt-8 grid grid-flow-col auto-cols-[84%] gap-4 overflow-x-auto pb-2 sm:auto-cols-[48%] lg:grid-flow-row lg:grid-cols-3 lg:auto-cols-auto lg:overflow-visible">
          {services.map((service, index) => (
            <motion.button
              key={`${service.categoryId}-${service.name}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
              whileHover={{ y: -3 }}
              onClick={() => onOpenCategory(service.categoryId, area)}
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-600">
                  <Flame size={12} /> Trending
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <MapPin size={12} /> {area}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">{service.name}</h3>
              <p className="text-xs text-slate-500" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                {service.nameBn}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">Starting From</p>
                  <p className="text-base font-semibold text-slate-900">৳{service.startingFrom}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                  Explore <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
