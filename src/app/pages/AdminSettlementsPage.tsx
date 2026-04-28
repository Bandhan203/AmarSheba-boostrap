import { MobileFrame } from '../components/MobileFrame';
import { ADMIN_SETTLEMENT_CONTRACT } from '../data/frontendContracts';

export const AdminSettlementsPage = () => {
  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Settlement Overview</h1>
        <p className="text-sm text-gray-500 mb-4">Track provider payouts and pending settlements.</p>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded-2xl border border-gray-100 p-4"><p className="text-xs text-gray-400">Pending</p><p className="text-lg font-bold">৳{ADMIN_SETTLEMENT_CONTRACT.pending.toLocaleString()}</p></div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4"><p className="text-xs text-gray-400">Released</p><p className="text-lg font-bold text-green-600">৳{ADMIN_SETTLEMENT_CONTRACT.released.toLocaleString()}</p></div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-sm text-gray-600">
          Weekly payout batch scheduled: {ADMIN_SETTLEMENT_CONTRACT.payoutSchedule}
        </div>
      </div>
    </MobileFrame>
  );
};
