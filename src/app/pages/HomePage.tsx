import {
    AlertTriangle,
    Bell,
    ChevronDown,
    ChevronRight,
    MapPin,
    Search,
    Zap
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { MobileFrame } from '../components/MobileFrame';
import { ProviderCard } from '../components/ProviderCard';
import { useApp } from '../context/AppContext';
import { AREAS, CATEGORIES, PROVIDERS } from '../data/mockData';

export const HomePage = () => {
  const navigate = useNavigate();
  const { language, setLanguage, providerFilter, setProviderFilter, setSelectedCategory, selectedArea, setSelectedArea } = useApp();
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');

  const featuredProviders = PROVIDERS.filter(p => p.type === (providerFilter === 'expert' ? 'expert' : providerFilter === 'local' ? 'local' : true))
    .filter(p => p.type === 'expert' || p.rating >= 4.7)
    .slice(0, 4);

  const t = (en: string, bn: string) => language === 'bn' ? bn : en;

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto panel-shell" style={{ scrollbarWidth: 'none' }}>
        {/* Header */}
        <div className="bg-gradient-to-b from-[#1E88E5] to-[#1565C0] pt-12 pb-6 px-4">
          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-200 text-xs">{t('Good morning! 👋', 'শুভ সকাল! 👋')}</p>
              <h2 className="text-white font-bold text-lg">Rahim Ahmed</h2>
            </div>
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="bg-white/20 text-white text-xs px-2 py-1 rounded-lg font-medium"
              >
                {language === 'en' ? 'বাং' : 'EN'}
              </button>
              {/* Notification */}
              <button className="relative w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Bell size={18} className="text-white" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF9800] rounded-full border border-[#1565C0]" />
              </button>
              {/* Avatar */}
              <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-gray-900 text-sm">RA</div>
            </div>
          </div>

          {/* Location bar */}
          <button
            onClick={() => setShowAreaDropdown(!showAreaDropdown)}
            className="flex items-center gap-1.5 bg-white/20 rounded-xl px-3 py-2 mb-3 relative"
          >
            <MapPin size={14} className="text-white" />
            <span className="text-white text-sm font-medium">{selectedArea}</span>
            <ChevronDown size={14} className="text-white ml-auto" />
          </button>

          {showAreaDropdown && (
            <div className="absolute left-4 right-4 bg-white rounded-2xl shadow-xl z-50 p-2 mt-1">
              {['All Areas', ...AREAS].map(area => (
                <button
                  key={area}
                  onClick={() => { setSelectedArea(area); setShowAreaDropdown(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm hover:bg-gray-50 transition-colors"
                  style={{ color: area === selectedArea ? '#1E88E5' : '#374151' }}
                >
                  <MapPin size={13} className={area === selectedArea ? 'text-[#1E88E5]' : 'text-gray-400'} />
                  {area}
                </button>
              ))}
            </div>
          )}

          {/* Search bar */}
          <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white px-4 py-3 shadow-sm">
            <Search size={17} className="text-gray-400 flex-shrink-0" />
            <input
              className="flex-1 text-sm text-gray-700 outline-none placeholder:text-gray-400 bg-transparent"
              placeholder={t('Search services, providers...', 'সেবা, প্রদানকারী খুঁজুন...')}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {/* Emergency Banner */}
        <button
          onClick={() => { setSelectedCategory('plumber'); navigate('/providers'); }}
          className="mx-4 mt-4 rounded-2xl p-3.5 flex items-center gap-3 shadow-sm overflow-hidden relative"
          style={{ backgroundColor: '#FF9800' }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-4 top-0 bottom-0 flex items-center text-6xl">🔧⚡</div>
          </div>
          <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm">{t('Emergency Booking', 'জরুরি বুকিং')}</p>
            <p className="text-orange-100 text-xs">{t('Plumber & Electrician — Avg. 25 min arrival', 'প্লাম্বার ও ইলেকট্রিশিয়ান — গড় ২৫ মিনিটে পৌঁছানো')}</p>
          </div>
          <Zap size={18} className="text-white flex-shrink-0" />
        </button>

        {/* Local / Expert Toggle */}
        <div className="mx-4 mt-4">
          <div className="panel-card flex items-center p-1">
            {(['all', 'local', 'expert'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setProviderFilter(f)}
                className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  backgroundColor: providerFilter === f
                    ? f === 'expert' ? '#9C27B0' : f === 'local' ? '#4CAF50' : '#1E88E5'
                    : 'transparent',
                  color: providerFilter === f ? 'white' : '#9CA3AF',
                }}
              >
                {f === 'all' ? t('All', 'সব') : f === 'local' ? `🟢 ${t('Local', 'লোকাল')}` : `⭐ ${t('Expert', 'এক্সপার্ট')}`}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-5 px-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-sm">{t('Categories', 'বিভাগসমূহ')}</h3>
            <button className="text-xs font-medium flex items-center gap-0.5" style={{ color: '#1E88E5' }}>
              {t('See all', 'সব দেখুন')} <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  navigate('/providers');
                }}
                className="panel-card flex flex-col items-center gap-1.5 py-3 active:scale-95 transition-transform"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: cat.bg }}
                >
                  {cat.emoji}
                </div>
                <span className="text-[10px] text-gray-600 font-medium text-center leading-tight">
                  {language === 'bn' ? cat.nameBn : cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured providers */}
        <div className="mt-5 px-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-sm">
              {providerFilter === 'expert'
                ? t('⭐ Expert Providers', '⭐ এক্সপার্ট প্রদানকারী')
                : providerFilter === 'local'
                ? t('🟢 Local Providers', '🟢 লোকাল প্রদানকারী')
                : t('Featured Providers', 'বিশেষ প্রদানকারী')}
            </h3>
            <button
              onClick={() => navigate('/providers')}
              className="text-xs font-medium flex items-center gap-0.5"
              style={{ color: '#1E88E5' }}
            >
              {t('View all', 'সব দেখুন')} <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {featuredProviders.map(p => <ProviderCard key={p.id} provider={p} />)}
          </div>
        </div>

        {/* Promo banner */}
        <div
          className="mx-4 mt-5 rounded-2xl p-4 flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg, #0d47a1, #1E88E5)' }}
        >
          <div className="text-3xl">🎉</div>
          <div>
            <p className="text-white font-bold text-sm">{t('First booking 20% OFF', 'প্রথম বুকিংয়ে ২০% ছাড়')}</p>
            <p className="text-blue-200 text-xs">{t('Use code: AMARSHEBA20', 'কোড ব্যবহার করুন: AMARSHEBA20')}</p>
          </div>
          <button className="ml-auto bg-white text-[#1E88E5] text-xs font-bold px-3 py-1.5 rounded-xl flex-shrink-0">
            {t('Claim', 'নিন')}
          </button>
        </div>

        <div className="h-4" />
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};