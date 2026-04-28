import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  ArrowRight, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Wallet, 
  Plus, 
  HelpCircle, 
  MessageSquare,
  Settings as SettingsIcon,
  User,
  Shield,
  Bell
} from 'lucide-react';
import { CATEGORIES, PROVIDERS } from '../data/mockData';

/* ─── Find Services (Marketplace) ────────────────────────── */
export const CustomerFindServices = () => {
  const [search, setSearch] = useState('');
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-white rounded-2xl px-4 py-3 border border-slate-200 flex items-center gap-3 shadow-sm">
          <Search size={20} className="text-slate-400" />
          <input 
            className="flex-1 bg-transparent outline-none text-sm font-medium text-navy-900" 
            placeholder="What service do you need today?"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="ag-card !p-3 flex items-center gap-2 text-navy-900 font-bold text-sm">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROVIDERS.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase())).map((p, i) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="ag-card group overflow-hidden p-0"
          >
            <div className="h-40 bg-slate-100 relative">
               <img src={p.photo || 'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?q=80&w=400'} alt={p.name} className="w-full h-full object-cover" />
               <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold text-navy-900">
                  <Star size={12} className="text-[#FF9800] fill-[#FF9800]" /> {p.rating}
               </div>
            </div>
            <div className="p-4">
               <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-navy-900 group-hover:text-[#FF9800] transition-colors">{p.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{p.category} Specialist</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-navy-900">৳{p.price}</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase">{p.priceUnit}</p>
                  </div>
               </div>
               <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-4">
                  <MapPin size={12} /> {p.area}
               </div>
               <button className="w-full py-2.5 bg-slate-50 hover:bg-[#FF9800] hover:text-white rounded-xl text-xs font-bold text-navy-900 transition-all flex items-center justify-center gap-2">
                  Book Now <ArrowRight size={14} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─── My Bookings (History) ─────────────────────────────── */
export const CustomerBookings = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-navy-900">Your Bookings</h3>
        <div className="flex gap-2">
           <button className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-navy-900 text-white">All</button>
           <button className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-500">Active</button>
        </div>
      </div>
      
      {[
        { id: 'BK-120', service: 'Deep Cleaning', provider: 'Fatema Begum', date: 'April 26, 2026', status: 'Completed', price: '৳1,200' },
        { id: 'BK-121', service: 'AC Repair', provider: 'Arif Hossain', date: 'April 28, 2026', status: 'Confirmed', price: '৳850' },
        { id: 'BK-122', service: 'Plumbing', provider: 'Rakib Hasan', date: 'May 02, 2026', status: 'Pending', price: '৳600' },
      ].map((bk, i) => (
        <motion.div 
          key={bk.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="ag-card !p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
            bk.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
            bk.status === 'Confirmed' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
          }`}>
            {bk.status === 'Completed' ? '✓' : '●'}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
               <div>
                  <h4 className="font-bold text-navy-900 text-sm">{bk.service}</h4>
                  <p className="text-xs text-slate-500">{bk.provider} · {bk.date}</p>
               </div>
               <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-100 text-slate-500">#{bk.id}</span>
            </div>
          </div>
          <div className="text-right">
             <p className="font-bold text-navy-900 text-sm">{bk.price}</p>
             <p className={`text-[10px] font-bold ${
               bk.status === 'Completed' ? 'text-emerald-500' : 
               bk.status === 'Confirmed' ? 'text-blue-500' : 'text-orange-500'
             }`}>{bk.status}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── My Wallet ─────────────────────────────────────────── */
export const CustomerWallet = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 ag-card !bg-navy-900 text-white border-none flex flex-col justify-between h-56 relative overflow-hidden">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF9800] rounded-full blur-[80px] opacity-30" />
           <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Balance</p>
              <h2 className="text-4xl font-extrabold mt-1">৳3,420.50</h2>
           </div>
           <button className="ag-btn-primary !w-full flex items-center justify-center gap-2">
              <Plus size={18} /> Add Money
           </button>
        </div>

        <div className="lg:col-span-2 ag-card">
           <h3 className="font-bold text-navy-900 mb-4">Quick Refill</h3>
           <div className="grid grid-cols-4 gap-3 mb-6">
              {['500', '1000', '2000', '5000'].map(amt => (
                <button key={amt} className="py-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-navy-900 hover:border-[#FF9800]">
                  ৳{amt}
                </button>
              ))}
           </div>
           <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl">💳</div>
              <div className="flex-1">
                 <p className="text-[10px] font-bold text-slate-400 uppercase">Primary Method</p>
                 <p className="text-sm font-bold text-navy-900">bKash Personal · 017****32</p>
              </div>
              <button className="text-[10px] font-bold text-[#FF9800]">Change</button>
           </div>
        </div>
      </div>

      <div className="ag-card overflow-hidden p-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-navy-900">Transaction History</h3>
          <button className="text-xs font-bold text-slate-400">View All</button>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase">
                 <tr>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Status</th>
                 </tr>
              </thead>
              <tbody className="text-xs">
                 {[
                   { desc: 'Booking #BK-120', date: 'Apr 26, 2026', amt: '-৳1,200', type: 'debit' },
                   { desc: 'Refill via bKash', date: 'Apr 24, 2026', amt: '+৳2,000', type: 'credit' },
                   { desc: 'Booking #BK-118', date: 'Apr 20, 2026', amt: '-৳650', type: 'debit' },
                 ].map((tx, i) => (
                   <tr key={i} className="border-b border-slate-50 last:border-0">
                      <td className="px-6 py-4 font-bold text-navy-900">{tx.desc}</td>
                      <td className="px-6 py-4 text-slate-500">{tx.date}</td>
                      <td className={`px-6 py-4 font-extrabold ${tx.type === 'credit' ? 'text-emerald-500' : 'text-red-500'}`}>{tx.amt}</td>
                      <td className="px-6 py-4"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[9px]">Success</span></td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

/* ─── Help Center ────────────────────────────────────────── */
export const CustomerHelp = () => {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
         <div className="ag-card !bg-[#FF9800] text-white border-none p-8">
            <h2 className="text-2xl font-bold mb-2">How can we help?</h2>
            <div className="bg-white/20 rounded-2xl px-4 py-3 flex items-center gap-3">
               <Search size={20} />
               <input className="bg-transparent outline-none placeholder:text-white/70 text-sm flex-1" placeholder="Search for answers..." />
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: 'How to cancel booking?', icon: HelpCircle },
              { q: 'Payment issues', icon: Wallet },
              { q: 'Refund policy', icon: CheckCircle2 },
              { q: 'Service quality', icon: Star },
            ].map(faq => (
              <div key={faq.q} className="ag-card !p-4 flex items-center gap-3 hover:border-[#FF9800] transition-colors cursor-pointer group">
                 <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-[#FF9800]">
                    <faq.icon size={20} />
                 </div>
                 <span className="text-sm font-bold text-navy-900">{faq.q}</span>
              </div>
            ))}
         </div>
      </div>

      <div className="ag-card flex flex-col justify-between">
         <div>
            <h3 className="font-bold text-navy-900 mb-2 text-lg">Direct Support</h3>
            <p className="text-xs text-slate-500 mb-6">Can't find what you need? Talk to our human experts.</p>
            <div className="space-y-3">
               <button className="w-full py-4 rounded-2xl bg-navy-900 text-white font-bold text-sm flex items-center justify-center gap-2">
                  <MessageSquare size={18} /> Start Live Chat
               </button>
               <button className="w-full py-4 rounded-2xl border border-slate-200 text-navy-900 font-bold text-sm">
                  Create Support Ticket
               </button>
            </div>
         </div>
         <div className="pt-6 border-t border-slate-50 mt-6">
            <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">Available 24/7</p>
         </div>
      </div>
    </div>
  );
};

/* ─── Settings ────────────────────────────────────────────── */
export const CustomerSettings = () => {
  return (
    <div className="p-6 max-w-4xl">
       <div className="ag-card space-y-8">
          <div>
             <h3 className="text-xl font-bold text-navy-900">Profile Settings</h3>
             <p className="text-xs text-slate-500">Update your account information and preferences</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
             <div className="w-32 flex flex-col items-center gap-3">
                <div className="w-32 h-32 bg-slate-100 rounded-[32px] border-4 border-white shadow-xl flex items-center justify-center text-5xl">👤</div>
                <button className="text-[10px] font-bold text-[#FF9800] uppercase tracking-widest">Change Photo</button>
             </div>

             <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Full Name', value: 'Nusrat Jahan', icon: User },
                  { label: 'Phone', value: '+880 1712-345678', icon: Bell },
                  { label: 'Email', value: 'nusrat.jahan@email.com', icon: MessageSquare },
                  { label: 'Primary Address', value: 'Gulshan 2, Dhaka', icon: MapPin },
                ].map(field => (
                  <div key={field.label}>
                     <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">{field.label}</label>
                     <div className="bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100 flex items-center gap-3">
                        <field.icon size={16} className="text-slate-300" />
                        <input className="bg-transparent outline-none text-sm font-bold text-navy-900 w-full" defaultValue={field.value} />
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="border-t border-slate-50 pt-8">
             <h4 className="font-bold text-navy-900 mb-4">Security & Notifications</h4>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Push Notifications', status: true, icon: Bell },
                  { label: 'SMS Alerts', status: true, icon: Shield },
                  { label: 'Biometric Login', status: false, icon: SettingsIcon },
                ].map(opt => (
                  <div key={opt.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <opt.icon size={16} className="text-slate-400" />
                        <span className="text-xs font-bold text-navy-900">{opt.label}</span>
                     </div>
                     <div className={`w-8 h-4 rounded-full relative ${opt.status ? 'bg-[#FF9800]' : 'bg-slate-300'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${opt.status ? 'right-0.5' : 'left-0.5'}`} />
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
             <button className="px-6 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-500">Cancel</button>
             <button className="ag-btn-primary">Save Changes</button>
          </div>
       </div>
    </div>
  );
};
