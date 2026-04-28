import { useNavigate, useParams } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { RESOURCE_JOB_DETAIL_CONTRACT } from '../data/frontendContracts';

export const ResourceJobDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Job Detail</h1>
        <p className="text-sm text-gray-500 mb-4">Job ID: {id}</p>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-3 space-y-1 text-sm">
          <p><span className="text-gray-400">Service:</span> {RESOURCE_JOB_DETAIL_CONTRACT.service}</p>
          <p><span className="text-gray-400">Customer:</span> {RESOURCE_JOB_DETAIL_CONTRACT.customer}</p>
          <p><span className="text-gray-400">Address:</span> {RESOURCE_JOB_DETAIL_CONTRACT.address}</p>
          <p><span className="text-gray-400">Slot:</span> {RESOURCE_JOB_DETAIL_CONTRACT.slot}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <button className="py-3 rounded-xl text-white font-semibold" style={{ background: '#FF9800' }}>Start Work</button>
          <button className="py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold">End Work</button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => navigate(`/resource/job/${id}/proof`)} className="py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold">Upload Proof</button>
          <button onClick={() => navigate(`/resource/job/${id}/issue`)} className="py-3 rounded-xl border border-red-200 text-red-600 font-semibold">Report Issue</button>
        </div>
      </div>
    </MobileFrame>
  );
};
