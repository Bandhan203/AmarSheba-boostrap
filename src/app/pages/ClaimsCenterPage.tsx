import { useState } from 'react';
import { MobileFrame } from '../components/MobileFrame';
import { CLAIM_CASES } from '../data/platformContracts';

const reasons = [
  { id: 'poor-workmanship', label: 'Poor workmanship' },
  { id: 'damage', label: 'Property damage' },
  { id: 'incomplete-work', label: 'Incomplete work' },
] as const;

export const ClaimsCenterPage = () => {
  const [reason, setReason] = useState<typeof reasons[number]['id']>('poor-workmanship');
  const [description, setDescription] = useState('');

  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Claims & Dispute Resolution</h1>
        <p className="text-sm text-gray-500 mb-4">File claim, collect evidence, and route to mediation/insurance.</p>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3 mb-4">
          <h2 className="text-sm font-semibold text-gray-900">File a New Claim</h2>
          <select value={reason} onChange={(e) => setReason(e.target.value as typeof reason)} className="w-full rounded-xl border border-gray-200 p-3 text-sm">
            {reasons.map(item => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
          <textarea
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe issue, timeline, and expected resolution"
            className="w-full rounded-xl border border-gray-200 p-3 text-sm"
          />
          <div className="rounded-xl border border-dashed border-gray-300 p-3">
            <p className="text-xs text-gray-600 mb-2">Upload evidence (photos/videos/docs)</p>
            <input type="file" multiple className="w-full text-xs" />
          </div>
          <button className="w-full py-3 rounded-xl text-white font-semibold" style={{ background: '#1E88E5' }}>
            Submit Claim
          </button>
          <p className="text-[11px] text-gray-500">Provider response window: 48 hours • Escalates to platform mediation automatically.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Claim Status Tracking</h2>
          {CLAIM_CASES.map(claim => (
            <div key={claim.id} className="rounded-xl border border-gray-100 p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-800">{claim.id} • {claim.bookingId}</p>
                <span className="text-[10px] px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold">{claim.stage}</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Reason: {claim.reason} • Created: {claim.createdAt}</p>
              <p className="text-[11px] text-gray-500">Insurance route enabled when mediation fails.</p>
            </div>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
};
