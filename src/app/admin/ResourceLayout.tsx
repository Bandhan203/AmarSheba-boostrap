import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { RESOURCE_NAV_ITEMS } from '../data/frontendContracts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResourceHistory, 
  ResourceMessages, 
  ResourceProfile 
} from './ResourceContent';
import { 
  MapPin, 
  ChevronRight, 
  AlertCircle, 
  Navigation, 
  Briefcase, 
  Star, 
  Activity, 
  ArrowLeft, 
  Phone, 
  MessageSquare 
} from 'lucide-react';

const ResourceDashboardContent = ({ onSelectJob }: { onSelectJob: (id: string) => void }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Schedule Today (Timeline) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-navy-900 text-lg">My Schedule Today</h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">April 27, 2026</span>
          </div>
          
          {[
            { id: 'job-1', time: '10:00 AM', client: 'Rahim Ahmed', service: 'AC Maintenance', location: 'Gulshan 2, Road 14', status: 'Ready' },
            { id: 'job-2', time: '01:30 PM', client: 'Sumi Akter', service: 'Basin Repair', location: 'Banani Block D', status: 'Upcoming' },
            { id: 'job-3', time: '04:00 PM', client: 'Tanvir Hossain', service: 'Full Home Clean', location: 'Baridhara', status: 'Upcoming' },
          ].map((job, i) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelectJob(job.id)}
              className="ag-card !p-4 flex gap-4 hover:border-[#FF9800]/30 cursor-pointer group"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-extrabold text-navy-900 bg-slate-100 px-2 py-1 rounded-lg">{job.time}</span>
                <div className="w-0.5 flex-1 bg-slate-100 rounded-full" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm group-hover:text-[#FF9800] transition-colors">{job.service}</h4>
                    <p className="text-xs text-slate-500 font-medium">{job.client}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${job.status === 'Ready' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400">
                  <MapPin size={12} />
                  <span>{job.location}</span>
                </div>
              </div>
              <div className="flex items-center">
                <ChevronRight size={18} className="text-slate-300 group-hover:text-[#FF9800] transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Daily Check-in Sidebar */}
        <div className="space-y-4">
          <h3 className="font-bold text-navy-900 text-lg mb-2">Daily Check-in</h3>
          <div className="ag-card !bg-emerald-500 text-white border-none">
             <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Shift Status</p>
             <div className="flex items-center gap-2 mt-1 mb-4">
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                <h4 className="text-xl font-bold">Online & Active</h4>
             </div>
             <button className="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-colors">
                Go Offline
             </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="ag-card !p-4 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-slate-50">
                <AlertCircle className="text-red-500 mb-2" size={24} />
                <span className="text-[10px] font-bold text-navy-900">Report Issue</span>
             </div>
             <div className="ag-card !p-4 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-slate-50">
                <Navigation className="text-blue-500 mb-2" size={24} />
                <span className="text-[10px] font-bold text-navy-900">View Map</span>
             </div>
          </div>

          {/* Performance Quick Look */}
          <div className="ag-card">
             <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Performance Today</h4>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-slate-400" />
                      <span className="text-xs font-bold text-navy-900">Jobs Done</span>
                   </div>
                   <span className="text-sm font-extrabold text-navy-900">4</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <Star size={16} className="text-[#FF9800]" />
                      <span className="text-xs font-bold text-navy-900">Avg. Rating</span>
                   </div>
                   <span className="text-sm font-extrabold text-navy-900">4.95</span>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <Activity size={16} className="text-blue-500" />
                      <span className="text-xs font-bold text-navy-900">Dist. Covered</span>
                   </div>
                   <span className="text-sm font-extrabold text-navy-900">12.4 km</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobDetailContent = ({ jobId, onBack }: { jobId: string, onBack: () => void }) => {
  return (
    <div className="p-6 max-w-2xl">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-navy-900 font-bold text-sm mb-6">
         <ArrowLeft size={18} /> Back to Schedule
      </button>

      <div className="ag-card space-y-6">
         <div className="flex items-start justify-between">
            <div>
               <span className="ag-badge-orange mb-2">Active Job</span>
               <h2 className="text-2xl font-extrabold text-navy-900">AC Maintenance & Gas Refill</h2>
               <p className="text-sm text-slate-500">Job ID: #{jobId.split('-')[1] || '942'} · Booking Date: Apr 27</p>
            </div>
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl">❄️</div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Customer</p>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-[#FF9800] rounded-full flex items-center justify-center text-white font-bold">R</div>
                     <div>
                        <p className="text-sm font-bold text-navy-900">Rahim Ahmed</p>
                        <p className="text-xs text-slate-500">Verified Member</p>
                     </div>
                  </div>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Service Location</p>
                  <p className="text-sm font-bold text-navy-900">Gulshan 2, Road 14, House 22/A</p>
                  <p className="text-xs text-slate-500">Flat 4C, 4th Floor</p>
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <button className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-500/20">
                  <Phone size={18} /> Call Customer
               </button>
               <button className="flex items-center justify-center gap-2 w-full py-3 border border-slate-200 text-navy-900 rounded-2xl font-bold text-sm hover:bg-slate-50">
                  <MessageSquare size={18} /> Chat
               </button>
               <button className="flex items-center justify-center gap-2 w-full py-3 bg-navy-900 text-white rounded-2xl font-bold text-sm">
                  <Navigation size={18} /> Start Navigation
               </button>
            </div>
         </div>

         <div className="border-t border-slate-100 pt-6">
            <h4 className="font-bold text-navy-900 mb-3">Service Checklist</h4>
            <div className="space-y-2">
               {['Check compressor pressure', 'Filter cleaning', 'Drain pipe check', 'External condenser wash'].map(item => (
                 <div key={item} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-5 h-5 rounded-md border-2 border-slate-300" />
                    <span className="text-xs font-bold text-navy-900">{item}</span>
                 </div>
               ))}
            </div>
         </div>

         <button className="ag-btn-primary w-full !bg-navy-900 mt-4 py-4 text-lg">
            Complete Job & Collect Cash
         </button>
      </div>
    </div>
  );
};

export const ResourceLayout = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const renderContent = () => {
    if (selectedJob) return <JobDetailContent jobId={selectedJob} onBack={() => setSelectedJob(null)} />;

    switch (activeNav) {
      case 'dashboard': return <ResourceDashboardContent onSelectJob={setSelectedJob} />;
      case 'history':   return <ResourceHistory />;
      case 'messages':  return <ResourceMessages />;
      case 'profile':   return <ResourceProfile />;
      default:          return <ResourceDashboardContent onSelectJob={setSelectedJob} />;
    }
  };

  return (
    <DashboardLayout
      navItems={RESOURCE_NAV_ITEMS}
      activeNav={activeNav}
      setActiveNav={setActiveNav}
      title="Field App"
    >
      {renderContent()}
    </DashboardLayout>
  );
};
