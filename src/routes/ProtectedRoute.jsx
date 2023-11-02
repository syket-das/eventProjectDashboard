import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setUser = useUserStore((state) => state.setUser);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setUser();
    }
  }, [token]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
