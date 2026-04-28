import {
    Bell,
    Building2,
    Camera,
    ChevronRight,
    CreditCard,
    Edit3,
    Globe,
    Heart,
    House,
    LogOut,
    Mail,
    MapPin,
    Phone,
    Shield,
    Star
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { MobileFrame } from '../components/MobileFrame';
import { useApp } from '../context/AppContext';

const menuSections = [
  {
    title: 'Account',
    titleBn: 'অ্যাকাউন্ট',
    items: [
      { icon: Phone, label: 'Phone Number', labelBn: 'ফোন নম্বর', value: '+880 17XX XXXXXX', valueType: 'text' },
      { icon: Mail, label: 'Email', labelBn: 'ইমেইল', value: 'rahim@email.com', valueType: 'text' },
      { icon: MapPin, label: 'Saved Addresses', labelBn: 'সংরক্ষিত ঠিকানা', value: '3 addresses', valueBn: '৩ টি ঠিকানা', valueType: 'nav' },
      { icon: CreditCard, label: 'Payment Methods', labelBn: 'পেমেন্ট পদ্ধতি', value: 'bKash, Nagad', valueType: 'nav' },
    ],
  },
  {
    title: 'Preferences',
    titleBn: 'পছন্দ',
    items: [
      { icon: Globe, label: 'Language', labelBn: 'ভাষা', value: 'English / বাংলা', valueType: 'toggle' },
      { icon: Bell, label: 'Notifications', labelBn: 'নোটিফকেশন', value: 'On', valueBn: 'চালু', valueType: 'toggle' },
    ],
  },
  {
    title: 'Support',
    titleBn: 'সহায়তা',
    items: [
      { icon: Shield, label: 'Privacy Policy', labelBn: 'গোপনীয়তা নীতি', valueType: 'nav' },
      { icon: Shield, label: 'Terms of Service', labelBn: 'সেবার শর্ত', valueType: 'nav' },
      { icon: Heart, label: 'Rate AmarSheba', labelBn: 'আমার সেবা রেটিং দিন', valueType: 'nav' },
    ],
  },
];

export const CustomerProfilePage = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useApp();
  const [notificationsOn, setNotificationsOn] = useState(true);
  const t = (en: string, bn: string) => language === 'bn' ? bn : en;
  const jobPostingHistory = [
    { id: 'JOB-2201', category: 'Painters & Decorators', budget: '৳18,000', timeline: '5 days', status: 'Completed' },
    { id: 'JOB-2207', category: 'Carpenters', budget: '৳9,500', timeline: '2 days', status: 'Quoted' },
  ];
  const savedProviders = [
    { name: 'Ruksana Akter', badge: 'Insurance Verified' },
    { name: 'Delwar Hossain', badge: 'Police Cleared' },
  ];

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', backgroundColor: '#F5F7FA' }}>
        {/* Header */}
        <div className="bg-gradient-to-b from-[#1E88E5] to-[#1565C0] px-4 pt-12 pb-8">
          {/* Profile photo */}
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-gray-900 text-2xl shadow-lg">
                RA
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow">
                <Camera size={14} className="text-gray-600" />
              </button>
            </div>
            <h2 className="text-white font-bold text-xl">Rahim Ahmed</h2>
            <p className="text-blue-200 text-sm">+880 17XX XXXXXX</p>

            {/* Stats row */}
            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <div className="text-white font-bold text-xl">6</div>
                <div className="text-blue-200 text-xs">{t('Bookings', 'বুকিং')}</div>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="text-white font-bold text-xl flex items-center gap-1">4.8 <Star size={14} fill="white" stroke="none" /></div>
                <div className="text-blue-200 text-xs">{t('Avg Rating', 'গড় রেটিং')}</div>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="text-white font-bold text-xl">3</div>
                <div className="text-blue-200 text-xs">{t('Reviews', 'রিভিউ')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit profile button */}
        <div className="mx-4 -mt-5 relative z-10">
          <button className="w-full bg-white rounded-2xl py-3 flex items-center justify-center gap-2 shadow-lg border border-gray-100">
            <Edit3 size={16} style={{ color: '#1E88E5' }} />
            <span className="font-semibold text-sm" style={{ color: '#1E88E5' }}>{t('Edit Profile', 'প্রোফাইল সম্পাদনা')}</span>
          </button>
        </div>

        {/* Saved addresses highlight */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin size={15} style={{ color: '#1E88E5' }} />
              <span className="font-semibold text-sm text-gray-800">{t('Saved Addresses', 'সংরক্ষিত ঠিকানা')}</span>
            </div>
            <button className="text-xs font-medium" style={{ color: '#1E88E5' }}>+ {t('Add', 'যোগ করুন')}</button>
          </div>
          <div className="space-y-2">
            {[
              { label: t('Home', 'বাড়ি'), addr: 'House 12, Road 4, Gulshan-1, Dhaka', icon: House },
              { label: t('Work', 'অফিস'), addr: 'Level 5, DIT Avenue, Motijheel', icon: Building2 },
            ].map(a => (
              <div key={a.label} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
                <a.icon size={16} className="text-gray-600" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-700">{a.label}</p>
                  <p className="text-[10px] text-gray-400">{a.addr}</p>
                </div>
                <Edit3 size={13} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-800">Basic Registration</h3>
            <span className="text-[10px] px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold">Verified Customer</span>
          </div>
          <p className="text-xs text-gray-500">Email/Phone login enabled • OTP verified • Active account since 2025.</p>
        </div>

        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Job Posting History</h3>
          <div className="space-y-2">
            {jobPostingHistory.map(job => (
              <div key={job.id} className="rounded-xl bg-gray-50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-800">{job.id} • {job.category}</p>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">{job.status}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Budget: {job.budget} • Timeline: {job.timeline}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Saved Service Providers</h3>
          <div className="space-y-2">
            {savedProviders.map(provider => (
              <div key={provider.name} className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                <p className="text-xs font-semibold text-gray-800">{provider.name}</p>
                <span className="text-[10px] px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">{provider.badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Menu sections */}
        {menuSections.map((section) => (
          <div key={section.title} className="mx-4 mt-3 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 pt-3 pb-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {language === 'bn' ? section.titleBn : section.title}
              </p>
            </div>
            {section.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left border-t border-gray-50 first:border-0 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    if (item.label === 'Language') setLanguage(language === 'en' ? 'bn' : 'en');
                  }}
                >
                  <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={15} style={{ color: '#1E88E5' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{language === 'bn' ? item.labelBn : item.label}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.valueType === 'text' && (
                      <span className="text-xs text-gray-400">{item.value}</span>
                    )}
                    {item.valueType === 'toggle' && item.label === 'Language' && (
                      <div className="flex bg-gray-100 rounded-full p-0.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full transition-all ${language === 'en' ? 'bg-white text-gray-800 shadow' : 'text-gray-400'}`}>EN</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full transition-all ${language === 'bn' ? 'bg-white text-gray-800 shadow' : 'text-gray-400'}`}>বাং</span>
                      </div>
                    )}
                    {item.valueType === 'toggle' && item.label === 'Notifications' && (
                      <div
                        className="w-10 h-6 rounded-full transition-all relative"
                        style={{ backgroundColor: notificationsOn ? '#1E88E5' : '#D1D5DB' }}
                        onClick={(e) => { e.stopPropagation(); setNotificationsOn(!notificationsOn); }}
                      >
                        <div className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all" style={{ left: notificationsOn ? 22 : 4 }} />
                      </div>
                    )}
                    {item.valueType === 'nav' && <ChevronRight size={15} className="text-gray-300" />}
                  </div>
                </button>
              );
            })}
          </div>
        ))}

        {/* Logout */}
        <div className="mx-4 mt-3 mb-6">
          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-red-50 border border-red-100 text-red-500 font-semibold">
            <LogOut size={16} />
            {t('Sign Out', 'সাইন আউট')}
          </button>
        </div>
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};