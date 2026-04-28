import {
    ArrowRight,
    Filter, MapPin,
    Search,
    Shield, SlidersHorizontal,
    Star,
    X
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AREAS, CATEGORIES, PROVIDERS } from '../data/mockData';

const CATEGORY_IMAGES: Record<string, string> = {
  maid: 'https://images.unsplash.com/photo-1716989951759-4d6f4116f75a?w=400&q=80',
  driver: 'https://images.unsplash.com/photo-1684535571202-5ac41527b08a?w=400&q=80',
  chef: 'https://images.unsplash.com/photo-1694388004582-7805f7f86395?w=400&q=80',
  plumber: 'https://images.unsplash.com/photo-1720675381413-2008f56fbb51?w=400&q=80',
  electrician: 'https://images.unsplash.com/photo-1653669486771-8ee1ea4d7af8?w=400&q=80',
  nursing: 'https://images.unsplash.com/photo-1699284075305-cf6ef43df6eb?w=400&q=80',
  physiotherapy: 'https://images.unsplash.com/photo-1612531385446-f7b6b4ef7cc4?w=400&q=80',
  ambulance: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&q=80',
  carpenter: 'https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=400&q=80',
  plasterer: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=400&q=80',
  tiler: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&q=80',
  painter: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80',
  bricklayer: 'https://images.unsplash.com/photo-1465800872432-03d5b1f64b00?w=400&q=80',
  flooring: 'https://images.unsplash.com/photo-1615529162924-f860538846e8?w=400&q=80',
};

export const WebProvidersPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'all');
  const [selectedArea, setSelectedArea] = useState(searchParams.get('area') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availableDay, setAvailableDay] = useState('all');

  const filteredProviders = useMemo(() => {
    let list = PROVIDERS.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedArea !== 'all' && p.area !== selectedArea) return false;
      if (selectedType !== 'all' && p.type !== selectedType) return false;
      if (p.rating < minRating) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (verifiedOnly && !p.verified) return false;
      if (availableDay !== 'all' && !p.availability.includes(availableDay)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'experience') return b.yearsExp - a.yearsExp;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      return 0;
    });

    return list;
  }, [selectedCategory, selectedArea, selectedType, minRating, sortBy, searchQuery, priceRange, verifiedOnly, availableDay]);

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedArea !== 'all',
    selectedType !== 'all',
    minRating > 0,
    priceRange[0] > 0 || priceRange[1] < 5000,
    verifiedOnly,
    availableDay !== 'all',
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedArea('all');
    setSelectedType('all');
    setMinRating(0);
    setPriceRange([0, 5000]);
    setVerifiedOnly(false);
    setAvailableDay('all');
    setSearchQuery('');
  };

  return (
    <div className="panel-shell">
      <div className="bg-gradient-to-br from-[#0B1C30] via-[#123A72] to-[#004AC6] py-14">
        <div className="panel-container">
          <h1 className="mb-2 text-4xl font-extrabold text-white md:text-5xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            {language === 'en' ? 'Find Service Providers' : 'সেবাদাতা খুঁজুন'}
          </h1>
          <p className="mb-7 text-sm text-blue-100 md:text-base">
            Browse {PROVIDERS.length} verified providers across 8 categories in Dhaka
          </p>

          <div className="flex max-w-3xl gap-2 rounded-2xl border border-white/20 bg-white/95 p-2 shadow-xl backdrop-blur-sm">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search size={16} className="shrink-0 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, category, area..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-sm text-gray-700 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <X size={14} className="text-gray-400" />
                </button>
              )}
            </div>
            <button
              className="flex items-center gap-2 rounded-xl bg-[#004AC6] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <Search size={16} />
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="panel-container py-10">
        <div className="flex gap-6">

          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-5">
            <div className="panel-card sticky top-24 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal size={16} style={{ color: '#1E88E5' }} />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center" style={{ background: '#1E88E5' }}>
                      {activeFiltersCount}
                    </span>
                  )}
                </h3>
                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-700">Clear all</button>
                )}
              </div>

              {/* Category filter */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Service Category</label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === 'all' ? 'text-white font-medium' : 'text-gray-600 hover:bg-slate-50'}`}
                    style={selectedCategory === 'all' ? { background: '#1E88E5' } : {}}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 ${selectedCategory === cat.id ? 'font-medium text-white' : 'text-gray-600 hover:bg-slate-50'}`}
                      style={selectedCategory === cat.id ? { background: cat.color } : {}}
                    >
                      <span className="text-base leading-none grayscale-[0.5] group-hover:grayscale-0">{cat.emoji}</span>
                      <span className="truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Area filter */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Area</label>
                <select
                  value={selectedArea}
                  onChange={e => setSelectedArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-700 bg-white focus:outline-none focus:border-blue-400"
                >
                  <option value="all">All Dhaka Areas</option>
                  {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              {/* Provider type */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Provider Type</label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Types', color: '#1E88E5' },
                    { value: 'local', label: 'Local Provider', color: '#4CAF50' },
                    { value: 'expert', label: 'Expert Provider', color: '#7B1FA2' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedType(opt.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedType === opt.value ? 'font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                      style={selectedType === opt.value ? { background: `${opt.color}15`, color: opt.color } : {}}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Min rating */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Minimum Rating</label>
                <div className="space-y-1">
                  {[0, 4.0, 4.5, 4.8].map(r => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${minRating === r ? 'font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                      style={minRating === r ? { background: '#FFF3E015', color: '#F57C00' } : {}}
                    >
                      {r === 0 ? 'Any Rating' : `⭐ ${r}+ Stars`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Verification</label>
                <button
                  onClick={() => setVerifiedOnly(v => !v)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${verifiedOnly ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  Insurance & ID Verified Only
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Availability</label>
                <select
                  value={availableDay}
                  onChange={e => setAvailableDay(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-700 bg-white focus:outline-none"
                >
                  <option value="all">Any Day</option>
                  <option value="Mon">Mon</option>
                  <option value="Tue">Tue</option>
                  <option value="Wed">Wed</option>
                  <option value="Thu">Thu</option>
                  <option value="Fri">Fri</option>
                  <option value="Sat">Sat</option>
                  <option value="Sun">Sun</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredProviders.length}</span> providers
                {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <Filter size={15} />
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 focus:border-blue-400 focus:outline-none"
                >
                  <option value="rating">Sort: Rating</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="experience">Experience</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>

            {/* Mobile filters */}
            {showFilters && (
              <div className="lg:hidden bg-white rounded-2xl border border-gray-100 p-5 mb-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={e => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-700 bg-white focus:outline-none"
                    >
                      <option value="all">All Categories</option>
                      {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Area</label>
                    <select
                      value={selectedArea}
                      onChange={e => setSelectedArea(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-700 bg-white focus:outline-none"
                    >
                      <option value="all">All Areas</option>
                      {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Provider Type</label>
                    <select
                      value={selectedType}
                      onChange={e => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-700 bg-white focus:outline-none"
                    >
                      <option value="all">All Types</option>
                      <option value="local">Local</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Min Rating</label>
                    <select
                      value={minRating}
                      onChange={e => setMinRating(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-700 bg-white focus:outline-none"
                    >
                      <option value={0}>Any Rating</option>
                      <option value={4.0}>4.0+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                      <option value={4.8}>4.8+ Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Verification</label>
                    <select
                      value={verifiedOnly ? 'verified' : 'all'}
                      onChange={e => setVerifiedOnly(e.target.value === 'verified')}
                      className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-700 bg-white focus:outline-none"
                    >
                      <option value="all">All Providers</option>
                      <option value="verified">Verified Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Availability</label>
                    <select
                      value={availableDay}
                      onChange={e => setAvailableDay(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 text-gray-700 bg-white focus:outline-none"
                    >
                      <option value="all">Any Day</option>
                      <option value="Mon">Mon</option>
                      <option value="Tue">Tue</option>
                      <option value="Wed">Wed</option>
                      <option value="Thu">Thu</option>
                      <option value="Fri">Fri</option>
                      <option value="Sat">Sat</option>
                      <option value="Sun">Sun</option>
                    </select>
                  </div>
                </div>
                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters} className="mt-3 text-sm text-red-500 hover:text-red-700">
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* Provider cards */}
            {filteredProviders.length === 0 ? (
              <div className="panel-card py-20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <Search size={28} style={{ color: '#1E88E5' }} />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">No providers found</h3>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search query</p>
                <button onClick={clearFilters} className="panel-btn-primary px-4 py-2 text-sm font-medium">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProviders.map(provider => {
                  const cat = CATEGORIES.find(c => c.id === provider.category);
                  return (
                    <button
                      key={provider.id}
                      onClick={() => navigate(`/find/${provider.id}`)}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      {/* Photo */}
                      <div className="relative">
                        {provider.photo ? (
                          <img src={provider.photo} alt={provider.name} className="w-full h-44 object-cover" />
                        ) : (
                          <img
                            src={CATEGORY_IMAGES[provider.category]}
                            alt={provider.name}
                            className="w-full h-44 object-cover"
                          />
                        )}
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-sm"
                            style={{ background: provider.type === 'expert' ? '#7B1FA2' : '#4CAF50' }}
                          >
                            {provider.type === 'expert' ? 'Expert' : 'Local'}
                          </span>
                        </div>
                        {provider.verified && (
                          <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm">
                            <Shield size={13} style={{ color: '#1E88E5' }} />
                          </div>
                        )}
                        {/* Category pill */}
                        <div
                          className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white backdrop-blur-sm"
                          style={{ background: `${cat?.color || '#1E88E5'}CC` }}
                        >
                          {cat?.name}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{provider.name}</h3>
                            <p className="text-[10px] text-gray-400" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>{provider.nameBn}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-base" style={{ color: '#1E88E5' }}>৳{provider.price}</div>
                            <div className="text-[10px] text-gray-400">{provider.priceUnit}</div>
                          </div>
                        </div>

                        <div className="mb-3 flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-0.5">
                            <Star size={11} fill="#F9A825" color="#F9A825" />
                            <span className="font-medium text-gray-700">{provider.rating}</span>
                            <span className="text-gray-400">({provider.reviewCount})</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin size={11} />
                            {provider.area}
                          </span>
                          <span>•</span>
                          <span>{provider.yearsExp}yr exp</span>
                        </div>

                        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-500">{provider.description}</p>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-400">
                            <span className="font-medium text-gray-600">{provider.jobsCompleted}</span> jobs completed
                          </span>
                          <span
                            className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: '#1E88E5' }}
                          >
                            Book Now <ArrowRight size={11} />
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
