import { ArrowRight, Briefcase, CheckCircle2, House, Settings, Shield, Smartphone, Star, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    icon: Smartphone,
    title: 'Customer App',
    subtitle: 'Book trusted home services',
    description: 'Browse 1,200+ providers across 8 categories. Book maids, drivers, chefs, nurses & more in under 5 taps.',
    color: '#1E88E5',
    bg: 'from-[#E3F2FD] to-[#BBDEFB]',
    path: '/splash',
    features: ['Local & Expert providers', 'bKash / Nagad payment', 'Real-time tracking', 'Bengali / English'],
  },
  {
    icon: Briefcase,
    title: 'Provider (Manager) App',
    subtitle: 'Manage team jobs, services & earnings',
    description: 'Accept bookings, assign field technicians, track earnings, and manage schedules. Get verified as an Expert to earn more.',
    color: '#4CAF50',
    bg: 'from-[#E8F5E9] to-[#C8E6C9]',
    path: '/provider-app',
    features: ['Booking requests', 'Technician assignment', 'Earnings dashboard', 'Expert verification'],
  },
  {
    icon: Settings,
    title: 'Admin Panel',
    subtitle: 'Manage the platform',
    description: 'Full control over users, bookings, verification, and commission settings. Monitor platform health.',
    color: '#9C27B0',
    bg: 'from-[#F3E5F5] to-[#E1BEE7]',
    path: '/admin',
    features: ['User management', 'Expert verification', 'Revenue analytics', 'Commission control'],
  },
];

const stats = [
  { label: 'Service Providers', value: '1,200+', icon: Users },
  { label: 'Happy Customers', value: '28,000+', icon: Star },
  { label: 'Categories', value: '8', icon: Shield },
  { label: 'Bookings Done', value: '89,000+', icon: CheckCircle2 },
];

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0d47a1 0%, #1E88E5 40%, #7b1fa2 100%)' }}>
      {/* Header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <House size={20} className="text-[#1E88E5]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">AmarSheba</h1>
            <p className="text-blue-200 text-xs">আমার সেবা • Dhaka, Bangladesh 🇧🇩</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full">EN</span>
          <span className="bg-white/10 text-white/70 text-xs px-3 py-1.5 rounded-full">বাং</span>
        </div>
      </div>

      {/* Hero */}
      <div className="px-6 py-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full mb-4">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Live Platform Demo
        </div>
        <h2 className="text-white text-3xl font-bold leading-tight mb-3">
          Dhaka's Most Trusted<br />
          <span className="text-yellow-300">Home Service</span> Marketplace
        </h2>
        <p className="text-blue-200 text-sm max-w-lg mx-auto leading-relaxed">
          Connect with verified Local workers and certified Expert professionals for all your home service needs. Maids, Drivers, Chefs, Nurses & more — all in one app.
        </p>
      </div>

      {/* Stats */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-4 gap-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
                <Icon size={18} className="text-yellow-300 mx-auto mb-1" />
                <div className="text-white font-bold text-sm">{s.value}</div>
                <div className="text-blue-200 text-[10px] leading-tight">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* App cards */}
      <div className="px-6 pb-12">
        <p className="text-white/70 text-xs text-center mb-4 font-medium uppercase tracking-wider">Choose a view to explore</p>
        <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
          {cards.map((card) => (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className="text-left"
            >
              <div className="bg-white rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 active:scale-[0.98]">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.bg} flex items-center justify-center text-2xl mb-3 shadow-sm`}>
                  <card.icon size={22} style={{ color: card.color }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-0.5">{card.title}</h3>
                <p className="text-xs font-medium mb-2" style={{ color: card.color }}>{card.subtitle}</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{card.description}</p>
                <div className="space-y-1.5 mb-4">
                  {card.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 size={12} style={{ color: card.color }} />
                      <span className="text-xs text-gray-600">{f}</span>
                    </div>
                  ))}
                </div>
                <div
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-semibold"
                  style={{ backgroundColor: card.color }}
                >
                  Explore {card.title}
                  <ArrowRight size={14} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 text-blue-300 text-xs">
        <p>🇧🇩 AmarSheba — Designed for Dhaka • Payment via bKash & Nagad</p>
        <p className="mt-1 text-blue-400">Local & Expert providers • Bilingual • Emergency booking</p>
      </div>
    </div>
  );
};