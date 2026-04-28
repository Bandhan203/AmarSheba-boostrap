import { ClipboardList, Home, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { label: 'Home', path: '/resource-app', icon: Home },
  { label: 'Assignments', path: '/resource/assignments', icon: ClipboardList },
  { label: 'Profile', path: '/resource/profile', icon: User },
];

export const ResourceBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-[60px] border-t border-gray-100 bg-white flex items-center">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex-1 h-full flex flex-col items-center justify-center gap-1"
          >
            <Icon size={18} style={{ color: active ? '#FF9800' : '#9CA3AF' }} />
            <span className="text-[10px]" style={{ color: active ? '#FF9800' : '#9CA3AF' }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
