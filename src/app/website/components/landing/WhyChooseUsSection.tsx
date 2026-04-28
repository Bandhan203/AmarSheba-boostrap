import { motion } from 'framer-motion';
import { BadgeCheck, HandCoins, RefreshCcw, ShieldCheck } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const ITEMS = [
  {
    title: 'Verified Experts',
    description: 'NID verified professionals with strict background checks.',
    icon: BadgeCheck,
  },
  {
    title: 'Transparent Pricing',
    description: 'Clear rates with no hidden fees before you confirm.',
    icon: HandCoins,
  },
  {
    title: 'Service Warranty',
    description: '7-day re-service guarantee for eligible bookings.',
    icon: RefreshCcw,
  },
  {
    title: '24/7 Support',
    description: 'Always-on support for urgent service assistance.',
    icon: ShieldCheck,
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Choose Us"
          title="Built on Trust, Quality & Safety"
          description="Premium service experience from booking to completion."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700">
                <item.icon size={18} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
