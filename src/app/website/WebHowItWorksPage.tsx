import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileCheck2,
  GraduationCap,
  Phone,
  PhoneCall,
  Search,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const STEPS = [
  {
    step: '01',
    icon: Search,
    title: 'Search & Filter Providers',
    titleBn: 'সেবাদাতা খুঁজুন ও ফিল্টার করুন',
    desc: 'Browse verified providers by category, location, rating, and provider type before making your selection.',
  },
  {
    step: '02',
    icon: Clock3,
    title: 'Choose Service Date & Time',
    titleBn: 'তারিখ, সময় ও সেবা নির্বাচন করুন',
    desc: 'Pick your preferred slot, add address details, and include any special instruction for the assigned provider.',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Pay Securely',
    titleBn: 'নিরাপদে পেমেন্ট করুন',
    desc: 'Pay using your preferred method and receive instant booking confirmation with transparent pricing.',
  },
  {
    step: '04',
    icon: CheckCircle2,
    title: 'Get Service & Rate',
    titleBn: 'সেবা নিন এবং রেটিং দিন',
    desc: 'Your provider completes the job and you can rate, review, and rebook from your booking history.',
  },
];

const VERIFICATION_STEPS = [
  { icon: FileCheck2, title: 'Application Review', desc: 'Basic profile and category details are reviewed first.' },
  { icon: BadgeCheck, title: 'NID Verification', desc: 'Identity is cross-checked with submitted national ID.' },
  { icon: PhoneCall, title: 'Reference Validation', desc: 'References and work history are validated by our team.' },
  { icon: GraduationCap, title: 'Certification Check', desc: 'Expert providers go through additional credential validation.' },
];

const FAQS = [
  {
    q: 'How quickly can a provider arrive?',
    a: 'Regular bookings follow your selected time slot. Emergency categories prioritize faster response windows based on availability.',
  },
  {
    q: 'What if the provider does not show up?',
    a: 'You can report instantly from your booking details. We arrange replacement support and review compensation according to policy.',
  },
  {
    q: 'Can I reschedule after booking?',
    a: 'Yes. You can reschedule from booking tracking before the visible cutoff window.',
  },
  {
    q: 'How does quality guarantee work?',
    a: 'If service quality is below expectation, report within 24 hours and our team will review for rework or refund support.',
  },
];

export const WebHowItWorksPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  return (
    <div className="bg-[#F8F9FF] text-[#0B1C30]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1C30] via-[#123A72] to-[#004AC6] px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90">
            Booking Journey
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            {language === 'en' ? 'How AmarSheba Works' : 'আমার সেবা কীভাবে কাজ করে'}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-blue-100 md:text-lg">
            মাত্র ৪টি সহজ ধাপে সার্ভিস বুকিং সম্পন্ন করুন — search থেকে service completion পর্যন্ত পুরো process simple, secure, and transparent.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0B1C30] md:text-4xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Simple 4-Step Flow
            </h2>
            <p className="mt-3 text-sm text-[#5C6070] md:text-base">Clear, predictable flow from finding a provider to completing your booking.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.step} className="rounded-3xl border border-slate-200 bg-[#F8FAFF] p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <Icon size={22} className="text-[#004AC6]" />
                    </div>
                    <span className="rounded-full bg-[#E7EEFF] px-3 py-1 text-xs font-bold text-[#004AC6]">Step {step.step}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#0B1C30]">{step.title}</h3>
                  <p className="mt-1 text-xs text-[#4B64A1]">{step.titleBn}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5C6070]">{step.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">
            <h3 className="text-2xl font-bold text-[#0B1C30]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Provider Verification
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5C6070]">
              Every provider goes through a trust-first verification pipeline before receiving bookings.
            </p>
            <div className="mt-6 space-y-4">
              {VERIFICATION_STEPS.map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                    <item.icon size={18} className="text-[#004AC6]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0B1C30]">{item.title}</h4>
                    <p className="mt-1 text-sm text-[#5C6070]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">
            <h3 className="text-2xl font-bold text-[#0B1C30]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Trust & Safety
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5C6070]">
              Safety, quality, and support stay active at every booking stage.
            </p>
            <div className="mt-6 grid gap-4">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Secure Payment Flow',
                  desc: 'Protected checkout with transparent booking totals before confirmation.',
                },
                {
                  icon: Star,
                  title: 'Quality Review System',
                  desc: 'Ratings and reviews continuously improve provider accountability.',
                },
                {
                  icon: Phone,
                  title: 'Support Escalation',
                  desc: 'Fast support channel for disputes, refunds, and urgent booking issues.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-[#004AC6]" />
                    <h4 className="text-sm font-semibold text-[#0B1C30]">{item.title}</h4>
                  </div>
                  <p className="mt-2 text-sm text-[#5C6070]">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-[#0B1C30] md:text-4xl" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
            Common Questions
          </h2>
          <div className="mt-10 space-y-4">
            {FAQS.map((faq) => (
              <article key={faq.q} className="rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5 md:p-6">
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
            Ready to Book?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-blue-100 md:text-base">
            Search providers, compare profiles, and complete your booking in a few taps.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/find')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#004AC6] transition-opacity hover:opacity-90"
            >
              Find Providers
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="rounded-xl border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
