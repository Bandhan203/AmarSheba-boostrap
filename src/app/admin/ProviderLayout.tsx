import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { PROVIDER_NAV_ITEMS } from '../data/frontendContracts';
import { motion } from 'framer-motion';
import { 
  Users, 
  Map as MapIcon, 
  Settings, 
  BarChart3, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Star
} from 'lucide-react';
import { 
  ProviderLiveBookings, 
  ProviderEarnings, 
  ProviderVerification, 
  ProviderProfile 
} from './ProviderContent';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { WEEKLY_CHART_DATA } from '../data/mockData';

const ProviderDashboardContent = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Ops Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'New Jobs', value: '12', trend: 'Today', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Completed', value: '48', trend: 'This Week', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Active Techs', value: '6/8', trend: 'Online', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Pending Payout', value: '৳14,200', trend: 'Next: Fri', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Rating', value: '4.8', trend: 'High', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="ag-card !p-4 flex flex-col justify-between"
          >
            <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{s.label}</p>
              <h3 className="text-xl font-bold text-navy-900 mt-0.5">{s.value}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{s.trend}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 ag-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-navy-900">Profit Analytics</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+14.2% vs last month</span>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={WEEKLY_CHART_DATA}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9800" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF9800" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }} />
                <Area type="monotone" dataKey="revenue" stroke="#FF9800" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Map Preview */}
        <div className="ag-card flex flex-col">
          <h3 className="font-bold text-navy-900 mb-4 text-sm">Technician Tracking</h3>
          <div className="flex-1 rounded-2xl bg-slate-100 relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center">
                <MapIcon size={40} className="text-slate-300" />
             </div>
             {/* Tech Pips */}
             <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
             <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-lg" />
             <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-lg" />
             
             <div className="absolute bottom-3 left-3 right-3 bg-white p-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <p className="text-[10px] font-bold text-navy-900">Arif Hossain</p>
                  <span className="text-[9px] text-slate-400 ml-auto">En-route to Gulshan</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full">
                  <div className="bg-emerald-500 h-full w-2/3 rounded-full" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamManagementContent = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-navy-900">Resource Management</h3>
      <button className="ag-btn-primary !py-2 text-xs">Add New Technician</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { name: 'Arif Hossain', role: 'Electrician', status: 'On Job', rating: '4.9', tasks: 4 },
        { name: 'Mina Akter', role: 'Cleaner', status: 'Online', rating: '4.7', tasks: 3 },
        { name: 'Rakib Hasan', role: 'Plumber', status: 'Offline', rating: '4.8', tasks: 0 },
      ].map(tech => (
        <div key={tech.name} className="ag-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-navy-900 text-lg">
              {tech.name[0]}
            </div>
            <div>
              <h4 className="font-bold text-navy-900 text-sm">{tech.name}</h4>
              <p className="text-xs text-slate-500">{tech.role}</p>
            </div>
            <div className="ml-auto text-right">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                tech.status === 'On Job' ? 'bg-blue-100 text-blue-600' : 
                tech.status === 'Online' ? 'bg-emerald-100 text-emerald-600' : 
                'bg-slate-100 text-slate-500'
              }`}>
                {tech.status}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-bold">Today's Tasks</p>
              <p className="text-sm font-bold text-navy-900">{tech.tasks} Jobs</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-bold">Rating</p>
              <p className="text-sm font-bold text-navy-900">⭐ {tech.rating}</p>
            </div>
          </div>
          <button className="w-full mt-4 py-2 text-xs font-bold text-slate-600 hover:text-navy-900 transition-colors">
            View Performance Report
          </button>
        </div>
      ))}
    </div>
  </div>
);

export const ProviderLayout = () => {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard': return <ProviderDashboardContent />;
      case 'team':      return <TeamManagementContent />;
      case 'bookings':  return <ProviderLiveBookings />;
      case 'earnings':  return <ProviderEarnings />;
      case 'kyc':       return <ProviderVerification />;
      case 'profile':   return <ProviderProfile />;
      default:          return <ProviderDashboardContent />;
    }
  };

  return (
    <DashboardLayout
      navItems={PROVIDER_NAV_ITEMS}
      activeNav={activeNav}
      setActiveNav={setActiveNav}
      title="Provider Hub"
    >
      {renderContent()}
    </DashboardLayout>
  );
};
