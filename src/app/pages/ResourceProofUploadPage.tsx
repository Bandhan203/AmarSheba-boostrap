import { useNavigate, useParams } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';

export const ResourceProofUploadPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Proof of Service</h1>
        <p className="text-sm text-gray-500 mb-4">Upload before/after photos for job {id}</p>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-3">
          <label className="block text-sm font-medium text-gray-700">Before Photo</label>
          <input type="file" className="w-full text-sm" />
          <label className="block text-sm font-medium text-gray-700">After Photo</label>
          <input type="file" className="w-full text-sm" />
          <textarea rows={4} placeholder="Work summary" className="w-full rounded-xl border border-gray-200 p-3 text-sm" />
          <button onClick={() => navigate(`/resource/job/${id}`)} className="w-full py-3 rounded-xl text-white font-semibold" style={{ background: '#FF9800' }}>Save Proof</button>
        </div>
      </div>
    </MobileFrame>
  );
};
