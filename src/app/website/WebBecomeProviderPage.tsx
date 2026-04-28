import {
    ArrowRight,
    Award,
    Briefcase,
    CheckCircle2,
    Clock3,
    DollarSign,
    ShieldCheck,
    Star,
    Users
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const BENEFITS = [
  {
    icon: DollarSign,
    title: 'Earn More with Flexible Rates',
    titleBn: 'নমনীয় রেটে বেশি আয়',
    desc: 'Set your service rates and grow monthly earnings based on your category, rating, and availability.',
  },
  {
    icon: Clock3,
    title: 'Work on Your Schedule',
    titleBn: 'নিজের সময়ে কাজ করুন',
    desc: 'Pick available slots, accept bookings when convenient, and manage workload from provider tools.',
  },
  {
    icon: Users,
    title: 'Access High-Intent Customers',
    titleBn: 'সক্রিয় গ্রাহকদের কাছে পৌঁছান',
    desc: 'Get discovered by customers searching for verified professionals in your working areas.',
  },
  {
    icon: Award,
    title: 'Build Reputation Fast',
    titleBn: 'দ্রুত সুনাম গড়ে তুলুন',
    desc: 'Collect ratings and reviews, unlock better visibility, and move toward top provider status.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust & Safety Support',
    titleBn: 'নিরাপত্তা ও সহায়তা',
    desc: 'Dispute workflows, identity checks, and support monitoring help maintain a safer marketplace.',
  },
  {
    icon: Star,
    title: 'Skill Growth Resources',
    titleBn: 'দক্ষতা উন্নয়ন রিসোর্স',
    desc: 'Improve service quality with in-platform guidance, standards, and customer service best practices.',
  },
];

const JOIN_STEPS = [
  {
    step: '01',
    title: 'Create Provider Account',
    titleBn: 'প্রোভাইডার একাউন্ট তৈরি করুন',
    desc: 'Sign up with your basic information, category preference, and working area.',
  },
  {
    step: '02',
    title: 'Upload Required Documents',
    titleBn: 'প্রয়োজনীয় ডকুমেন্ট আপলোড',
    desc: 'Submit NID and profile details. Expert tiers require additional credentials.',
  },
  {
    step: '03',
    title: 'Verification & Review',
    titleBn: 'যাচাই ও রিভিউ',
    desc: 'Our team validates identity, references, and professional information.',
  },
  {
    step: '04',
    title: 'Start Taking Bookings',
    titleBn: 'বুকিং নেওয়া শুরু করুন',
    desc: 'Activate profile, set availability, and begin receiving relevant booking requests.',
  },
];

const EARNINGS = [
  { category: 'Maid / Cleaning', range: '৳15,000–৳30,000' },
  { category: 'Driver', range: '৳20,000–৳45,000' },
  { category: 'Chef', range: '৳25,000–৳60,000' },
  { category: 'Plumber / Electrician', range: '৳18,000–৳50,000' },
  { category: 'Nursing / Physiotherapy', range: '৳30,000–৳80,000' },
  { category: 'Ambulance Services', range: '৳25,000–৳55,000' },
];

const FAQS = [
  {
    q: 'How long does provider verification take?',
    a: 'Most applications are reviewed in 2–3 business days after complete documents are submitted.',
  },
  {
    q: 'Do I need certificates to join?',
    a: 'Local providers can join with basic verification. Expert providers need relevant professional credentials.',
  },
  {
    q: 'How does payout work?',
    a: 'Payouts follow completed bookings and platform settlement policy with full transparency in earnings records.',
  },
  {
    q: 'Can I work in multiple areas?',
    a: 'Yes. You can set one or multiple service zones based on your transport and availability.',
  },
];

export const WebBecomeProviderPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const [selectedType, setSelectedType] = useState<'local' | 'expert'>('local');

  return (
    <div className="bg-[#F8F9FF] text-[#0B1C30]">
      <section className="bg-gradient-to-br from-[#0E4D1E] via-[#1F6D33] to-[#2F8A45] px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl text-center text-white">
          <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/95">
            Provider Growth
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            {language === 'en' ? 'Become a Provider' : 'সেবাদাতা হিসেবে যোগ দিন'}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-green-100 md:text-lg">
            আপনার দক্ষতাকে আয়ে রূপান্তর করুন। verified customer base, flexible work schedule, এবং scalable earning opportunities একসাথে পান।
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/auth?tab=provider')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1F6D33] transition-opacity hover:opacity-90"
            >
              Apply Now
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate('/how-it-works')}
              className="rounded-xl border border-white/35 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              See Booking Flow
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { value: '1,200+', label: 'Active Providers' },
              { value: '৳35,000', label: 'Avg. Monthly Earnings' },
              { value: '2–3 Days', label: 'Verification Time' },
              { value: '4.8/5', label: 'Provider Satisfaction' },
            ].map((item) => (
              <article key={item.label} className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5 text-center shadow-sm">
                <p className="text-2xl font-black text-[#0B1C30]">{item.value}</p>
                <p className="mt-1 text-sm text-slate-600">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1C30] md:text-4xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Why Join AmarSheba
            </h2>
            <p className="mt-3 text-sm text-[#5C6070] md:text-base">Built to help providers grow with trust, visibility, and better booking flow.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <article key={benefit.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                  <benefit.icon size={22} className="text-[#004AC6]" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0B1C30]">{benefit.title}</h3>
                <p className="mt-1 text-xs text-[#4B64A1]">{benefit.titleBn}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#5C6070]">{benefit.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1C30] md:text-4xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Select Provider Type
            </h2>
            <p className="mt-3 text-sm text-[#5C6070] md:text-base">Choose your onboarding track based on your credentials and category.</p>
          </div>

          <div className="mx-auto mb-6 inline-flex w-full justify-center rounded-full bg-slate-100 p-1 md:w-auto">
            <button
              onClick={() => setSelectedType('local')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${selectedType === 'local' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Local Provider
            </button>
            <button
              onClick={() => setSelectedType('expert')}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${selectedType === 'expert' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Expert Provider
            </button>
          </div>

          {selectedType === 'local' ? (
            <article className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-7 md:p-8">
              <h3 className="text-xl font-bold text-[#0B1C30]">Local Provider Track</h3>
              <p className="mt-2 text-sm text-[#5C6070]">For experienced service workers without formal professional certificates.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {['NID verification', 'Reference checks', 'Faster onboarding', 'Suitable for common home services'].map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl bg-white p-3 text-sm text-slate-700">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          ) : (
            <article className="rounded-3xl border border-purple-200 bg-purple-50/40 p-7 md:p-8">
              <h3 className="text-xl font-bold text-[#0B1C30]">Expert Provider Track</h3>
              <p className="mt-2 text-sm text-[#5C6070]">For certified professionals who need premium positioning and higher-value bookings.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {['NID + professional certificate', 'Credential validation', 'Premium placement priority', 'Higher earning potential'].map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl bg-white p-3 text-sm text-slate-700">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-purple-700" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1C30] md:text-4xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Join in 4 Steps
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {JOIN_STEPS.map((step) => (
              <article key={step.step} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="inline-flex rounded-full bg-[#E7EEFF] px-3 py-1 text-xs font-bold text-[#004AC6]">Step {step.step}</span>
                <h3 className="mt-4 text-lg font-bold text-[#0B1C30]">{step.title}</h3>
                <p className="mt-1 text-xs text-[#4B64A1]">{step.titleBn}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#5C6070]">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#0B1C30] md:text-4xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            Estimated Monthly Earnings
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {EARNINGS.map((item) => (
              <article key={item.category} className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                    <Briefcase size={18} className="text-[#004AC6]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#0B1C30]">{item.category}</h3>
                </div>
                <p className="mt-4 text-xl font-black text-[#0B1C30]">{item.range}</p>
                <p className="mt-1 text-xs text-slate-500">Estimated based on active providers</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#0B1C30] md:text-4xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            Provider FAQs
          </h2>
          <div className="mt-10 space-y-4">
            {FAQS.map((faq) => (
              <article key={faq.q} className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
                <h3 className="text-base font-semibold text-[#0B1C30]">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5C6070]">{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-[#004AC6] px-8 py-12 text-center text-white shadow-lg md:px-12">
          <h2 className="text-3xl font-extrabold" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            Ready to Start as a Provider?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-blue-100 md:text-base">
            Complete your registration, pass verification, and start receiving service requests.
          </p>
          <button
            onClick={() => navigate('/auth?tab=provider')}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#004AC6] transition-opacity hover:opacity-90"
          >
            Apply as Provider
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
};
