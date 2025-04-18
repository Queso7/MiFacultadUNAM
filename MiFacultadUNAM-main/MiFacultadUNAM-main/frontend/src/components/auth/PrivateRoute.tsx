import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem('authToken');
  
  console.log('TOKEN DETECTADO EN PRIVATE ROUTE:', token);
  
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;