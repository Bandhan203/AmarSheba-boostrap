import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Star, XCircle } from 'lucide-react';
import { ADMIN_STATS, PROVIDERS } from '../data/mockData';

const cardV = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export const AdminVerificationContent = () => {
  const pendingExperts = PROVIDERS.filter((p: any) => p.type === 'expert').slice(0, 5);

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-orange-800 text-sm">
            {ADMIN_STATS.pendingVerifications} Expert Providers Awaiting Verification
          </p>
          <p className="text-orange-600 text-xs mt-0.5">Review submitted documents and approve or reject</p>
        </div>
      </motion.div>

      {/* Provider cards */}
      <div className="grid gap-4">
        {pendingExperts.map((provider: any, i: number) => (
          <motion.div
            key={provider.id}
            variants={cardV}
            initial="hidden"
            animate="show"
            transition={{ delay: i * 0.07 }}
            className="ag-card"
          >
            <div className="flex items-start gap-4">
              {provider.photo ? (
                <img src={provider.photo} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-[#9C27B0] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {provider.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-bold text-gray-900">{provider.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {provider.category} · {provider.area} · {provider.yearsExp} yrs exp
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} fill="#F9A825" stroke="none" />
                      <span className="text-xs font-medium text-gray-700">
                        {provider.rating} ({provider.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-orange-100 text-orange-600 rounded-full font-bold whitespace-nowrap">
                    Pending Review
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {provider.description?.slice(0, 100)}…
                </p>
                <div className="flex gap-2 mt-3">
                  <div className="flex-1 bg-gray-50 rounded-xl p-2.5 text-center">
                    <p className="text-[10px] text-gray-400">Submitted Docs</p>
                    <p className="text-xs font-semibold text-gray-700 mt-0.5">NID, Certificate, Photo</p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-2.5 text-center">
                    <p className="text-[10px] text-gray-400">Jobs Completed</p>
                    <p className="text-xs font-semibold text-gray-700 mt-0.5">{provider.jobsCompleted}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-gray-100">
              <button className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                View Documents
              </button>
              <button className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center gap-1">
                <XCircle size={13} /> Reject
              </button>
              <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1">
                <CheckCircle2 size={13} /> Approve Expert
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
