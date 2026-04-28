import { useNavigate } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { ResourceBottomNav } from '../components/ResourceBottomNav';
import { RESOURCE_ASSIGNMENTS_CONTRACT } from '../data/frontendContracts';

export const ResourceAssignmentsPage = () => {
  const navigate = useNavigate();

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F5F7FA]">
        <div className="flex-1 overflow-y-auto px-4 pt-12 pb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Assignments</h1>
          <p className="text-sm text-gray-500 mb-4">Today’s field technician job queue.</p>

          <div className="space-y-3">
            {RESOURCE_ASSIGNMENTS_CONTRACT.map(job => (
              <button
                key={job.id}
                onClick={() => navigate(`/resource/job/${job.id}`)}
                className="w-full text-left bg-white rounded-2xl p-4 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{job.service}</p>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-orange-100 text-orange-600 font-semibold">{job.status}</span>
                </div>
                <p className="text-sm text-gray-600">{job.address}</p>
                <p className="text-xs text-gray-400 mt-1">{job.time} • #{job.id}</p>
              </button>
            ))}
          </div>
        </div>
        <ResourceBottomNav />
      </div>
    </MobileFrame>
  );
};
