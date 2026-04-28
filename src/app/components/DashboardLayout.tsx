import {
  Bell,
  ChevronLeft,
  LogOut,
  Menu,
  X,
  LucideIcon
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, createContext, useContext, ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/* ─── Types ────────────────────────────────────────────────── */
export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
}

interface DashboardLayoutProps {
  children?: ReactNode;
  navItems: NavItem[];
  activeNav: string;
  setActiveNav: (id: string) => void;
  title: string;
  subtitle?: string;
  sidebarGradient?: string;
}

interface DashboardCtx {
  activeNav: string;
  setActiveNav: (id: string) => void;
}
const DashboardContext = createContext<DashboardCtx>({ activeNav: 'dashboard', setActiveNav: () => {} });
export const useDashboard = () => useContext(DashboardContext);

/* ─── Sidebar Item ─────────────────────────────────────────── */
const SidebarItem = ({
  item,
  collapsed,
  active,
  onClick,
}: {
  item: NavItem;
  collapsed: boolean;
  active: boolean;
  onClick: () => void;
}) => {
  const Icon = item.icon;
  return (
    <motion.button
      whileHover={{ x: collapsed ? 0 : 4, backgroundColor: active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      style={{
        backgroundColor: active ? 'rgba(255,255,255,0.18)' : 'transparent',
        color: active ? 'white' : 'rgba(255,255,255,0.62)',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}
      title={collapsed ? item.label : undefined}
    >
      <Icon size={18} className="flex-shrink-0" />
      {!collapsed && (
        <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
      )}
      {item.badge && !collapsed && (
        <span className="ml-auto bg-orange-400 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none">
          {item.badge}
        </span>
      )}
      {item.badge && collapsed && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full" />
      )}
    </motion.button>
  );
};

/* ─── Main Layout Component ────────────────────────────────── */
export const DashboardLayout = ({
  children,
  navItems,
  activeNav,
  setActiveNav,
  title,
  sidebarGradient
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { role, signOut } = useApp();
  
  const defaultGradient = useMemo(() => {
    if (role === 'admin') return 'linear-gradient(165deg, var(--color-navy-900) 0%, var(--color-navy-800) 100%)';
    if (role === 'provider') return 'linear-gradient(165deg, #1B5E20 0%, #113D15 100%)';
    if (role === 'customer') return 'linear-gradient(165deg, #1E88E5 0%, #1565C0 100%)';
    if (role === 'resource') return 'linear-gradient(165deg, #B86809 0%, #8A4E07 100%)';
    return 'linear-gradient(165deg, #334155 0%, #1e293b 100%)';
  }, [role]);

  const activeGradient = sidebarGradient || defaultGradient;
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const today = useMemo(() => new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }), []);

  const activeLabel = useMemo(() =>
    navItems.find(n => n.id === activeNav)?.label ?? activeNav
  , [navItems, activeNav]);

  const userInitials = useMemo(() => {
    if (role === 'admin') return 'SA';
    if (role === 'provider') return 'RA';
    if (role === 'customer') return 'CU';
    return 'RE';
  }, [role]);

  const userName = useMemo(() => {
    if (role === 'admin') return 'Super Admin';
    if (role === 'provider') return 'Ruksana Akter';
    if (role === 'customer') return 'Nusrat Jahan';
    return 'Arif Hossain';
  }, [role]);

  const userSub = useMemo(() => {
    if (role === 'admin') return 'admin@amarsheba.com';
    if (role === 'provider') return 'Verified Provider';
    if (role === 'customer') return 'Premium Member';
    return 'Field Technician';
  }, [role]);

  return (
    <DashboardContext.Provider value={{ activeNav, setActiveNav }}>
      <div className="flex min-h-screen bg-[#F0F4FF]" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 224 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex flex-col flex-shrink-0 min-h-screen relative"
        style={{ background: activeGradient }}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 overflow-hidden min-h-[68px]">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow flex-shrink-0">
            <span className="text-lg leading-none">🏠</span>
          </div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
              <h1 className="text-white font-bold text-base leading-tight whitespace-nowrap">AmarSheba</h1>
              <p className="text-blue-200 text-[10px] whitespace-nowrap">{title}</p>
            </motion.div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto">
          {navItems.map(item => (
            <SidebarItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              active={activeNav === item.id}
              onClick={() => setActiveNav(item.id)}
            />
          ))}
        </nav>

        {/* User Profile */}
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 border-t border-white/10">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-[#FF9800] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {userInitials}
              </div>
              <div className="overflow-hidden">
                <p className="text-white text-xs font-semibold whitespace-nowrap">{userName}</p>
                <p className="text-blue-200 text-[10px] whitespace-nowrap truncate">{userSub}</p>
              </div>
            </div>
            <button
              onClick={() => { signOut(); navigate('/'); }}
              className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-xs"
            >
              <LogOut size={13} /> Logout
            </button>
          </motion.div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-20 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors border border-gray-100 z-10"
        >
          <motion.span animate={{ rotate: collapsed ? 180 : 0 }}>
            <ChevronLeft size={14} />
          </motion.span>
        </button>
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 flex flex-col lg:hidden"
              style={{ background: activeGradient }}
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between min-h-[68px]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow">
                    <span className="text-lg leading-none">🏠</span>
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-base leading-tight">AmarSheba</h1>
                    <p className="text-blue-200 text-[10px]">{title}</p>
                  </div>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="text-white/60 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 p-3 overflow-y-auto">
                {navItems.map(item => (
                  <SidebarItem
                    key={item.id}
                    item={item}
                    collapsed={false}
                    active={activeNav === item.id}
                    onClick={() => { setActiveNav(item.id); setDrawerOpen(false); }}
                  />
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 sm:px-6 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600"
            >
              <Menu size={18} />
            </button>
            <div>
              <h2 className="font-bold text-gray-900 text-base sm:text-lg capitalize leading-tight">{activeLabel}</h2>
              <p className="text-gray-400 text-[11px] hidden sm:block">{today}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
              <Bell size={17} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2.5 py-1.5">
              <div className="w-7 h-7 bg-[#1E88E5] rounded-full flex items-center justify-center text-white text-xs font-bold">
                {userInitials}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{userName}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
    </DashboardContext.Provider>
  );
};
