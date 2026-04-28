import { ArrowRight, CheckCircle2, Crown, Star, Zap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const SERVICE_PRICING = [
  {
    category: 'Maid / Cleaning',
    categoryBn: 'গৃহকর্মী / পরিষ্কার',
    local: { price: '৳120–200', unit: '/hour' },
    expert: { price: '৳250–400', unit: '/hour' },
  },
  {
    category: 'Driver',
    categoryBn: 'চালক',
    local: { price: '৳500–800', unit: '/day' },
    expert: { price: '৳1,000–2,000', unit: '/day' },
  },
  {
    category: 'Chef',
    categoryBn: 'রাঁধুনি',
    local: { price: '৳400–700', unit: '/meal' },
    expert: { price: '৳1,500–5,000', unit: '/event' },
  },
  {
    category: 'Plumber',
    categoryBn: 'প্লাম্বার',
    local: { price: '৳300–600', unit: '/visit' },
    expert: { price: '৳800–2,500', unit: '/job' },
  },
  {
    category: 'Electrician',
    categoryBn: 'ইলেকট্রিশিয়ান',
    local: { price: '৳350–600', unit: '/visit' },
    expert: { price: '৳900–3,000', unit: '/job' },
  },
  {
    category: 'Nursing',
    categoryBn: 'নার্সিং',
    local: { price: '৳600–900', unit: '/day' },
    expert: { price: '৳1,500–4,000', unit: '/day' },
  },
  {
    category: 'Physiotherapy',
    categoryBn: 'ফিজিওথেরাপি',
    local: { price: '৳500–800', unit: '/session' },
    expert: { price: '৳1,200–2,500', unit: '/session' },
  },
  {
    category: 'Ambulance',
    categoryBn: 'অ্যাম্বুলেন্স',
    local: { price: '৳1,500–2,500', unit: '/trip' },
    expert: { price: '৳3,000–8,000', unit: '/trip' },
  },
];

const PLANS = [
  {
    name: 'Pay Per Use',
    nameBn: 'ব্যবহার অনুযায়ী',
    monthlyPrice: 0,
    icon: Zap,
    accent: 'text-[#004AC6]',
    bg: 'bg-[#EEF4FF]',
    border: 'border-[#DCE8FF]',
    features: [
      'Book any category anytime',
      'No monthly commitment',
      'Pay only per completed service',
      'Standard support & notifications',
    ],
    cta: 'Start Booking',
    popular: false,
  },
  {
    name: 'AmarSheba Plus',
    nameBn: 'আমার সেবা প্লাস',
    monthlyPrice: 299,
    icon: Star,
    accent: 'text-[#E67E22]',
    bg: 'bg-[#FFF4E9]',
    border: 'border-[#FFE1C4]',
    features: [
      'Everything in Pay Per Use',
      '10% discount on bookings',
      'Priority provider matching',
      'Dedicated support queue',
    ],
    cta: 'Get Plus',
    popular: true,
  },
  {
    name: 'AmarSheba Pro',
    nameBn: 'আমার সেবা প্রো',
    monthlyPrice: 799,
    icon: Crown,
    accent: 'text-[#7B1FA2]',
    bg: 'bg-[#F7EEFF]',
    border: 'border-[#E9D6FF]',
    features: [
      'Everything in Plus',
      '20% discount on bookings',
      'Emergency priority handling',
      'Expert-only provider access',
    ],
    cta: 'Get Pro',
    popular: false,
  },
];

const PROMO_CODES = [
  { code: 'AMARSHEBA20', discount: '20% off', desc: 'First booking for new users', valid: 'Apr 30, 2026' },
  { code: 'PLUS15', discount: '15% off', desc: 'Monthly Plus subscriber code', valid: 'Renews monthly' },
  { code: 'EXPERT10', discount: '10% off', desc: 'Expert provider bookings', valid: 'May 31, 2026' },
];

const formatPrice = (price: number) => `৳${price}`;

export const WebPricingPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activeCopied, setActiveCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setActiveCopied(code);
    setTimeout(() => setActiveCopied(null), 1800);
  };

  const resolvePrice = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return formatPrice(0);
    if (billingCycle === 'monthly') return formatPrice(monthlyPrice);
    return formatPrice(Math.round(monthlyPrice * 0.8));
  };

  return (
    <div className="bg-[#F8F9FF] text-[#0B1C30]">
      <section className="bg-gradient-to-br from-[#0B1C30] via-[#123A72] to-[#004AC6] px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90">
            Transparent Pricing
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            {language === 'en' ? 'Simple, Honest Pricing' : 'সহজ ও স্বচ্ছ মূল্য'}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-blue-100 md:text-lg">
            কোনো লুকানো চার্জ নেই। বুকিং করার আগেই final price breakdown দেখুন এবং আপনার জন্য সেরা plan বেছে নিন।
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1C30] md:text-4xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Choose Your Plan
            </h2>
            <p className="mt-3 text-sm text-[#5C6070] md:text-base">Start free, upgrade anytime, cancel anytime.</p>
            <div className="mt-6 inline-flex rounded-full bg-slate-100 p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
              >
                Yearly (20% off)
              </button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              return (
                <article
                  key={plan.name}
                  className={`relative rounded-3xl border p-7 shadow-sm transition-transform hover:-translate-y-1 ${plan.border} ${plan.bg} ${plan.popular ? 'ring-2 ring-[#004AC6]/20' : ''}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#004AC6] px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <Icon size={22} className={plan.accent} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0B1C30]">{plan.name}</h3>
                      <p className="text-xs text-slate-500">{plan.nameBn}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-4xl font-black text-[#0B1C30]">{resolvePrice(plan.monthlyPrice)}</p>
                    <p className="mt-1 text-sm text-slate-500">{plan.monthlyPrice === 0 ? 'No monthly fee' : billingCycle === 'monthly' ? '/month' : '/month billed yearly'}</p>
                  </div>

                  <div className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#004AC6]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate('/auth?tab=register')}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#004AC6] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    {plan.cta}
                    <ArrowRight size={15} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1C30] md:text-4xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Pricing by Service
            </h2>
            <p className="mt-3 text-sm text-[#5C6070] md:text-base">Indicative range by provider type. Final amount is shown before confirming booking.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SERVICE_PRICING.map((service) => (
              <article key={service.category} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-bold text-[#0B1C30]">{service.category}</h3>
                <p className="mt-1 text-xs text-slate-500">{service.categoryBn}</p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl bg-[#F5F8FF] p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Local</p>
                    <p className="mt-1 text-lg font-bold text-[#0B1C30]">{service.local.price}</p>
                    <p className="text-xs text-slate-500">{service.local.unit}</p>
                  </div>
                  <div className="rounded-xl bg-[#FBF6FF] p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-700">Expert</p>
                    <p className="mt-1 text-lg font-bold text-[#0B1C30]">{service.expert.price}</p>
                    <p className="text-xs text-slate-500">{service.expert.unit}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/find')}
                  className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#004AC6] transition-colors hover:bg-[#F5F8FF]"
                >
                  Book This Service
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#0B1C30] md:text-4xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            Active Promo Codes
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PROMO_CODES.map((promo) => (
              <article key={promo.code} className="rounded-2xl border border-dashed border-[#CFE0FF] bg-[#F8FAFF] p-5">
                <p className="text-2xl font-black tracking-wide text-[#004AC6]">{promo.code}</p>
                <p className="mt-2 text-sm font-semibold text-emerald-700">{promo.discount}</p>
                <p className="mt-1 text-sm text-slate-600">{promo.desc}</p>
                <p className="mt-2 text-xs text-slate-500">Valid: {promo.valid}</p>
                <button
                  onClick={() => handleCopy(promo.code)}
                  className="mt-4 w-full rounded-xl bg-[#004AC6] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  {activeCopied === promo.code ? 'Copied!' : 'Copy Code'}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
