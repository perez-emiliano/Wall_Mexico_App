import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Si el usuario no está logueado, redirige automáticamente al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, permite ver la pantalla (children)
  return children;
}