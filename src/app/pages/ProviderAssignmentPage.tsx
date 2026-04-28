import { MobileFrame } from '../components/MobileFrame';
import { PROVIDER_ASSIGNMENT_RESOURCES } from '../data/frontendContracts';

export const ProviderAssignmentPage = () => {
  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Assignment Center</h1>
        <p className="text-sm text-gray-500 mb-4">Auto/manual assign nearest available field technician (worker).</p>

        <button className="w-full py-3 rounded-xl text-white font-semibold mb-3" style={{ background: '#4CAF50' }}>Auto Assign Nearest</button>

        <div className="space-y-3">
          {PROVIDER_ASSIGNMENT_RESOURCES.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.proximity} • {item.availability}</p>
              </div>
              <button className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700">Assign</button>
            </div>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
};
