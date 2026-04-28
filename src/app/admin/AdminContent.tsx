import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  TrendingUp, 
  ChevronRight, 
  ShoppingBag, 
  Clock, 
  Settings,
  Bell,
  Globe,
  Lock
} from 'lucide-react';

/* ─── Verification Queue ──────────────────────────────────── */
export const AdminVerification = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-navy-900">Verification Queue</h3>
        <div className="flex gap-2">
           <span className="text-[10px] font-bold px-3 py-1 bg-orange-100 text-orange-600 rounded-lg">12 Pending</span>
           <span className="text-[10px] font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-lg">4 Flagged</span>
        </div>
      </div>

      <div className="ag-card p-0 overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
               <tr>
                  <th className="px-6 py-3">Entity</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Submitted</th>
                  <th className="px-6 py-3">Documents</th>
                  <th className="px-6 py-3 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="text-xs font-medium">
               {[
                 { name: 'Technician: Rakib', type: 'Individual', date: '2h ago', docs: 2 },
                 { name: 'Provider: CleanPro', type: 'Agency', date: '5h ago', docs: 4 },
                 { name: 'Technician: Sumon', type: 'Individual', date: '1d ago', docs: 2 },
               ].map((item, i) => (
                 <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-navy-900">{item.name}</td>
                    <td className="px-6 py-4 text-slate-500">{item.type}</td>
                    <td className="px-6 py-4 text-slate-500">{item.date}</td>
                    <td className="px-6 py-4">
                       <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg font-bold">{item.docs} Files</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2">
                          <button className="w-7 h-7 bg-orange-50 text-[#FF9800] rounded-lg flex items-center justify-center hover:bg-orange-100"><Eye size={14} /></button>
                          <button className="w-7 h-7 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-100"><CheckCircle2 size={14} /></button>
                          <button className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100"><XCircle size={14} /></button>
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

/* ─── Global Bookings ─────────────────────────────────────── */
export const AdminBookings = () => {
  return (
    <div className="p-6 space-y-4">
       <div className="flex flex-col md:flex-row gap-4 mb-2">
          <div className="flex-1 bg-white rounded-2xl px-4 py-2 border border-slate-200 flex items-center gap-3">
             <Search size={18} className="text-slate-400" />
             <input className="flex-1 text-sm outline-none font-medium" placeholder="Search by Booking ID, Client or Provider..." />
          </div>
          <button className="ag-card !p-2 flex items-center gap-2 text-xs font-bold text-navy-900">
             <Filter size={16} /> Filters
          </button>
       </div>

       <div className="ag-card p-0 overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
                <tr>
                   <th className="px-6 py-3">ID</th>
                   <th className="px-6 py-3">Client</th>
                   <th className="px-6 py-3">Provider</th>
                   <th className="px-6 py-3">Status</th>
                   <th className="px-6 py-3">Amount</th>
                </tr>
             </thead>
             <tbody className="text-xs">
                {[
                  { id: 'BK-1022', client: 'Nusrat Jahan', prov: 'CleanPro', status: 'Ongoing', amt: '৳1,500' },
                  { id: 'BK-1021', client: 'Karim Ahmed', prov: 'QuickFix', status: 'Completed', amt: '৳850' },
                  { id: 'BK-1020', client: 'Sumi Akter', prov: 'CleanPro', status: 'Disputed', amt: '৳1,200' },
                ].map((bk, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                     <td className="px-6 py-4 font-bold text-navy-900">{bk.id}</td>
                     <td className="px-6 py-4">{bk.client}</td>
                     <td className="px-6 py-4">{bk.prov}</td>
                     <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                          bk.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                          bk.status === 'Disputed' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                        }`}>{bk.status}</span>
                     </td>
                     <td className="px-6 py-4 font-extrabold">{bk.amt}</td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};

/* ─── Platform Financials ─────────────────────────────────── */
export const AdminFinancials = () => {
  return (
    <div className="p-6 space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: '৳14.8M', icon: TrendingUp, color: 'text-emerald-500' },
            { label: 'Net Commission', value: '৳2.2M', icon: DollarSign, color: 'text-blue-500' },
            { label: 'Active Escrow', value: '৳4.5L', icon: Lock, color: 'text-[#FF9800]' },
            { label: 'Payouts Pending', value: '৳8.2L', icon: Clock, color: 'text-purple-500' },
          ].map(s => (
            <div key={s.label} className="ag-card !p-5">
               <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</span>
                  <s.icon size={16} className={s.color} />
               </div>
               <h3 className="text-xl font-extrabold text-navy-900">{s.value}</h3>
            </div>
          ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="ag-card">
             <h3 className="font-bold text-navy-900 mb-4">Commission Logs</h3>
             <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs">BK</div>
                        <div>
                           <p className="text-xs font-bold text-navy-900">Booking #102{i}</p>
                           <p className="text-[10px] text-slate-500">Apr 27, 2026</p>
                        </div>
                     </div>
                     <span className="text-sm font-extrabold text-emerald-500">+৳150</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="ag-card">
             <h3 className="font-bold text-navy-900 mb-4">Pending Settlements</h3>
             <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-xs text-blue-600 font-bold">P</div>
                        <div>
                           <p className="text-xs font-bold text-navy-900">Partner: TechTeam {i}</p>
                           <p className="text-[10px] text-slate-500">Cycle: Apr 20 - Apr 26</p>
                        </div>
                     </div>
                     <span className="text-sm font-extrabold text-navy-900">৳14,200</span>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

/* ─── Platform Settings ───────────────────────────────────── */
export const AdminSettings = () => {
  return (
    <div className="p-6 max-w-5xl space-y-6">
       <div className="ag-card">
          <h3 className="text-xl font-bold text-navy-900 mb-6">Global Platform Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Default Commission (%)</label>
                   <div className="bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100 flex items-center gap-3">
                      <DollarSign size={16} className="text-slate-300" />
                      <input className="bg-transparent outline-none text-sm font-bold text-navy-900 w-full" defaultValue="15" type="number" />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Safety Fee (৳)</label>
                   <div className="bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100 flex items-center gap-3">
                      <ShieldCheck size={16} className="text-slate-300" />
                      <input className="bg-transparent outline-none text-sm font-bold text-navy-900 w-full" defaultValue="50" type="number" />
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Platform Mode</label>
                   <div className="flex gap-2">
                      <button className="flex-1 py-3 rounded-2xl bg-navy-900 text-white font-bold text-xs">Standard</button>
                      <button className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-400 font-bold text-xs hover:border-red-500 hover:text-red-500">Maintenance</button>
                   </div>
                </div>
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <Bell size={16} className="text-[#FF9800]" />
                      <span className="text-xs font-bold text-navy-900">System Broadcasts</span>
                   </div>
                   <div className="w-8 h-4 bg-[#FF9800] rounded-full relative">
                      <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-white rounded-full" />
                   </div>
                </div>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Localization', desc: 'Manage regions & areas', icon: Globe },
            { label: 'Access Control', desc: 'Admin roles & permissions', icon: Lock },
            { label: 'Integrations', desc: 'SMS, Email, bKash API', icon: Settings },
          ].map(set => (
            <div key={set.label} className="ag-card !p-5 hover:border-[#FF9800] transition-colors cursor-pointer group">
               <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 mb-4 group-hover:bg-orange-50 group-hover:text-[#FF9800]">
                  <set.icon size={20} />
               </div>
               <h4 className="font-bold text-navy-900 text-sm">{set.label}</h4>
               <p className="text-[10px] text-slate-500 mt-1">{set.desc}</p>
            </div>
          ))}
       </div>
    </div>
  );
};
