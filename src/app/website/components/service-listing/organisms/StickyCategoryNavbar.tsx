import { motion } from 'framer-motion';
import { CategoryNavItem } from '../atoms/CategoryNavItem';
import { CATEGORY_ICONS } from '../serviceListingData';
import { ServiceCategoryMeta } from '../types';

interface StickyCategoryNavbarProps {
  categories: ServiceCategoryMeta[];
  activeCategory: string;
  onChangeCategory: (id: string) => void;
}

export const StickyCategoryNavbar = ({ categories, activeCategory, onChangeCategory }: StickyCategoryNavbarProps) => {
  return (
    <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="relative mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <motion.div
          layout
          className="flex w-full gap-1 overflow-x-auto whitespace-nowrap pr-8 scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.id] || CATEGORY_ICONS.maid;
            return (
              <CategoryNavItem
                key={category.id}
                id={category.id}
                label={category.name}
                icon={Icon}
                active={activeCategory === category.id}
                onClick={onChangeCategory}
              />
            );
          })}
        </motion.div>
        <div className="pointer-events-none absolute right-4 top-0 h-full w-12 bg-gradient-to-l from-white via-white/90 to-transparent sm:right-6 lg:right-8" />
      </div>
    </div>
  );
};
