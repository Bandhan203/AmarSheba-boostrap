import { BOOKING_TRACKING_CONTRACT } from '../data/frontendContracts';

export const WebBookingTrackingPage = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Tracking</h1>
      <p className="text-gray-600 mb-6">Track your order lifecycle from booking to completion.</p>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <p className="text-sm text-gray-500 mb-4">Order ID: {BOOKING_TRACKING_CONTRACT.orderId}</p>
        <div className="grid md:grid-cols-4 gap-2">
          {BOOKING_TRACKING_CONTRACT.steps.map((step, index) => (
            <div
              key={step}
              className="rounded-xl p-3 border"
              style={{
                borderColor: index <= BOOKING_TRACKING_CONTRACT.currentStepIndex ? '#1E88E5' : '#E5E7EB',
                background: index <= BOOKING_TRACKING_CONTRACT.currentStepIndex ? '#E3F2FD' : 'white',
              }}
            >
              <p className="text-xs text-gray-400">Step {index + 1}</p>
              <p className="text-sm font-semibold text-gray-900">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
