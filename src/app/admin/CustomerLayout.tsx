import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { CUSTOMER_NAV_ITEMS } from '../data/frontendContracts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CustomerFindServices, 
  CustomerBookings, 
  CustomerWallet, 
  CustomerHelp, 
  CustomerSettings 
} from './CustomerContent';
import { 
  MapPin, 
  History, 
  ChevronRight, 
  Navigation, 
  ArrowLeft, 
  CreditCard 
} from 'lucide-react';

const CustomerDashboardContent = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Personalized Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-navy-900">Good Morning, Nusrat!</h2>
          <p className="text-slate-500 text-sm mt-1">Ready to keep your home in top shape today?</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
           <MapPin size={16} className="text-[#FF9800]" />
           <span className="text-xs font-bold text-navy-900">Banani, Dhaka</span>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ y: -4 }}
          className="ag-card flex items-center justify-between !bg-navy-900 text-white border-none group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
              <History className="text-[#FF9800]" size={28} />
            </div>
            <div>
              <h4 className="font-bold text-lg">Book Plumber Again</h4>
              <p className="text-xs text-slate-400">Last service: 14 days ago</p>
            </div>
          </div>
          <ChevronRight className="text-[#FF9800] group-hover:translate-x-1 transition-transform" />
        </motion.div>

        <div className="ag-card flex items-center justify-between !bg-[#FF9800] text-white border-none group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Navigation className="text-white" size={28} />
            </div>
            <div>
              <h4 className="font-bold text-lg">Track Current Order</h4>
              <p className="text-xs text-white/80">Technician is 1.2km away</p>
            </div>
          </div>
          <ChevronRight className="text-white group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Popular Near You (Marketplace Grid) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-navy-900">Popular Near You</h3>
          <button className="text-sm font-bold text-[#FF9800]">View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'AC Servicing', emoji: '❄️', price: '৳800', rating: '4.9' },
            { name: 'Home Cleaning', emoji: '✨', price: '৳1200', rating: '4.8' },
            { name: 'Electrical', emoji: '⚡', price: '৳500', rating: '4.7' },
            { name: 'Plumbing', emoji: '🔧', price: '৳650', rating: '4.9' },
          ].map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="ag-card !p-4 flex flex-col items-center text-center group cursor-pointer hover:border-[#FF9800]/30"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.emoji}</div>
              <h4 className="font-bold text-navy-900 text-sm mb-1">{cat.name}</h4>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                 <span>Starts at {cat.price}</span>
                 <span className="text-[#FF9800]">★ {cat.rating}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Tracking Map Preview */}
      <div className="ag-card overflow-hidden !p-0">
         <div className="h-64 bg-slate-100 relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
               <MapPin size={100} className="text-navy-900" />
            </div>
            {/* Tracking UI */}
            <div className="absolute top-6 left-6 right-6 flex items-center gap-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100">
               <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl">👷</div>
               <div className="flex-1">
                  <h4 className="font-bold text-navy-900 text-sm">Arif Hossain (Technician)</h4>
                  <p className="text-xs text-slate-500">Estimated Arrival: <span className="font-bold text-[#FF9800]">12 Mins</span></p>
               </div>
               <button className="w-10 h-10 bg-[#FF9800] rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                  <Navigation size={18} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

const BookingFlow = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="ag-card">
        <div className="flex items-center gap-4 mb-8">
           <button onClick={() => setStep(Math.max(1, step - 1))} className="text-slate-400 hover:text-navy-900">
              <ArrowLeft size={20} />
           </button>
           <h3 className="text-xl font-bold text-navy-900">Book AC Servicing</h3>
           <div className="ml-auto flex gap-1.5">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1.5 rounded-full transition-all ${step === s ? 'w-8 bg-[#FF9800]' : 'w-2 bg-slate-100'}`} />
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h4 className="font-bold text-navy-900">Choose Package</h4>
              <div className="grid grid-cols-1 gap-4">
                 {[
                   { id: 'p1', name: 'Standard Service', desc: 'Gas checkup, water cleaning, filter wash', price: '৳800' },
                   { id: 'p2', name: 'Master Service', desc: 'Full indoor/outdoor dismantling & chemical wash', price: '৳1500' },
                 ].map(pkg => (
                   <div key={pkg.id} className="p-4 rounded-2xl border-2 border-slate-100 hover:border-[#FF9800] transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-bold text-navy-900">{pkg.name}</h5>
                        <span className="font-bold text-[#FF9800]">{pkg.price}</span>
                      </div>
                      <p className="text-xs text-slate-500">{pkg.desc}</p>
                   </div>
                 ))}
              </div>
              <button onClick={() => setStep(2)} className="ag-btn-primary w-full mt-4">Next: Schedule</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
               <h4 className="font-bold text-navy-900">Select Date & Time</h4>
               <div className="p-4 bg-slate-50 rounded-2xl">
                  {/* Mini Calendar Placeholder */}
                  <div className="grid grid-cols-7 gap-2 text-center mb-4">
                    {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-[10px] font-bold text-slate-400">{d}</span>)}
                    {Array.from({ length: 14 }).map((_, i) => (
                      <button key={i} className={`h-8 rounded-lg flex items-center justify-center text-xs font-bold ${i === 4 ? 'bg-[#FF9800] text-white shadow-lg shadow-orange-500/20' : 'hover:bg-white'}`}>
                        {i + 15}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {['10:00 AM', '12:30 PM', '03:00 PM', '05:30 PM'].map(t => (
                      <button key={t} className="py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-navy-900 hover:border-[#FF9800]">
                        {t}
                      </button>
                    ))}
                  </div>
               </div>
               <button onClick={() => setStep(3)} className="ag-btn-primary w-full mt-4">Next: Checkout</button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
               <h4 className="font-bold text-navy-900">Final Checkout</h4>
               <div className="ag-card !bg-slate-50 border-none">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-500">Service Fee</span>
                    <span className="text-sm font-bold text-navy-900">৳800</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-500">Safety Charge</span>
                    <span className="text-sm font-bold text-navy-900">৳50</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                    <span className="font-bold text-navy-900">Total</span>
                    <span className="font-bold text-[#FF9800] text-lg">৳850</span>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100">
                    <CreditCard size={20} className="text-slate-400" />
                    <span className="text-sm font-bold text-navy-900 flex-1">Online Payment (bKash/Card)</span>
                    <div className="w-5 h-5 rounded-full border-2 border-[#FF9800] flex items-center justify-center">
                       <div className="w-2.5 h-2.5 bg-[#FF9800] rounded-full" />
                    </div>
                  </div>
               </div>
               <button className="ag-btn-primary w-full mt-4 !bg-navy-900">Confirm & Pay</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const CustomerLayout = () => {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard': return <CustomerDashboardContent />;
      case 'find':      return <CustomerFindServices />;
      case 'bookings':  return <CustomerBookings />;
      case 'wallet':    return <CustomerWallet />;
      case 'claims':    return <CustomerHelp />;
      case 'profile':   return <CustomerSettings />;
      default:          return <CustomerDashboardContent />;
    }
  };

  return (
    <DashboardLayout
      navItems={CUSTOMER_NAV_ITEMS}
      activeNav={activeNav}
      setActiveNav={setActiveNav}
      title="User Panel"
    >
      {renderContent()}
    </DashboardLayout>
  );
};
