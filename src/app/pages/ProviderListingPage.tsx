import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { BottomNav } from '../components/BottomNav';
import { ProviderCard } from '../components/ProviderCard';
import { CATEGORIES, PROVIDERS, AREAS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import {
  ChevronLeft, SlidersHorizontal, Search, X, ChevronDown
} from 'lucide-react';

export const ProviderListingPage = () => {
  const navigate = useNavigate();
  const { language, providerFilter, setProviderFilter, selectedCategory, setSelectedCategory, setSelectedProvider } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAreaFilter, setSelectedAreaFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'rating' | 'price_low' | 'price_high' | 'jobs'>('rating');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchText, setSearchText] = useState('');

  const t = (en: string, bn: string) => language === 'bn' ? bn : en;

  const cat = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  let filtered = PROVIDERS.filter(p => p.category === selectedCategory);
  if (providerFilter !== 'all') filtered = filtered.filter(p => p.type === providerFilter);
  if (selectedAreaFilter !== 'All') filtered = filtered.filter(p => p.area === selectedAreaFilter);
  if (searchText) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()));
  filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sortBy === 'price_low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price_high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'jobs') filtered = [...filtered].sort((a, b) => b.jobsCompleted - a.jobsCompleted);

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto relative" style={{ scrollbarWidth: 'none', backgroundColor: '#F5F7FA' }}>
          {/* Header */}
          <div className="bg-white px-4 pt-12 pb-4 shadow-sm sticky top-0 z-30">
            <div className="flex items-center gap-3 mb-3">
              <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <div className="flex items-center gap-2 flex-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: cat.bg }}>
                  {cat.emoji}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-base leading-tight">
                    {language === 'bn' ? cat.nameBn : cat.name}
                  </h2>
                  <p className="text-xs text-gray-400">{filtered.length} {t('providers found', 'প্রদানকারী পাওয়া গেছে')}</p>
                </div>
              </div>
              <button
                onClick={() => setShowFilters(true)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border"
                style={{ backgroundColor: '#E3F2FD', borderColor: '#BBDEFB' }}
              >
                <SlidersHorizontal size={16} style={{ color: '#1E88E5' }} />
              </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5 mb-3">
              <Search size={15} className="text-gray-400" />
              <input
                className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder:text-gray-400"
                placeholder={t('Search providers...', 'প্রদানকারী খুঁজুন...')}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
              {searchText && <button onClick={() => setSearchText('')}><X size={14} className="text-gray-400" /></button>}
            </div>

            {/* Type filter chips */}
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {(['all', 'local', 'expert'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setProviderFilter(f)}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-semibold border transition-all"
                  style={{
                    backgroundColor: providerFilter === f
                      ? f === 'expert' ? '#9C27B0' : f === 'local' ? '#4CAF50' : '#1E88E5'
                      : 'white',
                    color: providerFilter === f ? 'white' : '#6B7280',
                    borderColor: providerFilter === f
                      ? f === 'expert' ? '#9C27B0' : f === 'local' ? '#4CAF50' : '#1E88E5'
                      : '#E5E7EB',
                  }}
                >
                  {f === 'all' ? t('All', 'সব') : f === 'local' ? `🟢 ${t('Local', 'লোকাল')}` : `⭐ ${t('Expert', 'এক্সপার্ট')}`}
                </button>
              ))}
              <div className="w-px bg-gray-200 mx-1" />
              {/* Area chips */}
              {['All', 'Gulshan', 'Banani', 'Uttara', 'Dhanmondi'].map(area => (
                <button
                  key={area}
                  onClick={() => setSelectedAreaFilter(area)}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium border transition-all"
                  style={{
                    backgroundColor: selectedAreaFilter === area ? '#1E88E5' : 'white',
                    color: selectedAreaFilter === area ? 'white' : '#6B7280',
                    borderColor: selectedAreaFilter === area ? '#1E88E5' : '#E5E7EB',
                  }}
                >
                  {area}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs text-gray-400">{t('Sort:', 'সাজান:')}</span>
              {[
                { key: 'rating', label: t('Rating', 'রেটিং') },
                { key: 'price_low', label: t('Price ↑', 'মূল্য ↑') },
                { key: 'price_high', label: t('Price ↓', 'মূল্য ↓') },
                { key: 'jobs', label: t('Jobs', 'কাজ') },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setSortBy(opt.key as any)}
                  className="text-xs px-2.5 py-1 rounded-lg transition-all"
                  style={{
                    backgroundColor: sortBy === opt.key ? '#1E88E5' : '#F3F4F6',
                    color: sortBy === opt.key ? 'white' : '#6B7280',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 px-4 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all"
                style={{
                  backgroundColor: selectedCategory === c.id ? c.color : 'white',
                  color: selectedCategory === c.id ? 'white' : '#6B7280',
                  borderColor: selectedCategory === c.id ? c.color : '#E5E7EB',
                }}
              >
                {c.emoji} {language === 'bn' ? c.nameBn : c.name}
              </button>
            ))}
          </div>

          {/* Provider list */}
          <div className="px-4 space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">🔍</div>
                <p className="text-gray-500 font-medium">{t('No providers found', 'কোনো প্রদানকারী পাওয়া যায়নি')}</p>
                <p className="text-gray-400 text-sm mt-1">{t('Try adjusting filters', 'ফিল্টার পরিবর্তন করুন')}</p>
              </div>
            ) : (
              filtered.map(p => <ProviderCard key={p.id} provider={p} />)
            )}
          </div>

          <div className="h-4" />

          {/* Filter Sheet */}
          {showFilters && (
            <div className="absolute inset-0 z-50">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[70%] overflow-y-auto">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg text-gray-900">{t('Filters', 'ফিল্টার')}</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={22} className="text-gray-400" />
                  </button>
                </div>

                {/* Price range */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-700 block mb-3">
                    {t('Price Range', 'মূল্য পরিসীমা')}: ৳{priceRange[0]} – ৳{priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min={0} max={2000} step={50}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#1E88E5]"
                  />
                </div>

                {/* Area */}
                <div className="mb-5">
                  <label className="text-sm font-semibold text-gray-700 block mb-2">{t('Area', 'এলাকা')}</label>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...AREAS].map(area => (
                      <button
                        key={area}
                        onClick={() => setSelectedAreaFilter(area)}
                        className="text-xs px-3 py-1.5 rounded-full border font-medium"
                        style={{
                          backgroundColor: selectedAreaFilter === area ? '#E3F2FD' : 'white',
                          borderColor: selectedAreaFilter === area ? '#1E88E5' : '#E5E7EB',
                          color: selectedAreaFilter === area ? '#1E88E5' : '#6B7280',
                        }}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full py-3.5 rounded-2xl text-white font-bold"
                  style={{ backgroundColor: '#1E88E5' }}
                >
                  {t('Apply Filters', 'ফিল্টার প্রয়োগ করুন')}
                </button>
              </div>
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};