import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { ADMIN_STATS } from '../data/mockData';

const BOOKINGS = [
  { id: 'BK001', customer: 'Rahim Ahmed',  provider: 'Fatema Begum',   service: 'Maid · Cleaning',   amount: 450,  status: 'upcoming'  },
  { id: 'BK002', customer: 'Karim Uddin',  provider: 'Mohammad Karim', service: 'Driver · Airport',  amount: 800,  status: 'ongoing'   },
  { id: 'BK003', customer: 'Sadia Islam',  provider: 'Roksana Rahman', service: 'Chef · Event',      amount: 4800, status: 'completed' },
  { id: 'BK004', customer: 'Farhan Khan',  provider: 'Nasrin Sultana', service: 'Nursing · ICU',     amount: 5600, status: 'upcoming'  },
  { id: 'BK005', customer: 'Nusrat Jahan', provider: 'Dr. Mahbub',     service: 'Physiotherapy',    amount: 1000, status: 'ongoing'   },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  ongoing:   { bg: '#E8F5E9', color: '#2E7D32' },
  upcoming:  { bg: '#E3F2FD', color: '#1565C0' },
  completed: { bg: '#F3F4F6', color: '#757575' },
};

export const AdminBookingsContent = () => (
  <div className="p-4 sm:p-6">
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="ag-card overflow-hidden p-0">
      <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-sm">Live Bookings Monitor</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs text-emerald-600 font-semibold">{ADMIN_STATS.activeBookings} Active</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Booking ID', 'Customer', 'Provider', 'Service', 'Amount', 'Status', ''].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((b, i) => (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
              >
                <td className="px-5 py-4 font-mono text-xs text-gray-500">{b.id}</td>
                <td className="px-5 py-4 text-sm font-medium text-gray-800">{b.customer}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{b.provider}</td>
                <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">{b.service}</td>
                <td className="px-5 py-4 text-sm font-bold text-gray-800">৳{b.amount.toLocaleString()}</td>
                <td className="px-5 py-4">
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize"
                    style={{ backgroundColor: STATUS_STYLE[b.status].bg, color: STATUS_STYLE[b.status].color }}>
                    {b.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                    <Eye size={13} className="text-[#1E88E5]" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  </div>
);
