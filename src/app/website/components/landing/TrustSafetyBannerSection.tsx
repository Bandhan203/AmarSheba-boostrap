import { motion } from 'framer-motion';
import { Shield, UserCheck } from 'lucide-react';

export const TrustSafetyBannerSection = () => {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Trust & Safety</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Your Home, Protected Every Visit</h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Every booking follows identity verification, visit safety protocol, and support-backed coverage to keep your family secure.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm text-slate-700 sm:items-end">
              <span className="inline-flex items-center gap-2"><UserCheck size={15} className="text-cyan-700" /> Background-checked professionals</span>
              <span className="inline-flex items-center gap-2"><Shield size={15} className="text-cyan-700" /> Safety protocol + support assurance</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
