import { useNavigate, useSearchParams } from 'react-router-dom';

export const WebUnauthorizedPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md text-center bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
        <p className="text-sm font-semibold text-orange-600 mb-2">403</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Unauthorized Access</h1>
        <p className="text-gray-500 text-sm mb-6">Your current role does not have permission to access this screen.</p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => navigate(`/access?redirect=${encodeURIComponent(redirectPath)}`)}
            className="px-5 py-3 rounded-xl text-white font-semibold text-sm"
            style={{ background: '#1E88E5' }}
          >
            Switch Role
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-3 rounded-xl text-gray-700 font-semibold text-sm border border-gray-200"
          >
            Home
          </button>
        </div>
      </div>
    </section>
  );
};
