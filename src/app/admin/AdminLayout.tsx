import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { ADMIN_NAV_ITEMS } from '../data/frontendContracts';

/* ─── Sub-Components ─────────────────────────────────────── */
import { AdminDashboardContent } from './AdminDashboardContent';
import { AdminUsersContent } from './AdminUsersContent';
import { 
  AdminVerification, 
  AdminBookings, 
  AdminFinancials, 
  AdminSettings 
} from './AdminContent';

export const AdminLayout = () => {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':    return <AdminDashboardContent />;
      case 'users':        return <AdminUsersContent />;
      case 'bookings':     return <AdminBookings />;
      case 'verification': return <AdminVerification />;
      case 'analytics':    return <AdminFinancials />;
      case 'settings':     return <AdminSettings />;
      default:             return <AdminDashboardContent />;
    }
  };

  return (
    <DashboardLayout
      navItems={ADMIN_NAV_ITEMS}
      activeNav={activeNav}
      setActiveNav={setActiveNav}
      title="Admin Panel"
    >
      {renderContent()}
    </DashboardLayout>
  );
};
