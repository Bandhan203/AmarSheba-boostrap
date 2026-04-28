import { useNavigate, useParams } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { PROVIDER_BOOKING_DETAIL_CONTRACT } from '../data/frontendContracts';

export const ProviderBookingDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <MobileFrame>
      <div className="h-full bg-[#F5F7FA] overflow-y-auto px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Booking Detail</h1>
        <p className="text-sm text-gray-500 mb-4">Booking #{id}</p>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-1 text-sm mb-3">
          <p><span className="text-gray-400">Customer:</span> {PROVIDER_BOOKING_DETAIL_CONTRACT.customerName}</p>
          <p><span className="text-gray-400">Service:</span> {PROVIDER_BOOKING_DETAIL_CONTRACT.service}</p>
          <p><span className="text-gray-400">Slot:</span> {PROVIDER_BOOKING_DETAIL_CONTRACT.slot}</p>
          <p><span className="text-gray-400">Address:</span> {PROVIDER_BOOKING_DETAIL_CONTRACT.address}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => navigate('/provider/assignment')} className="py-3 rounded-xl text-white font-semibold" style={{ background: '#4CAF50' }}>Assign Resource</button>
          <button className="py-3 rounded-xl border border-orange-200 text-orange-600 font-semibold">Contact Customer</button>
        </div>
      </div>
    </MobileFrame>
  );
};
