import { motion } from 'framer-motion';
import { Download, QrCode } from 'lucide-react';

const APP_MOCKUP = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=520&q=80';
const PLAY_STORE_BADGE = 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg';
const APP_STORE_BADGE = 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg';

export const MobileAppCtaSection = () => {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700"
        >
          <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:p-10">
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                <Download size={13} /> Mobile App
              </span>
              <h3 className="mt-4 text-3xl font-bold text-white">Download our App</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100">
                Book faster, track providers live, manage payments, and get app-only offers from AmarSheba.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <img src={PLAY_STORE_BADGE} alt="Google Play" className="h-12 w-auto rounded-md bg-white p-1" loading="lazy" decoding="async" />
                <img src={APP_STORE_BADGE} alt="App Store" className="h-12 w-auto rounded-md bg-white p-1" loading="lazy" decoding="async" />
              </div>

              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 text-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/10">
                  <QrCode size={22} />
                </div>
                <div>
                  <p className="text-xs text-blue-100">Scan QR</p>
                  <p className="text-sm font-semibold">Get app install link</p>
                </div>
              </div>
            </div>

            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <img src={APP_MOCKUP} alt="AmarSheba app mockup" className="h-[320px] w-[220px] rounded-2xl object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
