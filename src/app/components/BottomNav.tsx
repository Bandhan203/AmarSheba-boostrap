import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CalendarDays, User, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

const tabs = [
  { label: 'Home', labelBn: 'হোম', icon: Home, path: '/home' },
  { label: 'Bookings', labelBn: 'বুকিং', icon: CalendarDays, path: '/bookings' },
  { label: 'Profile', labelBn: 'প্রোফাইল', icon: User, path: '/profile' },
  { label: 'More', labelBn: 'আরও', icon: MoreHorizontal, path: '/more' },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useApp();

  return (
    <div
      className="flex-shrink-0 bg-white border-t border-gray-100 shadow-lg z-40"
      style={{ height: 60 }}
    >
      <div className="flex items-center h-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = location.pathname === tab.path || (tab.path === '/home' && location.pathname === '/');
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full relative"
            >
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full" style={{ backgroundColor: '#1E88E5' }} />
              )}
              <Icon
                size={20}
                style={{ color: active ? '#1E88E5' : '#9CA3AF' }}
                strokeWidth={active ? 2.5 : 2}
              />
              <span
                className="text-[10px]"
                style={{ color: active ? '#1E88E5' : '#9CA3AF', fontWeight: active ? 600 : 400 }}
              >
                {language === 'bn' ? tab.labelBn : tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
