import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { useState } from 'react';
import { ADMIN_STATS } from '../data/mockData';

const PLATFORM_TOGGLES = [
  { label: 'Emergency Booking Priority',   defaultOn: true  },
  { label: 'Auto-verify returning providers', defaultOn: false },
  { label: 'SMS notifications',            defaultOn: true  },
  { label: 'Review moderation',            defaultOn: true  },
];

export const AdminSettingsContent = () => {
  const [commLocal,  setCommLocal]  = useState(10);
  const [commExpert, setCommExpert] = useState(15);
  const [toggles,   setToggles]    = useState(PLATFORM_TOGGLES.map(t => t.defaultOn));

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Commission */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="ag-card">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm">
            <DollarSign size={17} className="text-[#1E88E5]" /> Commission Settings
          </h3>
          <div className="space-y-5">
            {[
              { label: 'Local Provider', val: commLocal, setVal: setCommLocal, max: 25, color: '#4CAF50', accent: 'accent-[#4CAF50]' },
              { label: 'Expert Provider', val: commExpert, setVal: setCommExpert, max: 30, color: '#9C27B0', accent: 'accent-[#9C27B0]' },
            ].map(({ label, val, setVal, max, color, accent }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">{label}</label>
                  <span className="font-extrabold text-lg" style={{ color }}>{val}%</span>
                </div>
                <input
                  type="range" min={5} max={max} step={1}
                  value={val}
                  onChange={e => setVal(parseInt(e.target.value))}
                  className={`w-full h-2 rounded-full ${accent}`}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5%</span><span>{max}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-xl">
            <p className="text-xs text-blue-700">💡 Commission changes apply to new bookings only.</p>
          </div>
          <button className="w-full mt-4 py-3 rounded-xl text-white font-bold text-sm bg-[#1E88E5] hover:bg-blue-700 transition-colors">
            Save Commission Settings
          </button>
        </motion.div>

        <div className="space-y-4">
          {/* Platform toggles */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="ag-card">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Platform Settings</h3>
            <div className="space-y-0.5">
              {PLATFORM_TOGGLES.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-700">{s.label}</span>
                  <button
                    onClick={() => setToggles(prev => prev.map((v, j) => j === i ? !v : v))}
                    className="relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none"
                    style={{ backgroundColor: toggles[i] ? '#1E88E5' : '#D1D5DB' }}
                    aria-checked={toggles[i]}
                    role="switch"
                  >
                    <span
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200"
                      style={{ left: toggles[i] ? 22 : 4 }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="ag-card">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Commission Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Local commission (avg)</span>
                <span className="font-semibold">৳{(ADMIN_STATS.commissionEarned * 0.6 / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Expert commission (avg)</span>
                <span className="font-semibold">৳{(ADMIN_STATS.commissionEarned * 0.4 / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
                <span className="text-gray-700 font-semibold">Total commission</span>
                <span className="font-extrabold text-emerald-600">৳{(ADMIN_STATS.commissionEarned / 1000).toFixed(1)}K</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
