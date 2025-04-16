// src/hooks/useAuth.ts
export const useAuth = () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
  
    if (!token || !userData) return null;
  
    try {
      return JSON.parse(userData); // { id, name, email }
    } catch {
      return null;
    }
  };
  