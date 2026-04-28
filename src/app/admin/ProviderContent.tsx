import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  DollarSign, 
  TrendingUp, 
  ChevronRight, 
  ShieldCheck, 
  Upload, 
  FileText,
  User,
  Settings,
  Bell,
  Navigation,
  MessageSquare
} from 'lucide-react';
import { MOCK_BOOKINGS } from '../data/mockData';

/* ─── Live Bookings ──────────────────────────────────────── */
export const ProviderLiveBookings = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-navy-900">Active Orders</h3>
        <div className="flex gap-2">
           <span className="text-[10px] font-bold px-2 py-1 bg-orange-100 text-orange-600 rounded-lg">3 New</span>
           <span className="text-[10px] font-bold px-2 py-1 bg-blue-100 text-blue-600 rounded-lg">2 Ongoing</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { id: 'ORD-942', client: 'Nusrat Jahan', service: 'AC Maintenance', time: '10:30 AM', status: 'Ongoing', tech: 'Arif' },
          { id: 'ORD-945', client: 'Karim Ahmed', service: 'Full Home Clean', time: '01:00 PM', status: 'Confirmed', tech: 'Unassigned' },
          { id: 'ORD-948', client: 'Sumi Akter', service: 'Basin Repair', time: '04:30 PM', status: 'New', tech: 'Unassigned' },
        ].map((ord, i) => (
          <motion.div 
            key={ord.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="ag-card !p-5 flex items-center justify-between group hover:border-[#FF9800]/30 transition-all"
          >
            <div className="flex items-center gap-4">
               <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white ${
                 ord.status === 'Ongoing' ? 'bg-blue-500' : ord.status === 'Confirmed' ? 'bg-[#FF9800]' : 'bg-slate-400'
               }`}>
                  <span className="text-[8px] font-bold uppercase">{ord.time.split(' ')[1]}</span>
                  <span className="text-sm font-extrabold">{ord.time.split(' ')[0]}</span>
               </div>
               <div>
                  <h4 className="font-bold text-navy-900 group-hover:text-[#FF9800] transition-colors">{ord.service}</h4>
                  <p className="text-xs text-slate-500">{ord.client} · {ord.id}</p>
                  <div className="flex items-center gap-2 mt-1">
                     <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <User size={10} /> {ord.tech}
                     </span>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="text-right mr-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                  <p className={`text-xs font-bold ${
                    ord.status === 'Ongoing' ? 'text-blue-500' : 'text-[#FF9800]'
                  }`}>{ord.status}</p>
               </div>
               <button className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-orange-50 hover:text-[#FF9800] transition-colors">
                  <ChevronRight size={20} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─── Earnings Analytics ─────────────────────────────────── */
export const ProviderEarnings = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Today\'s Profit', value: '৳2,400', icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'Weekly Gross', value: '৳18,500', icon: DollarSign, color: 'text-blue-500' },
          { label: 'Total Payouts', value: '৳1,42,000', icon: CheckCircle2, color: 'text-purple-500' },
        ].map(s => (
          <div key={s.label} className="ag-card !p-5">
             <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</span>
                <s.icon size={16} className={s.color} />
             </div>
             <h3 className="text-2xl font-extrabold text-navy-900">{s.value}</h3>
          </div>
        ))}
      </div>

      <div className="ag-card p-0 overflow-hidden">
         <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-navy-900 text-sm">Recent Payouts</h3>
            <button className="ag-btn-primary !py-1.5 !px-4 text-[10px]">Export PDF</button>
         </div>
         <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
               <tr>
                  <th className="px-6 py-3">Payout ID</th>
                  <th className="px-6 py-3">Period</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
               </tr>
            </thead>
            <tbody className="text-xs font-medium">
               {[
                 { id: 'PAY-421', date: 'Apr 20 - Apr 26', amt: '৳12,400', status: 'Transferred' },
                 { id: 'PAY-420', date: 'Apr 13 - Apr 19', amt: '৳9,800', status: 'Transferred' },
                 { id: 'PAY-419', date: 'Apr 06 - Apr 12', amt: '৳14,200', status: 'Transferred' },
               ].map((p, i) => (
                 <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-navy-900 font-bold">{p.id}</td>
                    <td className="px-6 py-4 text-slate-500">{p.date}</td>
                    <td className="px-6 py-4 font-extrabold text-navy-900">{p.amt}</td>
                    <td className="px-6 py-4"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[9px]">{p.status}</span></td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

/* ─── Verification ────────────────────────────────────────── */
export const ProviderVerification = () => {
  return (
    <div className="p-6 max-w-4xl">
       <div className="ag-card space-y-8">
          <div className="flex items-start gap-4">
             <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF9800]">
                <ShieldCheck size={24} />
             </div>
             <div>
                <h3 className="text-xl font-bold text-navy-900">Partner Verification</h3>
                <p className="text-xs text-slate-500">Submit your business documents to unlock expert badge and high-value jobs.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[
               { label: 'NID / Passport', desc: 'Scan of front and back side', status: 'Verified', icon: FileText },
               { label: 'Trade License', desc: 'Valid government business license', status: 'Pending', icon: ShieldCheck },
               { label: 'Utility Bill', desc: 'Proof of business location', status: 'Not Uploaded', icon: MapPin },
               { label: 'Tax Certificate', desc: 'e-TIN or tax return copy', status: 'Not Uploaded', icon: FileText },
             ].map(doc => (
               <div key={doc.label} className="p-5 rounded-3xl border-2 border-slate-100 border-dashed hover:border-[#FF9800] transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#FF9800]">
                        <doc.icon size={20} />
                     </div>
                     <div className="flex-1">
                        <h4 className="font-bold text-navy-900 text-sm">{doc.label}</h4>
                        <p className="text-[10px] text-slate-500">{doc.desc}</p>
                     </div>
                     <span className={`text-[9px] font-bold px-2 py-1 rounded-lg ${
                       doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-600' : 
                       doc.status === 'Pending' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                     }`}>
                        {doc.status}
                     </span>
                  </div>
                  {doc.status.includes('Not') && (
                    <button className="w-full mt-4 py-2 bg-slate-100 rounded-xl text-[10px] font-bold text-navy-900 flex items-center justify-center gap-2">
                       <Upload size={14} /> Upload File
                    </button>
                  )}
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};

/* ─── Profile & Settings ──────────────────────────────────── */
export const ProviderProfile = () => {
  return (
    <div className="p-6 max-w-5xl space-y-6">
       <div className="ag-card">
          <div className="flex flex-col md:flex-row gap-8 items-start">
             <div className="w-40 flex flex-col items-center gap-4">
                <div className="w-40 h-40 bg-slate-100 rounded-[40px] flex items-center justify-center text-6xl">🏢</div>
                <button className="ag-btn-primary !w-full text-xs">Update Profile</button>
             </div>
             
             <div className="flex-1 space-y-6">
                <div>
                   <h3 className="text-2xl font-bold text-navy-900">Ruksana Services Ltd.</h3>
                   <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                      <MapPin size={14} className="text-[#FF9800]" /> Dhanmondi, Dhaka · Joined 2024
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[
                     { label: 'Owner Name', value: 'Ruksana Akter', icon: User },
                     { label: 'Business Type', value: 'Private Limited', icon: ShieldCheck },
                     { label: 'Contact Phone', value: '+880 1677-123456', icon: Bell },
                     { label: 'Support Email', value: 'help@ruksanaservices.com', icon: MessageSquare },
                   ].map(f => (
                     <div key={f.label}>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">{f.label}</label>
                        <div className="bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100 flex items-center gap-3">
                           <f.icon size={16} className="text-slate-300" />
                           <input className="bg-transparent outline-none text-sm font-bold text-navy-900 w-full" defaultValue={f.value} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="ag-card">
             <h4 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-[#FF9800]" /> Operating Hours
             </h4>
             <div className="space-y-3">
                {['Saturday - Thursday', 'Friday'].map(d => (
                  <div key={d} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                     <span className="text-sm font-medium text-slate-600">{d}</span>
                     <span className="text-sm font-bold text-navy-900">{d.includes('Friday') ? 'Closed' : '09:00 AM - 08:00 PM'}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="ag-card">
             <h4 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                <Navigation size={18} className="text-[#FF9800]" /> Service Coverage
             </h4>
             <div className="flex flex-wrap gap-2">
                {['Dhanmondi', 'Lalmatia', 'Mohammadpur', 'Tejgaon', 'Panthapath'].map(area => (
                  <span key={area} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-navy-900">
                    {area}
                  </span>
                ))}
                <button className="px-3 py-1.5 rounded-xl border-2 border-dashed border-slate-200 text-xs font-bold text-slate-400 hover:border-[#FF9800] hover:text-[#FF9800]">
                  + Add Area
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};
