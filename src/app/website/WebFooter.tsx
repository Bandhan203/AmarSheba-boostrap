import { ArrowRight, BriefcaseBusiness, Facebook, Globe, Shield, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WebFooter = () => {
  const navigate = useNavigate();

  const companyLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Contact Support', path: '/contact' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
  ];

  const serviceLinks = [
    { label: 'Plumbing', path: '/services?cat=plumber' },
    { label: 'Electrical', path: '/services?cat=electrician' },
    { label: 'Cleaning', path: '/services?cat=maid' },
  ];

  return (
    <footer className="border-t border-slate-200 bg-[#F6F8FC]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <button onClick={() => navigate('/')} className="mb-4 text-xl font-bold text-slate-900">
              AmarSheba
            </button>
            <p className="mb-6 text-sm leading-relaxed text-slate-500">
              Your trusted home service partner for a better lifestyle.
            </p>
            <div className="flex gap-3">
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition hover:bg-blue-500 hover:text-white">
                <Facebook size={14} />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition hover:bg-blue-500 hover:text-white">
                <Globe size={14} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-slate-800">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-slate-800">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-slate-200 pt-3">
              {[
                { label: 'Customer App', path: '/splash', icon: Smartphone },
                { label: 'Provider App', path: '/provider-app', icon: BriefcaseBusiness },
                { label: 'Technician App', path: '/resource-app', icon: BriefcaseBusiness },
                { label: 'Admin Panel', path: '/admin', icon: Shield },
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="mb-2 flex items-center gap-2 text-xs text-slate-500 transition hover:text-blue-600"
                >
                  <item.icon size={12} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-slate-800">Newsletter</h4>
            <p className="mb-3 text-xs text-slate-500">Subscribe for updates and offers.</p>
            <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-white">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2.5 text-sm text-slate-700 outline-none"
              />
              <button className="bg-[#004AC6] px-3 text-white">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-400">
        © 2026 AmarSheba. Your trusted home service partner.
      </div>
    </footer>
  );
};