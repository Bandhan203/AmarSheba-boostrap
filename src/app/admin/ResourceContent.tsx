import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Star, 
  Clock, 
  MapPin, 
  MessageSquare, 
  User, 
  Shield, 
  Settings,
  Bell,
  Navigation,
  ArrowRight
} from 'lucide-react';

/* ─── Job History ────────────────────────────────────────── */
export const ResourceHistory = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-navy-900">Job History</h3>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">Total: 240 Jobs</span>
      </div>

      {[
        { id: 'JOB-938', service: 'Sofa Cleaning', client: 'Anika Islam', date: 'Yesterday', rating: '5.0', price: '৳450' },
        { id: 'JOB-935', service: 'AC Checkup', client: 'Mohammad Karim', date: '2 days ago', rating: '4.8', price: '৳300' },
        { id: 'JOB-930', service: 'Electric Repair', client: 'Laila Rahman', date: '3 days ago', rating: '5.0', price: '৳200' },
      ].map((job, i) => (
        <motion.div 
          key={job.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="ag-card !p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
             <CheckCircle2 size={24} />
          </div>
          <div className="flex-1">
             <div className="flex justify-between items-start">
                <div>
                   <h4 className="font-bold text-navy-900 text-sm">{job.service}</h4>
                   <p className="text-xs text-slate-500">{job.client} · {job.date}</p>
                </div>
                <div className="text-right">
                   <div className="flex items-center gap-1 text-[#FF9800] text-xs font-bold">
                      <Star size={12} fill="#FF9800" /> {job.rating}
                   </div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">{job.id}</p>
                </div>
             </div>
          </div>
          <div className="text-right ml-2 border-l border-slate-100 pl-4">
             <p className="text-xs font-extrabold text-navy-900">{job.price}</p>
             <p className="text-[8px] text-slate-400 uppercase font-bold">Earned</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Internal Messages ──────────────────────────────────── */
export const ResourceMessages = () => {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 ag-card p-0 overflow-hidden">
         <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-navy-900 text-sm">Chats</h3>
         </div>
         <div className="divide-y divide-slate-50">
            {[
              { name: 'Provider Support', last: 'Payment processed...', time: '10m ago', active: true },
              { name: 'Team Hub', last: 'Arif: New job assigned...', time: '1h ago', active: false },
              { name: 'HR Dept', last: 'Please update your KYC...', time: '2d ago', active: false },
            ].map((chat, i) => (
              <div key={i} className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${chat.active ? 'bg-orange-50/50' : ''}`}>
                 <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">{chat.name[0]}</div>
                 <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-baseline">
                       <h4 className="text-xs font-bold text-navy-900 truncate">{chat.name}</h4>
                       <span className="text-[8px] text-slate-400">{chat.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">{chat.last}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <div className="lg:col-span-2 ag-card flex flex-col h-[500px]">
         <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-[#FF9800] rounded-full" />
               <h4 className="font-bold text-navy-900 text-sm">Provider Support</h4>
            </div>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Online
            </span>
         </div>
         
         <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50/30">
            <div className="flex justify-center">
               <span className="text-[9px] font-bold text-slate-400 bg-white px-2 py-1 rounded-lg">TODAY</span>
            </div>
            <div className="flex gap-3 max-w-[80%]">
               <div className="w-8 h-8 bg-slate-200 rounded-full flex-shrink-0" />
               <div className="p-3 bg-white rounded-2xl rounded-tl-none shadow-sm text-xs text-navy-900 leading-relaxed">
                  Hi Arif, your weekly commission has been successfully transferred to your bKash wallet.
               </div>
            </div>
            <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
               <div className="w-8 h-8 bg-[#FF9800] rounded-full flex-shrink-0" />
               <div className="p-3 bg-navy-900 text-white rounded-2xl rounded-tr-none shadow-sm text-xs leading-relaxed">
                  Got it. Thanks!
               </div>
            </div>
         </div>

         <div className="p-4 border-t border-slate-100">
            <div className="flex gap-3">
               <input className="flex-1 bg-slate-100 rounded-xl px-4 py-2 text-xs outline-none" placeholder="Type a message..." />
               <button className="w-10 h-10 bg-[#FF9800] rounded-xl flex items-center justify-center text-white">
                  <ArrowRight size={18} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

/* ─── Profile & Settings ──────────────────────────────────── */
export const ResourceProfile = () => {
  return (
    <div className="p-6 max-w-4xl space-y-6">
       <div className="ag-card flex flex-col md:flex-row gap-8 items-start">
          <div className="w-32 flex flex-col items-center gap-3">
             <div className="w-32 h-32 bg-slate-100 rounded-[32px] flex items-center justify-center text-5xl">👷</div>
             <p className="text-[10px] font-extrabold text-[#FF9800] uppercase tracking-widest">Technician ID: 402</p>
          </div>
          
          <div className="flex-1 space-y-6">
             <div>
                <h3 className="text-2xl font-bold text-navy-900">Arif Hossain</h3>
                <p className="text-sm text-slate-500 mt-1">Senior Electrician · Expert Badge</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Work Experience', value: '4+ Years', icon: CheckCircle2 },
                  { label: 'Verified Status', value: 'Full Access', icon: Shield },
                  { label: 'Primary Contact', value: '01712-334455', icon: Bell },
                  { label: 'Emergency Contact', value: '01611-223344', icon: User },
                ].map(f => (
                  <div key={f.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                     <f.icon size={16} className="text-slate-400" />
                     <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">{f.label}</p>
                        <p className="text-xs font-bold text-navy-900">{f.value}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>

       <div className="ag-card">
          <h4 className="font-bold text-navy-900 mb-4">Account Preferences</h4>
          <div className="space-y-4">
             {[
               { label: 'Auto-accept high rated jobs', status: true },
               { label: 'Real-time location sharing', status: true },
               { label: 'Sound alerts for new bookings', status: false },
             ].map(opt => (
               <div key={opt.label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <span className="text-sm font-medium text-slate-600">{opt.label}</span>
                  <div className={`w-8 h-4 rounded-full relative ${opt.status ? 'bg-[#FF9800]' : 'bg-slate-300'}`}>
                     <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${opt.status ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};
