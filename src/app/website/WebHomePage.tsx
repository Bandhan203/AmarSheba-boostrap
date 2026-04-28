import {
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Gift,
    MapPin,
    Search,
    ShieldCheck,
    Star,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HERO_SLIDES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAgCPu5N1Dm7DF3WDjk2QU-VAjdj1LuKrBT1n8gSVEdrh7f7pDRBVL-TcpQWcUJ_eM81KpwG-lDfkpjBOkQbsjSBUiDzCBvfvVJPw7LPxXd-7bcutibnxi79ZhGIomZuyz1qVAuBZgKX5DK16CQfvyQ_V3ZIZyVSVN4cZmgrnnhQjATo-ywSl-_M2Kthiq-qt3D4DzkWYYoLtN_-WzZOeksVtpHWaV0ijghoRmNPgeWTuZM9BrMYV4jvOfQtm_EgMVslc-nJ9IlGI4',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
];
const WHY_IMAGE = 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1000&q=80';

const TRENDING_SERVICES = [
  {
    title: 'Full Home Sanitization',
    subtitle: 'Starts from $49',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    title: 'Electrical Repair',
    subtitle: 'From $25/hr',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=80',
    className: 'md:col-span-1',
  },
  {
    title: 'Emergency Plumbing',
    subtitle: 'On call 24/7',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=80',
    className: 'md:col-span-1',
  },
  {
    title: 'Personal Chef Services',
    subtitle: 'Customized meal plans for families',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80',
    className: 'md:col-span-2',
  },
];

const HOW_IT_WORKS = [
  {
    title: 'Choose a Service',
    desc: 'Select the service you need from our extensive list of categories.',
  },
  {
    title: 'Pick a Pro',
    desc: 'Browse profiles, read reviews, and choose your preferred professional.',
  },
  {
    title: 'Sit Back & Relax',
    desc: 'Your pro arrives on time and completes the job with perfection.',
  },
];

const FEATURED_PROS = [
  {
    name: 'Sarah Johnson',
    role: 'Deep Cleaning Specialist',
    rateLabel: 'Hourly Rate',
    price: '$35',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&q=80',
  },
  {
    name: 'David Miller',
    role: 'Master Electrician',
    rateLabel: 'Hourly Rate',
    price: '$55',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80',
  },
  {
    name: 'James Wilson',
    role: 'Premium Chauffeur',
    rateLabel: 'Hourly Rate',
    price: '$40',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&q=80',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Culinary Expert',
    rateLabel: 'Daily Rate',
    price: '$120',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=700&q=80',
  },
];

const EXPLORE_CATEGORY_CARDS = [
  {
    title: 'Maid',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFu4Zc_o0Y9AJXA6ooCbHPLGPkOwEiV-b_ZnBd0ZI0efp9N7IwNr25FbvJOFBAZvth49LIh9GDfyk33iPLfp71mJRVt7ATl11it0SsvdWThuD06ZLzB_5vWeFlxOA-Hh_J2rVc8mFQZrGMUWODyboaVXKlSn6AXO-hp2D10n_K-T9QvH3SA1vSUi6nMNe3Sc_C_2m0g1-OwiUIgD3J1OS_ShoRxhD0BV8F1yMImBbwUKR1cAs_U2HOVlz2pUrSxVKTGmqQ6_D1PLU',
    path: '/find?cat=maid',
  },
  {
    title: 'Driver',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARqNrEq9r3jcaV-VJQS_tZ6nPd3mQOFajUhwhtcEAWB8evCegHZr62iUBEk8bE-wDYHgOtDpWZl73X8VupsNUUjYXxrqI2c-zj7fgrgx65o0yZLVeAwcWaw_niRUeKl4ufkcWDuIjnH3BlEY33ZO-Z4bW0EzVOxEa2HitMYrpaJ_NPp9zJqticjpFfpI_E7YboQaNxTxdNHDtnpR8DroWX2rMtRIPTIW6mXKB0jHgqdJhvre_tDgP8l_2SxGonlGt7W79Lj0JVR4Q',
    path: '/find?cat=driver',
  },
  {
    title: 'Chef',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBco99R-oXR5IC9tLJrUwbYpl0L-wvcIo4xwMVHbRKfm1TFNrtZ0OoX4SHvjfUGtBjX9lKgSqSztpfYfWsTLB9jKJg-2fyCucGHgMuPMiLVFZ9SkwkjamgTiNGillPR1bgtBb9lecEoSB21zlzw6mAJ8oGFThhnchLiXBLQBFxu59wu5UtMFmRgoo3HdIzQw-BUZR22M29P7HcxyJQGFKOU6LwLwuwGBcNpbPnnXrzY94cbsfVTMmUnejFxGe0F2QkoFhu3i7tNcsU',
    path: '/find?cat=chef',
  },
  {
    title: 'Plumber',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvARv7s-Sw8yypVeU4OI5NOcfhJXDWuoeDsAQEgDvHXcPRRuAkK7nj1UkVccxpeNstTNAV-mPvjCEQLYUYuHu7Ie2ZH8m_754s-T49nsjv9yVQe7935hHf2vQcj58dmL7g1Zdte6azkr5QybfdNkNVKyc2rPCFetyALya3sYqKQRIi8h7mHVW6UwnSj64a_r2Mq3uiiilR1DGVofvfjh_9TGKsC4Lz7l1esiy-FGIC3L1o6D7ai4WhK5X7PBbfuDBl4BQl2EK-3nE',
    path: '/find?cat=plumber',
  },
  {
    title: 'Electrician',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3hkzvQjfNwyuKzoGlQet8T0UqE--9yCcUi7ABMxpMg5Vf14DeGTD5VcCiTKnw3UsVbW_qs1s5u4bqQjBzayEyNgH2Q18S1GGytqh9QNysRL6iR_zqRE3dZii79O5r3l14eexj6iUTjMlLUfRWCsjBcXnE4HcWkX_5rC-1nlUuNtEOFT0VqcdrFkAnlmHaNNWANBR0mg2IFXhVBK91XulAlEVzjXdVz-OJ-85BeSVo3cAxO0dAjcbGlTfayvJzUXSrM0E-2N9b8iY',
    path: '/find?cat=electrician',
  },
  {
    title: 'Renovation',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE4yJN1djM_rxc8zmrY2mdD_himNGVPanhHIGt-23ykXpqbzgI-Xy2eld_8cZl3fAjFATDGXQw45BmenH4Ocw9g75L555bsi0v9QKAf-I7LATRF3av_0Ha6pAvepF8l4pJ8gmfaC1fbN94t-supm8bDbrX_KIjOUWk_HyG4owcsUb8OK2FG6ksFBM5XMTwZklyieJ0iybMON3T8PVAgJcMZwL6L9SytHhM-cz0Bog_IL137x_XInwLBWJwEMC4_zGlywptfdnrlQM',
    path: '/services',
  },
];

const FAQS = [
  {
    q: 'How are professionals verified?',
    a: 'We conduct a multi-step background check, identity verification, and skill-specific practical checks before onboarding.',
  },
  {
    q: 'What if I am not satisfied with the service?',
    a: 'Report within 24 hours from your booking details. Our support team reviews and provides refund/rework support based on policy.',
  },
  {
    q: 'Can I reschedule my booking?',
    a: 'Yes, you can reschedule from booking details before the cutoff time shown in your booking confirmation.',
  },
  {
    q: 'Is there any insurance for damages?',
    a: 'For selected services and verified provider tiers, damage protection and dispute support policies are available.',
  },
];

export const WebHomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [area, setArea] = useState('');
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [heroIndex, setHeroIndex] = useState(0);

  const onSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (area.trim()) params.set('area', area.trim());
    navigate(`/find?${params.toString()}`);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const goToPrevHero = () => {
    setHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goToNextHero = () => {
    setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="bg-[#F8F9FF] text-[#0B1C30]">
      <section className="relative h-[650px] overflow-hidden lg:h-[750px]">
        <div className="absolute inset-0">
          {HERO_SLIDES.map((slide, index) => (
            <img
              key={slide}
              src={slide}
              alt="Professional home cleaning service"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                heroIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
          <span className="mb-6 inline-block rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
            Trusted by 10k+ Households
          </span>
          <h1
            className="mb-6 text-5xl leading-tight text-white drop-shadow-xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'Manrope, Inter, sans-serif' }}
          >
            Professional Services
            <br />
            <span className="text-blue-300">at Your Doorstep.</span>
          </h1>
          <p className="mb-12 max-w-2xl text-lg text-white/90 drop-shadow-md">
            Vetted experts for all your home needs. From deep cleaning to complex electrical work, we&apos;ve got you covered.
          </p>

          <div className="w-full max-w-4xl rounded-2xl border border-white/40 bg-white/20 p-3 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="group flex flex-1 items-center rounded-xl bg-white/80 px-4 transition-colors hover:bg-white">
                <Search size={18} className="mr-3 text-slate-600 transition-colors group-focus-within:text-[#004AC6]" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="What service do you need?"
                  className="w-full border-none bg-transparent py-4 font-medium text-slate-900 placeholder-slate-500 outline-none"
                />
              </div>
              <div className="group flex flex-1 items-center rounded-xl bg-white/80 px-4 transition-colors hover:bg-white">
                <MapPin size={18} className="mr-3 text-slate-600 transition-colors group-focus-within:text-[#004AC6]" />
                <input
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                  placeholder="Enter your area"
                  className="w-full border-none bg-transparent py-4 font-medium text-slate-900 placeholder-slate-500 outline-none"
                />
              </div>
              <button
                onClick={onSearch}
                className="rounded-xl bg-[#004AC6] px-10 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/40 bg-slate-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSzfEgSLCb7qzWn9Xv6bRQ9tRXO8AiuQ4dAtP9sc1yGt7tYR-h9dcvjug0CF22x7SI0MDwtaD6XPSGoV6LDjxuIMepIY5oJ4dovLgt6NI7NMh91XtxG5K2rx0PfYg00qM3rSqAtdU5RoFlpPTRKrv-TY5Rqf0Zv5M22r0PFulOVMrffvM7-xfCrDtdRBdli5xSCk710VXuXaHsnzMsFuJhnzBS_jyXkW1hFqmPnnTNty9QT69ESHNflowhtk8eTHT8hNeA_Z4SpM4"
                  alt="customer 1"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/40 bg-slate-300">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8a3QgSClIxw0F5wWupQCrsv0mD8OsksNpvDV6vDR4AbsXm37VJuAC0EgfIyFeA85jtfWYS0b00EX8d9sw7ICnsUXmFzZ38_NSFidlC8IctTn0FK2PfygXxOt6aefqQillgrWsczEPU5oGSCl53h-ebr9E-pcxAECtuyawzUBITeg_g3Qg5XBvE0CZ_UmCsx_RgAL11y50_P2_WGpYSDpOUhbnYcXajFgPHHmAosyYXfoxrngeskC77GjhloeJ-TZm2BRgE1dVu4k"
                  alt="customer 2"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/40 bg-slate-400">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbb7Zxg2_WVdI1mXhQZpQhQEhj0vOpRhrzmsenzm3UrNi9eiXyrbt5PrKllZKDjWUeUHXvXNKgzcwyjiBwOLcEWG_60627qRoIZC62AbbHhfMOlY6oZ9su1LTO7DT3ZvWxvk_5q_mQ63HG5sUsaHrfuxBgkRp4VC3KSpBTnltlLZDnfSPjE2Yhyjjj0a19etOfA9nd52gUpJWiAUpWr3Lmiw_84aBGv_cYbqsg3px6BasxsLROXmTi3GJcdgCm5CNk0bW6uYP_8_g"
                  alt="customer 3"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <p className="font-medium text-white/90 drop-shadow-md">4.9/5 Rating from our happy customers</p>
          </div>

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroIndex(index)}
                className={`h-1.5 rounded-full shadow-md transition-all ${heroIndex === index ? 'w-12 bg-white' : 'w-8 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>

          <button
            onClick={goToPrevHero}
            className="absolute left-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/40 md:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNextHero}
            className="absolute right-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/40 md:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
            <div>
              <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-[#0B1C30] md:text-4xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                Explore Categories
              </h2>
              <p className="text-lg text-[#434655]">Expert help for every task, right at your fingertips</p>
            </div>
            <button onClick={() => navigate('/services')} className="group flex items-center gap-2 font-bold text-[#004AC6] transition-opacity hover:opacity-80">
              View All Services
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {EXPLORE_CATEGORY_CARDS.map((category) => (
              <button
                key={category.title}
                onClick={() => navigate(category.path)}
                className="group relative h-48 cursor-pointer overflow-hidden rounded-2xl"
              >
                <img src={category.image} alt={category.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-blue-100" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                    {category.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFF] px-6 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <img src={WHY_IMAGE} alt="Service execution" className="aspect-square w-full rounded-3xl object-cover shadow-lg" />
            <div className="absolute -bottom-10 -right-10 hidden rounded-3xl bg-[#004AC6] p-10 text-white md:block">
              <p className="text-4xl font-extrabold">100%</p>
              <p className="text-sm text-white/80">Satisfaction Guaranteed</p>
            </div>
          </div>
          <div>
            <h2 className="mb-8 text-[32px] font-bold leading-[1.2] text-[#0B1C30]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>Why AmarSheba is your best home partner?</h2>
            <div className="space-y-7">
              {[
                {
                  title: 'Vetted Professionals',
                  desc: 'Every pro on our platform undergoes rigorous background checks and skill assessments.',
                  icon: ShieldCheck,
                },
                {
                  title: 'Transparent Pricing',
                  desc: 'No hidden fees or surprises. You know exactly what you will pay before you book.',
                  icon: CheckCircle2,
                },
                {
                  title: '24/7 Priority Support',
                  desc: 'Our dedicated team is here to help you at any step of your service journey.',
                  icon: Star,
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <item.icon size={18} className="text-[#004AC6]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0B1C30]">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-[#434655]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-[32px] font-bold text-[#0B1C30]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>Trending in your area</h2>
          <div className="grid auto-rows-[280px] grid-cols-1 gap-6 md:grid-cols-3">
            {TRENDING_SERVICES.map((service) => (
              <button
                key={service.title}
                onClick={() => navigate('/find')}
                className={`group relative overflow-hidden rounded-3xl text-left ${service.className}`}
              >
                <img src={service.image} alt={service.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold md:text-xl">{service.title}</h3>
                  <p className="text-xs text-white/85 md:text-sm">{service.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EFF4FF] px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-[32px] font-bold text-[#0B1C30]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>How it works</h2>
          <p className="mt-2 text-sm text-[#737686]">Simple 3-step process to get things done</p>
          <div className="relative mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="absolute left-1/4 right-1/4 top-10 hidden border-t-2 border-dashed border-[#004AC6]/30 md:block" />
            {HOW_IT_WORKS.map((item, index) => (
              <div key={item.title} className="relative z-10 flex flex-col items-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#004AC6] text-3xl font-bold text-white shadow-[0px_10px_30px_rgba(0,74,198,0.25)]">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-[#0B1C30]">{item.title}</h3>
                <p className="mt-1 max-w-xs text-sm text-[#434655]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-[32px] font-bold text-[#0B1C30]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>Top Rated Professionals</h2>
            <div className="flex gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8DEEA] bg-white text-[#434655]">
                <ChevronLeft size={16} />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8DEEA] bg-white text-[#434655]">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PROS.map((provider) => (
              <button
                key={provider.name}
                onClick={() => navigate('/find')}
                className="overflow-hidden rounded-3xl border border-[#E8EDF6] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48">
                  <img src={provider.image} alt={provider.name} className="h-full w-full object-cover" />
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 backdrop-blur">
                    <Star size={12} className="fill-yellow-400 text-yellow-500" />
                    <span className="text-xs font-bold text-[#0B1C30]">{provider.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#0B1C30]">{provider.name}</h3>
                  <p className="text-xs text-[#737686]">{provider.role}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-[#EEF2F8] pt-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#737686]">{provider.rateLabel}</p>
                      <p className="text-lg font-bold text-[#004AC6]">{provider.price}</p>
                    </div>
                    <span className="rounded-lg bg-[#EFF4FF] px-3 py-2 text-xs font-semibold text-[#0B1C30]">Book Now</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#004AC6] px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>First Booking Discount</h2>
            <p className="mt-2 max-w-xl text-sm text-white/85 md:text-base">
              Get 20% off your first service booking with code <span className="rounded bg-white/20 px-2 py-1 font-mono">FIRST20</span>
            </p>
            <button
              onClick={() => navigate('/find')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#004AC6]"
            >
              Claim Offer Now
              <ArrowRight size={14} />
            </button>
          </div>
          <Gift size={140} className="text-white/20" strokeWidth={1.5} />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-[32px] font-bold text-[#0B1C30]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.q} className="rounded-2xl border border-[#E8EDF6] bg-white px-6 py-5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <h3 className="pr-3 text-sm font-semibold text-[#0B1C30] md:text-base">{item.q}</h3>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#004AC6] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && <p className="mt-3 text-sm leading-relaxed text-[#434655]">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
