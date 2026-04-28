import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { ArrowRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    emoji: '🏠',
    title: 'Your Home, Our Care',
    titleBn: 'আপনার ঘর, আমাদের যত্ন',
    subtitle: 'Book trusted home services in Dhaka',
    subtitleBn: 'ঢাকায় বিশ্বস্ত গৃহসেবা বুক করুন',
    desc: 'From maids and drivers to chefs and nurses — all services just a tap away.',
    descBn: 'গৃহকর্মী থেকে চালক, রাঁধুনি থেকে নার্স — সব সেবা এক ট্যাপে।',
    bg: 'from-[#E3F2FD] to-[#BBDEFB]',
    accent: '#1E88E5',
    image: 'https://images.unsplash.com/photo-1758273238903-b5ca5f9988d1?w=600&q=80',
  },
  {
    emoji: '⭐',
    title: 'Local vs Expert',
    titleBn: 'লোকাল বনাম এক্সপার্ট',
    subtitle: 'Two tiers of trusted providers',
    subtitleBn: 'দুই ধরনের বিশ্বস্ত প্রদানকারী',
    desc: 'Choose affordable Local workers or certified Expert professionals with verified credentials.',
    descBn: 'সাশ্রয়ী লোকাল কর্মী বা সার্টিফাইড বিশেষজ্ঞ — আপনার পছন্দে বেছে নিন।',
    bg: 'from-[#F3E5F5] to-[#E1BEE7]',
    accent: '#9C27B0',
    image: 'https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=600&q=80',
  },
  {
    emoji: '⚡',
    title: 'Book in 5 Taps',
    titleBn: '৫ ট্যাপে বুক করুন',
    subtitle: 'Fast, safe & reliable booking',
    subtitleBn: 'দ্রুত, নিরাপদ ও নির্ভরযোগ্য বুকিং',
    desc: 'Pay via bKash, Nagad, or cash. Rate your provider after service completion.',
    descBn: 'বিকাশ, নগদ বা ক্যাশে পেমেন্ট করুন। সেবার পরে রেটিং দিন।',
    bg: 'from-[#E8F5E9] to-[#C8E6C9]',
    accent: '#4CAF50',
    image: 'https://images.unsplash.com/photo-1545463913-5083aa7359a6?w=600&q=80',
  },
];

export const SplashPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'splash' | 'onboarding'>('splash');
  const [slideIndex, setSlideIndex] = useState(0);
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  if (step === 'splash') {
    return (
      <MobileFrame>
        <div className="min-h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0d47a1] to-[#1E88E5] px-6">
          {/* Logo */}
          <div className="mb-8 animate-bounce">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-5xl">🏠</span>
            </div>
          </div>
          <h1 className="text-white text-4xl font-bold mb-2">AmarSheba</h1>
          <p className="text-blue-200 text-base mb-1">আমার সেবা</p>
          <p className="text-blue-300 text-sm text-center mb-12">Dhaka's #1 Home Service Marketplace</p>

          {/* Service icons */}
          <div className="flex gap-4 mb-12">
            {['🧹', '🚗', '👨‍🍳', '🔧', '🏥', '🚑'].map((emoji, i) => (
              <div key={i} className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
                {emoji}
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep('onboarding')}
            className="w-full max-w-xs bg-white text-[#1E88E5] py-4 rounded-2xl font-bold text-base shadow-xl flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight size={18} />
          </button>
          <p className="text-blue-300 text-xs mt-4">ইংরেজি এবং বাংলায় উপলব্ধ</p>
        </div>
      </MobileFrame>
    );
  }

  const slide = slides[slideIndex];
  const isLast = slideIndex === slides.length - 1;

  return (
    <MobileFrame>
      <div className="min-h-full flex flex-col bg-white">
        {/* Language toggle */}
        <div className="flex justify-between items-center px-4 pt-14 pb-2">
          <button onClick={() => setSlideIndex(Math.max(0, slideIndex - 1))} className="p-2">
            {slideIndex > 0 ? <ChevronLeft size={22} className="text-gray-400" /> : <div className="w-6" />}
          </button>
          <div className="flex bg-gray-100 rounded-full p-1">
            <button onClick={() => setLang('en')} className={`text-xs px-3 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-white shadow text-gray-800 font-semibold' : 'text-gray-400'}`}>EN</button>
            <button onClick={() => setLang('bn')} className={`text-xs px-3 py-1 rounded-full transition-all ${lang === 'bn' ? 'bg-white shadow text-gray-800 font-semibold' : 'text-gray-400'}`}>বাং</button>
          </div>
          <button onClick={() => navigate('/login')} className="text-xs text-gray-400 font-medium">Skip</button>
        </div>

        {/* Slide image */}
        <div className={`mx-4 rounded-3xl overflow-hidden h-52 bg-gradient-to-br ${slide.bg} relative`}>
          <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl drop-shadow-lg">{slide.emoji}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {lang === 'bn' ? slide.titleBn : slide.title}
          </h2>
          <p className="font-semibold mb-3" style={{ color: slide.accent }}>
            {lang === 'bn' ? slide.subtitleBn : slide.subtitle}
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            {lang === 'bn' ? slide.descBn : slide.desc}
          </p>

          {/* Local vs Expert visual on slide 2 */}
          {slideIndex === 1 && (
            <div className="flex gap-3 mt-5">
              <div className="flex-1 rounded-2xl p-3 bg-[#E8F5E9]">
                <div className="text-2xl mb-1">🟢</div>
                <div className="font-bold text-[#4CAF50] text-sm">Local</div>
                <div className="text-xs text-gray-500 mt-0.5">Affordable • Nearby • Trusted</div>
                <div className="mt-2 text-xs text-gray-400">From ৳120/hr</div>
              </div>
              <div className="flex-1 rounded-2xl p-3 bg-[#F3E5F5]">
                <div className="text-2xl mb-1">⭐</div>
                <div className="font-bold text-[#9C27B0] text-sm">Expert</div>
                <div className="text-xs text-gray-500 mt-0.5">Certified • Verified • Premium</div>
                <div className="mt-2 text-xs text-gray-400">From ৳250/hr</div>
              </div>
            </div>
          )}

          {/* Payment options on slide 3 */}
          {slideIndex === 2 && (
            <div className="flex gap-2 mt-5">
              {['💳 bKash', '💚 Nagad', '💵 Cash'].map(p => (
                <div key={p} className="flex-1 bg-gray-50 rounded-xl p-2 text-center text-xs font-medium text-gray-600">{p}</div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination & CTA */}
        <div className="px-6 pb-8">
          <div className="flex items-center gap-2 justify-center mb-6">
            {slides.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: i === slideIndex ? 24 : 8,
                  height: 8,
                  backgroundColor: i === slideIndex ? slide.accent : '#E5E7EB',
                }}
              />
            ))}
          </div>
          <button
            onClick={() => {
              if (isLast) navigate('/login');
              else setSlideIndex(slideIndex + 1);
            }}
            className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg"
            style={{ backgroundColor: slide.accent }}
          >
            {isLast ? (lang === 'bn' ? 'শুরু করুন' : 'Get Started') : (lang === 'bn' ? 'পরবর্তী' : 'Next')}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </MobileFrame>
  );
};