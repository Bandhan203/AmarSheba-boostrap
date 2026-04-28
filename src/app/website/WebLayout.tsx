import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { WebNavbar } from './WebNavbar';
import { WebFooter } from './WebFooter';

export const WebLayout = () => {
  const { pathname } = useLocation();
  
  // Routes where we don't want the global website header/footer
  const isDashboard = pathname.startsWith('/dashboard') || 
                      pathname.startsWith('/admin') || 
                      pathname.startsWith('/provider-app') || 
                      pathname.startsWith('/resource-app') ||
                      pathname.startsWith('/booking-tracking');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: isDashboard ? '#F0F4FF' : '#F5F7FA' }}>
      {!isDashboard && <WebNavbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isDashboard && <WebFooter />}
    </div>
  );
};
