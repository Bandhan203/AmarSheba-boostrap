import { motion } from 'framer-motion';
import { CheckCircle2, PlusCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Provider } from '../../../../data/mockData';
import { StatsBadge } from '../atoms/StatsBadge';
import { PricingBar } from '../molecules/PricingBar';
import { ServiceCategoryMeta, ServiceListingDetail } from '../types';

interface EnhancedServiceCardProps {
  category: ServiceCategoryMeta;
  detail: ServiceListingDetail;
  providers: Provider[];
  onSelectCategory: (categoryId: string) => void;
}

export const EnhancedServiceCard = ({ category, detail, providers, onSelectCategory }: EnhancedServiceCardProps) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const stats = useMemo(() => {
    const expertCount = providers.filter((provider) => provider.type === 'expert').length;
    const averageRating = providers.length
      ? providers.reduce((sum, provider) => sum + provider.rating, 0) / providers.length
      : 0;
    const minimumPrice = providers.length
      ? Math.min(...providers.map((provider) => provider.price))
      : 0;

    return {
      expertCount,
      averageRating,
      minimumPrice,
    };
  }, [providers]);

  const visibleServices = showAllFeatures ? detail.servicesOffered : detail.servicesOffered.slice(0, 4);

  return (
    <motion.article
      layout
      whileHover={{ y: -4, boxShadow: '0px 20px 30px rgba(15,23,42,0.08)' }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="grid h-full lg:grid-cols-[1.15fr_1fr]">
        <div className="h-64 lg:h-full">
          <img src={detail.image} alt={detail.titleEn} className="h-full w-full object-cover" />
        </div>

        <div className="flex h-full flex-col gap-6 p-6 md:p-7">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">{category.nameBn}</p>
              <h3 className="mt-1 line-clamp-2 text-xl font-bold text-slate-900 md:text-2xl">{detail.titleEn}</h3>
            </div>
            <span className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-500">
              Premium
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StatsBadge label="Providers" value={`${providers.length}`} tone="neutral" />
            <StatsBadge label="Experts" value={`${stats.expertCount}`} tone="purple" />
            <StatsBadge label="Rating" value={stats.averageRating ? stats.averageRating.toFixed(1) : 'N/A'} tone="amber" />
          </div>

          <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed text-slate-600">{detail.shortDescription}</p>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-800">Services Offered</h4>
            <div className="grid max-h-40 grid-cols-1 content-start gap-2 overflow-y-auto pr-1 text-sm text-slate-600 sm:grid-cols-2">
              {visibleServices.map((service) => (
                <div key={service} className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                  <CheckCircle2 size={14} style={{ color: category.color }} className="shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
            {detail.servicesOffered.length > 4 && (
              <button
                onClick={() => setShowAllFeatures((state) => !state)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-800"
              >
                <PlusCircle size={14} />
                {showAllFeatures ? 'Show less' : 'Show details'}
              </button>
            )}
          </div>

          <PricingBar
            startingFrom={stats.minimumPrice}
            color={category.color}
            onClick={() => onSelectCategory(category.id)}
          />
        </div>
      </div>
    </motion.article>
  );
};
