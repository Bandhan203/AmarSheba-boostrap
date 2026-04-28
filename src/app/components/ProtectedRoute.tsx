import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRole, useApp } from '../context/AppContext';

interface ProtectedRouteProps {
  allow: AppRole[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({ allow, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { role } = useApp();

  if (role === 'guest') {
    return <Navigate to={`/access?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!allow.includes(role)) {
    return <Navigate to={`/unauthorized?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return <>{children}</>;
};
