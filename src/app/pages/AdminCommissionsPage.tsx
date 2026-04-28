import { MobileFrame } from '../components/MobileFrame';
import { ADMIN_COMMISSION_RULES } from '../data/frontendContracts';

export const AdminCommissionsPage = () => {
  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Commission Settings</h1>
        <p className="text-sm text-gray-500 mb-4">Control platform commission by service category.</p>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3 text-sm">
          {ADMIN_COMMISSION_RULES.map(rule => (
            <div key={rule.category} className="flex items-center justify-between"><span>{rule.category}</span><span className="font-semibold">{rule.percent}%</span></div>
          ))}
          <button className="w-full py-2.5 rounded-xl text-white font-semibold" style={{ background: '#7B1FA2' }}>Update Rules</button>
        </div>
      </div>
    </MobileFrame>
  );
};
