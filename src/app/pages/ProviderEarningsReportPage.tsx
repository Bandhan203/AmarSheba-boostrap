import { MobileFrame } from '../components/MobileFrame';
import { PROVIDER_EARNINGS_CONTRACT } from '../data/frontendContracts';

export const ProviderEarningsReportPage = () => {
  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Earnings Report</h1>
        <p className="text-sm text-gray-500 mb-4">Daily/monthly revenue after commission.</p>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400">Gross (Month)</p>
            <p className="text-lg font-bold text-gray-900">৳{PROVIDER_EARNINGS_CONTRACT.grossMonth.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400">Net (After 12%)</p>
            <p className="text-lg font-bold text-green-600">৳{PROVIDER_EARNINGS_CONTRACT.netAfterCommission.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-sm text-gray-600">
          <p>Commission: {PROVIDER_EARNINGS_CONTRACT.commissionPercent}%</p>
          <p>Completed Jobs: {PROVIDER_EARNINGS_CONTRACT.completedJobs}</p>
          <p>Pending Settlement: ৳{PROVIDER_EARNINGS_CONTRACT.pendingSettlement.toLocaleString()}</p>
        </div>
      </div>
    </MobileFrame>
  );
};
