import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PROVIDERS } from '../data/mockData';
import { EnhancedServiceCard } from './components/service-listing/organisms/EnhancedServiceCard';
import { FaqSection } from './components/service-listing/organisms/FaqSection';
import { StickyCategoryNavbar } from './components/service-listing/organisms/StickyCategoryNavbar';
import { TrustSection } from './components/service-listing/organisms/TrustSection';
import { SERVICE_FAQS, SERVICE_LISTING_DETAILS } from './components/service-listing/serviceListingData';
import { ServiceCategoryMeta } from './components/service-listing/types';

const listContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

export const WebServicesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>(searchParams.get('cat') || 'all');

  const stickyCategories: ServiceCategoryMeta[] = useMemo(() => {
    const allCategory: ServiceCategoryMeta = {
      id: 'all',
      name: 'All',
      nameBn: 'সব',
      color: '#004AC6',
      bg: '#EFF4FF',
    };

    return [
      allCategory,
      ...CATEGORIES.map((category) => ({
        id: category.id,
        name: category.name,
        nameBn: category.nameBn,
        color: category.color,
        bg: category.bg,
      })),
    ];
  }, []);

  const visibleCategories = useMemo(() => {
    if (activeCategory === 'all') {
      return CATEGORIES;
    }

    return CATEGORIES.filter((category) => category.id === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-gray-50 font-['Inter',sans-serif] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Sparkles size={13} />
              Marketplace Service Detail Listing
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              {language === 'en' ? 'Compare & Select Service Packages' : 'সার্ভিস প্যাকেজ তুলনা করে বাছাই করুন'}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Browse category-wise packages with provider stats, service breakdown, and starting price — core info first, full details on demand.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => navigate('/find')}
                className="rounded-xl bg-[#004AC6] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                Browse Providers
              </button>
              <button
                onClick={() => navigate('/how-it-works')}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      <StickyCategoryNavbar
        categories={stickyCategories}
        activeCategory={activeCategory}
        onChangeCategory={setActiveCategory}
      />

      <main className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8 lg:space-y-16 lg:py-14">
        <motion.section
          variants={listContainerVariants}
          initial="hidden"
          animate="show"
        >
          {visibleCategories.map((category) => {
            const detail = SERVICE_LISTING_DETAILS.find((item) => item.id === category.id);
            if (!detail) return null;

            const providers = PROVIDERS.filter((provider) => provider.category === category.id);

            return (
              <motion.div key={category.id} variants={listItemVariants}>
                <EnhancedServiceCard
                  category={{
                    id: category.id,
                    name: category.name,
                    nameBn: category.nameBn,
                    color: category.color,
                    bg: category.bg,
                  }}
                  detail={detail}
                  providers={providers}
                  onSelectCategory={(selectedId) => navigate(`/find?cat=${selectedId}`)}
                />
              </motion.div>
            );
          })}
        </motion.section>

        <TrustSection />

        <FaqSection items={SERVICE_FAQS} />

        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center md:px-10">
          <h3 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            Ready to Book a Service?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
            Compare packages, choose a verified provider, and complete your booking in a few taps.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/find')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#004AC6] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Browse All Providers
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate('/how-it-works')}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              How It Works
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};