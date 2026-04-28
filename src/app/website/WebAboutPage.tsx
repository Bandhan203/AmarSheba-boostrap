import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Star, CheckCircle2, Target, Heart, Zap, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CITY_IMAGE = 'https://images.unsplash.com/photo-1630329274874-bb77886e360e?w=1200&q=80';
const FAMILY_IMAGE = 'https://images.unsplash.com/photo-1713942590393-a8ae9530a2bf?w=800&q=80';

const TEAM = [
  { name: 'Tariq Rahman', role: 'CEO & Co-Founder', emoji: '👨‍💼', bio: '10+ years in tech startups. Ex-Pathao, BJIT.', area: 'Gulshan' },
  { name: 'Sadia Islam', role: 'CTO & Co-Founder', emoji: '👩‍💻', bio: 'Full-stack engineer. Built systems for 500K+ users.', area: 'Banani' },
  { name: 'Imran Hossain', role: 'Head of Operations', emoji: '👨‍🔧', bio: 'Operations expert. Scaled 3 service businesses.', area: 'Dhanmondi' },
  { name: 'Nasrin Akter', role: 'Head of Provider Quality', emoji: '👩‍🏫', bio: 'HR & compliance specialist. Ensures service standards.', area: 'Uttara' },
  { name: 'Fahim Kabir', role: 'Head of Growth', emoji: '📈', bio: 'Growth hacker. 200% MoM user acquisition record.', area: 'Bashundhara' },
  { name: 'Ruma Chowdhury', role: 'Customer Experience Lead', emoji: '💬', bio: '24/7 support infrastructure expert.', area: 'Mirpur' },
];

const VALUES = [
  {
    icon: Heart,
    title: 'Community First',
    titleBn: 'সম্প্রদায় প্রথম',
    desc: 'We empower both service seekers and providers in Dhaka. Fair wages, fair prices, and dignified work for all.',
    color: '#E91E63',
  },
  {
    icon: Shield,
    title: 'Safety & Trust',
    titleBn: 'নিরাপত্তা ও বিশ্বাস',
    desc: 'Every interaction on AmarSheba is built on verification, transparency, and accountability.',
    color: '#1E88E5',
  },
  {
    icon: Zap,
    title: 'Quality & Speed',
    titleBn: 'গুণমান ও গতি',
    desc: 'Fast booking, on-time arrival, quality service delivery — that\'s the AmarSheba standard.',
    color: '#FF9800',
  },
  {
    icon: Target,
    title: 'Accessibility',
    titleBn: 'সুলভতা',
    desc: 'Bilingual platform (বাংলা & English), affordable pricing, and coverage across all major Dhaka areas.',
    color: '#4CAF50',
  },
];

const MILESTONES = [
  { year: '2023', event: 'AmarSheba founded in Dhaka by 3 friends tired of unreliable home services.' },
  { year: '2023 Q3', event: 'First 100 providers onboarded. Started with Maid and Driver categories.' },
  { year: '2024 Q1', event: 'Expanded to 8 categories including Nursing, Physiotherapy, and Ambulance.' },
  { year: '2024 Q2', event: 'Crossed 10,000 completed bookings. Raised seed funding.' },
  { year: '2024 Q4', event: 'Launched Expert verification system. 500+ certified professionals onboarded.' },
  { year: '2025', event: 'Passed 1,200+ providers and 28,000+ registered customers. Mobile app launched.' },
  { year: '2026', event: 'Expanding to Chattogram and Sylhet. Building the full-stack home services OS.' },
];

export const WebAboutPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  return (
    <div style={{ background: '#F5F7FA' }}>
      {/* Hero */}
      <div
        className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d47a1, #1E88E5)' }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{ backgroundImage: `url(${CITY_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white mb-4" style={{ fontSize: '3rem', fontWeight: 800 }}>
            {language === 'en' ? 'About AmarSheba' : 'আমার সেবা সম্পর্কে'}
          </h1>
          <p className="text-blue-200 text-xl mb-3" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
            ঢাকার সবচেয়ে বিশ্বস্ত হোম সার্ভিস মার্কেটপ্লেস
          </p>
          <p className="text-blue-200 text-base max-w-2xl mx-auto leading-relaxed">
            We're on a mission to make trusted, professional home services accessible to every household in Dhaka — and beyond.
          </p>
        </div>
      </div>

      {/* Mission & Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: '#E3F2FD', color: '#1E88E5' }}>
                Our Story
              </span>
              <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: '2.2rem' }}>
                Born from Dhaka's<br />
                <span style={{ color: '#1E88E5' }}>Real Problem</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                AmarSheba was founded in 2023 by three Dhaka residents who were frustrated by the same problem: finding reliable, trustworthy home service workers was a nightmare. There was no standard way to verify credentials, no transparent pricing, and no accountability.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We built AmarSheba to solve exactly that. A platform where every provider is verified, every transaction is secure, and every customer has a recourse if something goes wrong.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Today, we serve 28,000+ customers across 7 areas of Dhaka, with 1,200+ verified providers across 8 service categories — and we're just getting started.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '2023', label: 'Founded' },
                  { value: '3', label: 'Co-founders' },
                  { value: 'Dhaka', label: 'Home Base' },
                ].map(s => (
                  <div key={s.label} className="text-center p-4 rounded-2xl" style={{ background: '#E3F2FD' }}>
                    <div className="font-bold text-xl text-gray-900">{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden h-96 shadow-xl">
              <img src={FAMILY_IMAGE} alt="Happy family with AmarSheba" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '1,200+', label: 'Verified Providers', labelBn: 'যাচাইকৃত সেবাদাতা', color: '#1E88E5' },
              { value: '28,000+', label: 'Happy Customers', labelBn: 'সন্তুষ্ট গ্রাহক', color: '#FF9800' },
              { value: '89,000+', label: 'Bookings Done', labelBn: 'সম্পন্ন বুকিং', color: '#4CAF50' },
              { value: '⭐ 4.8', label: 'Average Rating', labelBn: 'গড় রেটিং', color: '#F9A825' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                <div className="text-4xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-sm font-medium text-gray-900 mb-0.5">{stat.label}</div>
                <div className="text-xs text-gray-400" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>{stat.labelBn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-gray-900 mb-3" style={{ fontSize: '2rem' }}>
              {language === 'en' ? 'Our Values' : 'আমাদের মূল্যবোধ'}
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              These principles guide every decision we make at AmarSheba.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(value => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${value.color}15` }}
                  >
                    <Icon size={26} style={{ color: value.color }} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{value.title}</h3>
                  <p className="text-xs mb-3" style={{ color: value.color, fontFamily: "'Noto Sans Bengali', sans-serif" }}>{value.titleBn}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16" style={{ background: '#F5F7FA' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-gray-900 mb-3" style={{ fontSize: '2rem' }}>Our Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-100" />
            <div className="space-y-6">
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-sm border-2 border-white"
                    style={{ background: 'linear-gradient(135deg, #1E88E5, #0d47a1)', color: 'white', fontSize: '10px', fontWeight: 700, textAlign: 'center', padding: '4px' }}
                  >
                    {m.year}
                  </div>
                  <div className="bg-white rounded-2xl p-4 flex-1 border border-gray-100 mt-2">
                    <p className="text-gray-700 text-sm">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-gray-900 mb-3" style={{ fontSize: '2rem' }}>Meet the Team</h2>
            <p className="text-gray-500 text-sm">The people building Bangladesh's home services future.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map(member => (
              <div key={member.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all text-center">
                <div className="text-5xl mb-3">{member.emoji}</div>
                <h3 className="font-bold text-gray-900 text-base">{member.name}</h3>
                <div className="text-xs font-semibold mb-2" style={{ color: '#1E88E5' }}>{member.role}</div>
                <p className="text-gray-500 text-sm">{member.bio}</p>
                <div className="mt-3 text-xs text-gray-400 flex items-center justify-center gap-1">
                  <span>📍</span> {member.area}, Dhaka
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #0d47a1, #1E88E5)' }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-white font-bold mb-3" style={{ fontSize: '2rem' }}>Join the AmarSheba Family</h2>
          <p className="text-blue-200 text-sm mb-8">
            Whether you're looking for services or want to offer them — AmarSheba is where trust meets talent.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate('/find')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white transition-all hover:shadow-xl hover:-translate-y-0.5"
              style={{ color: '#1E88E5' }}
            >
              Book a Service <ArrowRight size={14} className="inline ml-1" />
            </button>
            <button
              onClick={() => navigate('/auth?tab=provider')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              Become a Provider
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};