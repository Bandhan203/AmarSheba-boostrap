import { MobileFrame } from '../components/MobileFrame';
import { ResourceBottomNav } from '../components/ResourceBottomNav';
import { RESOURCE_PROFILE_CONTRACT } from '../data/frontendContracts';

export const ResourceProfilePage = () => {
  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-[#F5F7FA]">
        <div className="flex-1 overflow-y-auto px-4 pt-12 pb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Field Technician Profile</h1>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-3">
            <p className="font-semibold text-gray-900">{RESOURCE_PROFILE_CONTRACT.name}</p>
            <p className="text-sm text-gray-500">{RESOURCE_PROFILE_CONTRACT.roleTitle} • ID: {RESOURCE_PROFILE_CONTRACT.technicianId}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-2 text-sm">
            <p className="text-gray-700">Availability: <span className="font-medium">{RESOURCE_PROFILE_CONTRACT.availability}</span></p>
            <p className="text-gray-700">Zone: <span className="font-medium">{RESOURCE_PROFILE_CONTRACT.zone}</span></p>
            <p className="text-gray-700">Completed Jobs: <span className="font-medium">{RESOURCE_PROFILE_CONTRACT.completedJobs}</span></p>
            <p className="text-gray-700">Average Rating: <span className="font-medium">{RESOURCE_PROFILE_CONTRACT.averageRating}</span></p>
          </div>
        </div>
        <ResourceBottomNav />
      </div>
    </MobileFrame>
  );
};
