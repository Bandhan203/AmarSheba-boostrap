import { motion } from 'framer-motion';
import {
  CartesianGrid, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { CATEGORY_CHART_DATA, WEEKLY_CHART_DATA } from '../data/mockData';

const TOP_AREAS = [
  { area: 'Gulshan',    bookings: 2345, revenue: 987000 },
  { area: 'Banani',     bookings: 1890, revenue: 756000 },
  { area: 'Dhanmondi',  bookings: 1567, revenue: 623000 },
  { area: 'Uttara',     bookings: 1234, revenue: 498000 },
  { area: 'Mirpur',     bookings: 987,  revenue: 378000 },
];

export const AdminAnalyticsContent = () => (
  <div className="p-4 sm:p-6 space-y-5">
    {/* Line chart */}
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="ag-card p-5">
      <h3 className="font-bold text-gray-900 text-sm mb-4">Revenue Trend (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={WEEKLY_CHART_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `৳${v / 1000}K`} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: 12 }}
            formatter={(v: any) => [`৳${v.toLocaleString()}`, 'Revenue']}
          />
          <Line type="monotone" dataKey="revenue"  stroke="#1E88E5" strokeWidth={3} dot={{ fill: '#1E88E5', r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="bookings" stroke="#4CAF50" strokeWidth={2} dot={{ fill: '#4CAF50', r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Category distribution */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="ag-card p-5">
        <h3 className="font-bold text-gray-900 text-sm mb-4">Category Distribution</h3>
        <div className="space-y-3">
          {CATEGORY_CHART_DATA.map((c: any) => (
            <div key={c.name} className="flex items-center gap-3">
              <span className="text-xs text-gray-600 w-20 flex-shrink-0">{c.name}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${c.value}%`, backgroundColor: c.color }} />
              </div>
              <span className="text-xs font-bold text-gray-700 w-8 text-right">{c.value}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top areas */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="ag-card p-5">
        <h3 className="font-bold text-gray-900 text-sm mb-4">Top Performing Areas</h3>
        <div className="space-y-3">
          {TOP_AREAS.map((area, i) => (
            <div key={area.area} className="flex items-center gap-3">
              <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-[10px] font-bold text-[#1E88E5] flex-shrink-0">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{area.area}</p>
                <p className="text-[10px] text-gray-400">{area.bookings.toLocaleString()} bookings</p>
              </div>
              <span className="text-sm font-bold text-emerald-600">৳{(area.revenue / 1000).toFixed(0)}K</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);
