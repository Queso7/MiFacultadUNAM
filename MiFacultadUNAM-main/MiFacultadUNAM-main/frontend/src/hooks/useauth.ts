import { useNavigate } from 'react-router-dom';

interface UserData {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const navigate = useNavigate();

  const getAuthData = (): { token: string | null; user: UserData | null } => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (!token || !userData) return { token: null, user: null };

    try {
      return { token, user: JSON.parse(userData) };
    } catch {
      return { token: null, user: null };
    }
  };

  const isAuthenticated = () => {
    return !!getAuthData().token;
  };

  const getUser = () => {
    return getAuthData().user;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return { isAuthenticated, getUser, logout };
};