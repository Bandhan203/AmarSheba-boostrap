import { BriefcaseBusiness, Loader2, ShieldCheck, User, Wrench } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ROLE_ACCESS_OPTIONS } from '../data/frontendContracts';

const ICON_BY_KEY = {
  user: User,
  briefcase: BriefcaseBusiness,
  wrench: Wrench,
  shield: ShieldCheck,
} as const;

const SHARED_CREDENTIALS = {
  customer: { id: 'customer@amarsheba.com', password: 'Customer@1234' },
  provider: { id: 'provider@amarsheba.com', password: 'Provider@1234' },
  resource: { id: 'resource@amarsheba.com', password: 'Resource@1234' },
  admin: { id: 'admin@amarsheba.com', password: 'Admin@1234' },
};

export const RoleAccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signInAs } = useApp();

  const redirectPath = searchParams.get('redirect');
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const targetPath = useMemo(() => redirectPath || '/dashboard', [redirectPath]);
  const isAdminTarget = targetPath === '/admin';

  const handleAsyncRoleAccess = async (role: AccessRole, fallbackPath: string) => {
    setLoadingRole(role);
    await new Promise((resolve) => setTimeout(resolve, 550));
    signInAs(role);
    setLoadingRole(null);
    
    // If the redirect path is for a specific restricted area, 
    // only use it if the role matches. Otherwise, go to role default.
    if (redirectPath) {
      if (role === 'admin' && redirectPath.startsWith('/admin')) {
        navigate(redirectPath);
        return;
      }
      if (role === 'provider' && redirectPath.startsWith('/provider')) {
        navigate(redirectPath);
        return;
      }
      if (role === 'resource' && redirectPath.startsWith('/resource')) {
        navigate(redirectPath);
        return;
      }
    }
    
    navigate(fallbackPath);
  };

  return (
    <div className="panel-shell px-4 py-10">
      <div className="panel-container">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">
            <h1 className="text-2xl font-bold text-[#0B1C30]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Role Access
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Choose a role to continue. This flow now supports async shared sign-in for quick role switching.
            </p>

            {isAdminTarget && (
              <button
                onClick={() => handleAsyncRoleAccess('admin', '/admin')}
                disabled={loadingRole !== null}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#004AC6] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loadingRole === 'admin' ? <Loader2 size={15} className="animate-spin" /> : <ShieldCheck size={15} />}
                Shared Admin Login (Async)
              </button>
            )}

            <div className="mt-5 space-y-3">
              {ROLE_ACCESS_OPTIONS.map((option) => {
                const Icon = ICON_BY_KEY[option.icon];
                const isLoading = loadingRole === option.role;

                return (
                  <button
                    key={option.role}
                    onClick={() => handleAsyncRoleAccess(option.role, option.path)}
                    disabled={loadingRole !== null}
                    className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-slate-300 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${option.color}1A` }}>
                        {isLoading ? <Loader2 size={16} className="animate-spin" style={{ color: option.color }} /> : <Icon size={16} style={{ color: option.color }} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{option.label}</p>
                        <p className="text-xs text-slate-500">Route: {option.path}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => navigate('/')}
              className="mt-6 w-full rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Back to Home
            </button>
          </section>

          <aside className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#004AC6]">
              <ShieldCheck size={14} />
              Shared Access Info
            </div>

            <h2 className="mt-4 text-xl font-bold text-[#0B1C30]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              Admin Shared Login
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Use this for shared admin preview in local/demo environment.
            </p>

            <div className="mt-5 space-y-4">
              {(Object.entries(SHARED_CREDENTIALS) as [AccessRole, typeof SHARED_CREDENTIALS.admin][]).map(([r, cred]) => (
                <div key={r} className={`rounded-2xl border p-3.5 transition-all ${loadingRole === r ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{r} Credentials</p>
                    {loadingRole === r && <span className="text-[10px] font-bold text-blue-600 animate-pulse">Selected</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[9px] text-slate-400">ID</p>
                      <p className="text-xs font-mono font-semibold text-slate-800 truncate">{cred.id}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400">Password</p>
                      <p className="text-xs font-mono font-semibold text-slate-800 truncate">{cred.password}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-xs font-semibold text-blue-700">Requested Redirect</p>
              <p className="mt-1 text-sm font-semibold text-blue-900">{targetPath}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
