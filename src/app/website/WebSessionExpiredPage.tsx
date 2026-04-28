import { useNavigate } from 'react-router-dom';

export const WebSessionExpiredPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md text-center bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
        <p className="text-sm font-semibold text-red-600 mb-2">Session</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Session Expired</h1>
        <p className="text-gray-500 text-sm mb-6">Please sign in again to continue your role-based workflow.</p>
        <button
          onClick={() => navigate('/access')}
          className="px-5 py-3 rounded-xl text-white font-semibold text-sm"
          style={{ background: '#1E88E5' }}
        >
          Sign In Again
        </button>
      </div>
    </section>
  );
};
