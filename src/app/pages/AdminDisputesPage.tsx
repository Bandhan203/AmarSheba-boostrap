import { MobileFrame } from '../components/MobileFrame';
import { ADMIN_DISPUTES_CONTRACT } from '../data/frontendContracts';

export const AdminDisputesPage = () => {
  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Dispute Management</h1>
        <p className="text-sm text-gray-500 mb-4">Review and resolve customer/provider disputes.</p>

        <div className="space-y-3">
          {ADMIN_DISPUTES_CONTRACT.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="font-semibold text-gray-900">Ticket #{item.id}</p>
              <p className="text-xs text-gray-500">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
};
