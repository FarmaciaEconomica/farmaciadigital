import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Protege rotas que exigem usuário admin.
 * Redireciona para /AdminLogin se não autenticado ou não for admin.
 */
export default function ProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/AdminLogin" state={{ from: location.pathname }} replace />;
  }

  return children;
}
