import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Verificación directa del token en localStorage
  const isAuthenticated = !!localStorage.getItem('authToken');
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;