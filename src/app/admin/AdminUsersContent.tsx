import { motion } from 'framer-motion';
import { Ban, CheckCircle2, Eye, Search } from 'lucide-react';
import { useState } from 'react';
import { RECENT_USERS } from '../data/mockData';

const itemV = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.32 } },
};

export const AdminUsersContent = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified'>('all');
  const [search, setSearch] = useState('');

  const filtered = RECENT_USERS
    .filter((u: any) => filter === 'all' || u.status === filter)
    .filter((u: any) => !search || u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border border-gray-200 shadow-sm">
          <Search size={16} className="text-gray-400 flex-shrink-0" />
          <input
            id="admin-user-search"
            className="flex-1 text-sm outline-none placeholder:text-gray-400 bg-transparent"
            placeholder="Search by name…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'pending', 'verified'] as const).map(f => (
            <button
              key={f}
              id={`admin-filter-${f}`}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-sm font-semibold capitalize border transition-all"
              style={{
                backgroundColor: filter === f ? '#FF9800' : 'white',
                color:           filter === f ? 'white'   : '#64748B',
                borderColor:     filter === f ? '#FF9800' : '#E2E8F0',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemV} initial="hidden" animate="show" className="ag-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['User', 'Role', 'Join Date', 'Status', 'Bookings', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user: any) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-blue-50/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#1E88E5] to-[#9C27B0] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-[10px] text-gray-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize"
                      style={{ backgroundColor: user.type === 'provider' ? '#F3E5F5' : '#E3F2FD', color: user.type === 'provider' ? '#9C27B0' : '#1E88E5' }}>
                      {user.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500 whitespace-nowrap">{user.joined}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize"
                      style={{
                        backgroundColor: user.status === 'active' ? '#E8F5E9' : user.status === 'verified' ? '#E3F2FD' : '#FFF3E0',
                        color:           user.status === 'active' ? '#2E7D32' : user.status === 'verified' ? '#1565C0' : '#E65100',
                      }}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-700">{user.bookings}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                    <button className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center hover:bg-orange-100 transition-colors"><Eye size={13} className="text-[#FF9800]" /></button>
                      {user.status === 'pending' && (
                        <button className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors"><CheckCircle2 size={13} className="text-green-600" /></button>
                      )}
                      <button className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors"><Ban size={13} className="text-red-500" /></button>
                    </div>
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
