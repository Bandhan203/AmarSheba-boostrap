import { useMemo, useState } from 'react';
import { MobileFrame } from '../components/MobileFrame';
import { PROVIDER_KYC_FIELDS } from '../data/frontendContracts';
import { VERIFICATION_BADGES, VERIFICATION_CHANNELS } from '../data/platformContracts';

export const ProviderKYCPage = () => {
  const [coverageAmount, setCoverageAmount] = useState(1000000);
  const [insuranceExpiry, setInsuranceExpiry] = useState('2026-06-30');
  const minimumCoverage = 1500000;

  const daysUntilExpiry = useMemo(() => {
    const now = new Date('2026-04-26');
    const expiry = new Date(insuranceExpiry);
    const diff = expiry.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [insuranceExpiry]);

  const isCoverageValid = coverageAmount >= minimumCoverage;

  const statusColor = (status: 'pending' | 'approved' | 'rejected') => {
    if (status === 'approved') return 'bg-green-100 text-green-700';
    if (status === 'rejected') return 'bg-red-100 text-red-700';
    return 'bg-amber-100 text-amber-700';
  };

  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">KYC & Verification</h1>
        <p className="text-sm text-gray-500 mb-4">Two-channel verification with insurance and compliance tracking.</p>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3 mb-4">
          <h2 className="text-sm font-semibold text-gray-900">Verification Badge Status</h2>
          <div className="grid grid-cols-2 gap-2">
            {VERIFICATION_BADGES.map(badge => (
              <div
                key={badge.key}
                className={`rounded-xl px-3 py-2 text-xs font-semibold ${badge.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
              >
                ✓ {badge.label}
              </div>
            ))}
          </div>
        </div>

        {VERIFICATION_CHANNELS.map(channel => (
          <div key={channel.channel} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3 mb-4">
            <h2 className="text-sm font-semibold text-gray-900">{channel.title}</h2>
            {channel.items.map(item => (
              <div key={item.id} className="rounded-xl border border-gray-100 px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-gray-800">{item.title}</p>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${statusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Last update: {item.lastUpdated}</p>
              </div>
            ))}
          </div>
        ))}

        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3 mb-4">
          <h2 className="text-sm font-semibold text-gray-900">Insurance Liability Controls</h2>
          <label className="text-xs text-gray-500 block">Coverage Amount (BDT)</label>
          <input
            type="number"
            value={coverageAmount}
            onChange={(e) => setCoverageAmount(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-200 p-3 text-sm"
          />
          <p className={`text-xs font-medium ${isCoverageValid ? 'text-green-600' : 'text-red-600'}`}>
            {isCoverageValid
              ? 'Minimum coverage requirement satisfied.'
              : `Minimum required: ৳${minimumCoverage.toLocaleString()} (current below threshold)`}
          </p>

          <label className="text-xs text-gray-500 block">Insurance Expiry Date</label>
          <input
            type="date"
            value={insuranceExpiry}
            onChange={(e) => setInsuranceExpiry(e.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3 text-sm"
          />
          <p className={`text-xs font-medium ${daysUntilExpiry <= 30 ? 'text-amber-600' : 'text-gray-500'}`}>
            {daysUntilExpiry <= 30
              ? `Expiry alert: renew within ${daysUntilExpiry} days.`
              : `Insurance valid for ${daysUntilExpiry} days.`}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Document Upload & Validation</h2>
          {PROVIDER_KYC_FIELDS.map(field => (
            <input key={field.id} type="text" placeholder={field.placeholder} className="w-full rounded-xl border border-gray-200 p-3 text-sm" />
          ))}
          <input type="file" multiple className="w-full text-sm" />
          <button className="w-full py-3 rounded-xl text-white font-semibold" style={{ background: '#4CAF50' }}>Submit Documents</button>
        </div>
      </div>
    </MobileFrame>
  );
};
