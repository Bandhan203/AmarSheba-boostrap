import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const WebNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Services', path: '/services' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Become a Pro', path: '/become-provider' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-6 md:px-12">
        <button
          onClick={() => navigate('/')}
          className="text-[22px] font-extrabold tracking-tight"
          style={{ color: '#2563EB', fontFamily: 'Manrope, Inter, sans-serif' }}
        >
          AmarSheba
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`pb-1 text-[13px] font-medium transition-colors ${
                isActive(link.path)
                  ? 'border-b-2 border-[#2563EB] text-[#2563EB]'
                  : 'text-slate-500 hover:text-[#2563EB]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <button onClick={() => navigate('/auth')} className="text-sm text-slate-500 transition-colors hover:text-[#2563EB]">
            Login
          </button>
          <button
            onClick={() => navigate('/find')}
            className="rounded-lg bg-[#004AC6] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Book a Service
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => navigate('/find')}
            className="rounded-lg bg-[#004AC6] px-3 py-2 text-xs font-semibold text-white"
          >
            Book
          </button>
          <button
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <div className="mb-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileOpen(false);
                }}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-4">
            <button
              onClick={() => {
                navigate('/auth');
                setMobileOpen(false);
              }}
              className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};