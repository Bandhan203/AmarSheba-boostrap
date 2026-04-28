import { MobileFrame } from '../components/MobileFrame';
import { PROVIDER_TEAM_CONTRACT } from '../data/frontendContracts';

export const ProviderTeamManagementPage = () => {
  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Team Management</h1>
        <p className="text-sm text-gray-500 mb-4">Manage service resources and categories.</p>

        <button className="w-full py-3 rounded-xl text-white font-semibold mb-3" style={{ background: '#1E88E5' }}>+ Add Resource</button>

        <div className="space-y-3">
          {PROVIDER_TEAM_CONTRACT.map(member => (
            <div key={member.id} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.skill} • {member.id}</p>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-semibold">{member.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
};
