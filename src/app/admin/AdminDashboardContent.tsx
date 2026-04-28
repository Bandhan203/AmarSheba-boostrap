import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Shield,
  ShoppingBag,
  TrendingUp,
  Users,
  MapPin,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ADMIN_STATS,
  CATEGORY_CHART_DATA,
  RECENT_USERS,
  WEEKLY_CHART_DATA,
} from '../data/mockData';
import {
  ADMIN_FRAUD_ALERTS,
  PROVIDER_PERFORMANCE,
  VERIFICATION_CHANNELS,
} from '../data/platformContracts';
import { useDashboard } from '../components/DashboardLayout';

/* ─── Animation variants ─────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] } },
};

/* ─── Stat Card ───────────────────────────────────────────── */
const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
  bg,
  change,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bg: string;
  change?: number;
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,74,198,0.12)' }}
    transition={{ duration: 0.22 }}
    className="ag-card flex flex-col gap-2"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
        <p className="font-extrabold text-gray-900 text-2xl leading-none">{value}</p>
        {change !== undefined && (
          <p className={`text-xs mt-1.5 font-semibold ${change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% vs last week
          </p>
        )}
      </div>
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: bg }}
      >
        <Icon size={22} style={{ color }} />
      </div>
    </div>
  </motion.div>
);

/* ─── Dashboard Content ───────────────────────────────────── */
export const AdminDashboardContent = () => {
  const { setActiveNav } = useDashboard();

  return (
    <div className="p-4 sm:p-6 space-y-5">

      {/* Stat grid — row 1 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <StatCard label="Total Users"     value={ADMIN_STATS.totalUsers.toLocaleString()}     icon={Users}      color="var(--color-orange-500)" bg="#FFF3E0" change={8.2}  />
        <StatCard label="Total Providers" value={ADMIN_STATS.totalProviders.toLocaleString()} icon={Shield}     color="#9C27B0" bg="#F3E5F5" change={12.5} />
        <StatCard label="Total Bookings"  value={ADMIN_STATS.totalBookings.toLocaleString()}  icon={ShoppingBag} color="#4CAF50" bg="#E8F5E9" change={15.3} />
        <StatCard
          label="Monthly Revenue"
          value={`৳${(ADMIN_STATS.monthlyRevenue / 1000).toFixed(0)}K`}
          icon={DollarSign}
          color="#FF9800"
          bg="#FFF3E0"
          change={9.1}
        />
      </motion.div>

      {/* Stat grid — row 2 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <StatCard label="Active Bookings"        value={ADMIN_STATS.activeBookings}        icon={TrendingUp}  color="#FF9800" bg="#FFF3E0" />
        <StatCard label="Pending Verifications"  value={ADMIN_STATS.pendingVerifications}  icon={AlertCircle} color="#FF9800" bg="#FFF3E0" />
        <StatCard label="Active Disputes"        value={ADMIN_STATS.disputes}              icon={AlertCircle} color="#F44336" bg="#FFEBEE" />
        <StatCard
          label="Commission Earned"
          value={`৳${(ADMIN_STATS.commissionEarned / 1000).toFixed(1)}K`}
          icon={DollarSign}
          color="#4CAF50"
          bg="#E8F5E9"
        />
      </motion.div>

      {/* Info cards row */}
      {/* Central Intelligence Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Graph */}
        <motion.div variants={itemVariants} className="lg:col-span-2 ag-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-navy-900 text-lg">Omniscient Overview</h3>
              <p className="text-xs text-slate-500">Real-time platform revenue & throughput</p>
            </div>
            <select className="bg-slate-100 border-none rounded-xl px-3 py-1.5 text-xs font-bold text-navy-900 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={v => `৳${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#FF9800', strokeWidth: 2 }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#FF9800" strokeWidth={4} dot={{ r: 4, fill: '#FF9800', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, shadow: '0 0 10px rgba(255,152,0,0.5)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Provider Health Map View */}
        <motion.div variants={itemVariants} className="ag-card flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-navy-900 text-sm">Provider Health Map</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Live</span>
            </div>
          </div>
          <div className="flex-1 rounded-2xl bg-slate-100 relative overflow-hidden border border-slate-200">
             {/* Map Placeholder Graphic */}
             <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                 <MapPin className="text-navy-900" size={32} />
               </div>
               <p className="text-xs font-bold text-navy-900">Map Interface Active</p>
               <p className="text-[10px] text-slate-500 mt-1">Showing 142 Active Providers in Dhaka North/South Zones</p>
             </div>
             <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur p-2 rounded-xl border border-white/50 flex justify-around">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-navy-900">84</p>
                  <p className="text-[8px] text-slate-500 uppercase">Online</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-navy-900">22</p>
                  <p className="text-[8px] text-slate-500 uppercase">On Job</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-navy-900">36</p>
                  <p className="text-[8px] text-slate-500 uppercase">Offline</p>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Charts row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {/* Bar chart */}
        <motion.div variants={itemVariants} className="ag-card lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-bold text-gray-900 text-sm">Weekly Bookings &amp; Revenue</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-full bg-[#FF9800] inline-block" /> Bookings
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-full bg-[#4CAF50] inline-block" /> Revenue
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WEEKLY_CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day"  tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `৳${v / 1000}K`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: 12 }} />
              <Bar yAxisId="left"  dataKey="bookings" fill="#FF9800" radius={[6, 6, 0, 0]} />
              <Bar yAxisId="right" dataKey="revenue"  fill="#4CAF50" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart */}
        <motion.div variants={itemVariants} className="ag-card p-5">
          <h3 className="font-bold text-gray-900 text-sm mb-3">Bookings by Category</h3>
          <div className="flex justify-center mb-3">
            <PieChart width={160} height={160}>
              <Pie
                data={CATEGORY_CHART_DATA}
                cx={75} cy={75}
                innerRadius={45} outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {CATEGORY_CHART_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-1.5">
            {CATEGORY_CHART_DATA.slice(0, 5).map(c => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-xs text-gray-600 flex-1">{c.name}</span>
                <span className="text-xs font-bold text-gray-800">{c.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Users table */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="ag-card overflow-hidden p-0"
      >
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">Recent Users</h3>
          <button
            onClick={() => setActiveNav('users')}
            className="text-sm text-[#FF9800] font-semibold hover:underline"
          >
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                {['Name', 'Type', 'Joined', 'Status', 'Bookings', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_USERS.map(user => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-blue-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#0B1C30] to-[#FF9800] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-[10px] text-gray-400">#{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize"
                      style={{
                        backgroundColor: user.type === 'provider' ? '#F3E5F5' : '#E3F2FD',
                        color: user.type === 'provider' ? '#9C27B0' : '#1E88E5',
                      }}
                    >
                      {user.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500 whitespace-nowrap">{user.joined}</td>
                  <td className="px-5 py-3">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize"
                      style={{
                        backgroundColor:
                          user.status === 'active'   ? '#E8F5E9' :
                          user.status === 'verified' ? '#E3F2FD' : '#FFF3E0',
                        color:
                          user.status === 'active'   ? '#2E7D32' :
                          user.status === 'verified' ? '#1565C0' : '#E65100',
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-gray-700">{user.bookings}</td>
                  <td className="px-5 py-3">
                    <button className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center hover:bg-orange-100 transition-colors">
                      <CheckCircle2 size={13} className="text-[#FF9800]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
