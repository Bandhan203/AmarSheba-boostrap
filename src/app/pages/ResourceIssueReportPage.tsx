import { useNavigate, useParams } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { RESOURCE_ISSUE_REASONS } from '../data/frontendContracts';

export const ResourceIssueReportPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Report Issue</h1>
        <p className="text-sm text-gray-500 mb-4">Escalate job issue for {id}</p>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-3">
          <select className="w-full rounded-xl border border-gray-200 p-3 text-sm">
            {RESOURCE_ISSUE_REASONS.map(reason => (
              <option key={reason}>{reason}</option>
            ))}
          </select>
          <textarea rows={5} placeholder="Describe the issue" className="w-full rounded-xl border border-gray-200 p-3 text-sm" />
          <button onClick={() => navigate(`/resource/job/${id}`)} className="w-full py-3 rounded-xl text-white font-semibold" style={{ background: '#E53935' }}>Submit Issue</button>
        </div>
      </div>
    </MobileFrame>
  );
};
