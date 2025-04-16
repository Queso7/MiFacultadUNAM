// src/routes/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
  }
  

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem('token');

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
