import {
    Briefcase,
    Calendar,
    ChevronLeft,
    Clock,
    Heart, MapPin,
    MessageCircle, Phone,
    Share2,
    ShieldCheck,
    Star
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { RatingStars, TypeBadge } from '../components/ProviderCard';
import { useApp } from '../context/AppContext';
import { PROVIDERS } from '../data/mockData';

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
const getAvatarColor = (id: string) => {
  const colors = ['#1E88E5', '#9C27B0', '#4CAF50', '#FF9800', '#E91E63', '#00BCD4'];
  return colors[parseInt(id.replace(/\D/g, '')) % colors.length];
};

export const ProviderProfilePage = () => {
  const navigate = useNavigate();
  const { language, selectedProvider, setSelectedProvider, setBookingData } = useApp();
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews'>('about');

  const provider = selectedProvider || PROVIDERS[0];
  const t = (en: string, bn: string) => language === 'bn' ? bn : en;

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const portfolioSamples = [
    'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=400&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80',
    'https://images.unsplash.com/photo-1616594039964-3cb0c869e73e?w=400&q=80',
  ];
  const serviceCoverage = ['Gulshan-1', 'Gulshan-2', 'Banani', 'Uttara Sector 7'];
  const postalCodes = ['1212', '1213', '1230'];
  const offeredCategories = ['Carpenters', 'Painters & Decorators', 'Flooring Specialists/Agency'];

  return (
    <MobileFrame>
      <div className="min-h-full bg-white">
        {/* Hero */}
        <div className="relative h-56">
          {provider.photo ? (
            <img src={provider.photo} alt={provider.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: getAvatarColor(provider.id) }}>
              <span className="text-8xl font-bold text-white/30">{getInitials(provider.name)}</span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Back & actions */}
          <div className="absolute top-12 left-4 right-4 flex justify-between items-center">
            <button onClick={() => navigate(-1)} className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow">
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <div className="flex gap-2">
              <button className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow">
                <Share2 size={16} className="text-gray-700" />
              </button>
              <button onClick={() => setLiked(!liked)} className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow">
                <Heart size={16} fill={liked ? '#E91E63' : 'none'} stroke={liked ? '#E91E63' : '#374151'} />
              </button>
            </div>
          </div>
          {/* Verified badge overlay */}
          {provider.verified && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2">
              <div className="bg-[#9C27B0] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                <ShieldCheck size={12} /> {t('Verified Expert', 'যাচাইকৃত বিশেষজ্ঞ')}
              </div>
            </div>
          )}
        </div>

        {/* Provider info card */}
        <div className="px-4 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-bold text-gray-900 text-lg leading-tight">
                  {language === 'bn' ? provider.nameBn : provider.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <TypeBadge type={provider.type} />
                  {provider.verified && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-purple-100 text-purple-700 flex items-center gap-1">
                      <ShieldCheck size={9} /> {t('Verified', 'যাচাইকৃত')}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl" style={{ color: '#1E88E5' }}>৳{provider.price.toLocaleString()}</div>
                <div className="text-xs text-gray-400">{provider.priceUnit}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Star size={13} fill="#F9A825" stroke="#F9A825" />
                  <span className="font-bold text-gray-900 text-sm">{provider.rating}</span>
                </div>
                <p className="text-[10px] text-gray-400">{provider.reviewCount} {t('reviews', 'রিভিউ')}</p>
              </div>
              <div className="text-center border-x border-gray-100">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Briefcase size={13} className="text-[#1E88E5]" />
                  <span className="font-bold text-gray-900 text-sm">{provider.jobsCompleted}</span>
                </div>
                <p className="text-[10px] text-gray-400">{t('Jobs done', 'কাজ')}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Clock size={13} className="text-[#4CAF50]" />
                  <span className="font-bold text-gray-900 text-sm">{provider.yearsExp}yr</span>
                </div>
                <p className="text-[10px] text-gray-400">{t('Experience', 'অভিজ্ঞতা')}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-3">
              <MapPin size={13} className="text-gray-400" />
              <span className="text-xs text-gray-500">{language === 'bn' ? provider.areaBn : provider.area}, Dhaka</span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex gap-2 px-4 mt-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#1E88E5] text-[#1E88E5] text-sm font-semibold">
            <MessageCircle size={16} /> {t('Chat', 'চ্যাট')}
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold">
            <Phone size={16} /> {t('Call', 'কল')}
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold">
            <Calendar size={16} /> {t('Schedule', 'সময়সূচি')}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 mx-4 mt-4">
          {(['about', 'services', 'reviews'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 text-sm font-semibold capitalize transition-all"
              style={{
                color: activeTab === tab ? '#1E88E5' : '#9CA3AF',
                borderBottom: activeTab === tab ? '2px solid #1E88E5' : '2px solid transparent',
              }}
            >
              {tab === 'about' ? t('About', 'সম্পর্কে') : tab === 'services' ? t('Services', 'সেবা') : t('Reviews', 'রিভিউ')}
            </button>
          ))}
        </div>

        <div className="px-4 py-4">
          {activeTab === 'about' && (
            <div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {language === 'bn' ? provider.descriptionBn : provider.description}
              </p>
              {/* Availability */}
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 text-sm mb-2">{t('Availability', 'উপলব্ধতা')}</h4>
                <div className="flex gap-1.5">
                  {daysOfWeek.map(day => (
                    <div
                      key={day}
                      className="flex-1 py-1.5 rounded-lg text-center text-[10px] font-semibold"
                      style={{
                        backgroundColor: provider.availability.includes(day) ? '#E3F2FD' : '#F3F4F6',
                        color: provider.availability.includes(day) ? '#1E88E5' : '#9CA3AF',
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              {/* Category badge */}
              <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <ShieldCheck size={16} className="text-[#1E88E5]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">{t('Background Verified', 'ব্যাকগ্রাউন্ড যাচাইকৃত')}</p>
                    <p className="text-[10px] text-gray-400">{t('NID & criminal record checked', 'NID ও অপরাধের রেকর্ড পরীক্ষিত')}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[10px] text-gray-400">Business Registration</p>
                  <p className="text-xs font-semibold text-gray-800 mt-0.5">TRD-28474-2026</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <p className="text-[10px] text-gray-400">Pricing Model</p>
                  <p className="text-xs font-semibold text-gray-800 mt-0.5">Hourly + Project-based</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                <p className="text-xs font-semibold text-gray-800 mb-2">Multi-category Offerings</p>
                <div className="flex flex-wrap gap-1.5">
                  {offeredCategories.map(category => (
                    <span key={category} className="text-[10px] px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                <p className="text-xs font-semibold text-gray-800 mb-2">Service Area Coverage</p>
                <p className="text-[11px] text-gray-600 mb-2">Districts: {serviceCoverage.join(', ')}</p>
                <p className="text-[11px] text-gray-600">Postal Codes: {postalCodes.join(', ')}</p>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                <p className="text-xs font-semibold text-gray-800 mb-2">Portfolio / Previous Work</p>
                <div className="grid grid-cols-3 gap-2">
                  {portfolioSamples.map((photo, idx) => (
                    <img key={idx} src={photo} alt={`Portfolio ${idx + 1}`} className="w-full h-16 object-cover rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-2">
              {provider.services.map((svc, i) => (
                <div key={i} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{language === 'bn' ? svc.nameBn : svc.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{t('Standard rate', 'স্ট্যান্ডার্ড রেট')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm" style={{ color: '#1E88E5' }}>৳{svc.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {/* Rating summary */}
              <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{provider.rating}</div>
                  <RatingStars rating={provider.rating} size={14} />
                  <p className="text-xs text-gray-400 mt-1">{provider.reviewCount} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map(s => {
                    const pct = s === 5 ? 75 : s === 4 ? 20 : s === 3 ? 3 : s === 2 ? 1 : 1;
                    return (
                      <div key={s} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-3">{s}</span>
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-yellow-400" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-gray-400 w-7">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reviews */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: 'Quality', score: 4.9 },
                  { label: 'Timeliness', score: 4.7 },
                  { label: 'Communication', score: 4.8 },
                  { label: 'Value', score: 4.6 },
                ].map(item => (
                  <div key={item.label} className="rounded-xl bg-white border border-gray-100 p-2">
                    <p className="text-[10px] text-gray-500">{item.label}</p>
                    <p className="text-xs font-semibold text-gray-800">{item.score} / 5</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {provider.reviews.map(r => (
                  <div key={r.id} className="bg-gray-50 rounded-2xl p-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#1E88E5] rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {r.customerName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{r.customerName}</p>
                          <p className="text-[10px] text-gray-400">{r.date}</p>
                        </div>
                      </div>
                      <RatingStars rating={r.rating} size={11} />
                    </div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">Verified Customer</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">Photo/Video Evidence</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.comment}</p>
                    <p className="text-[10px] text-gray-500 mt-1">Provider response: Thanks for your feedback. We will keep improving.</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs text-gray-400">{t('Starting from', 'শুরু হয়')}</span>
              <div className="font-bold text-lg" style={{ color: '#1E88E5' }}>৳{provider.price.toLocaleString()}<span className="text-xs text-gray-400 font-normal">{provider.priceUnit}</span></div>
            </div>
            <button
              onClick={() => {
                setBookingData({ providerId: provider.id, amount: provider.price });
                navigate('/book');
              }}
              className="flex-1 ml-4 py-3.5 rounded-2xl text-white font-bold text-base shadow-lg"
              style={{ backgroundColor: '#1E88E5' }}
            >
              {t('Book Now', 'এখনই বুক করুন')}
            </button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};
