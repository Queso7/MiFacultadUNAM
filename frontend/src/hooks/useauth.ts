export const useAuth = () => {
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');

  if (!token || !userData) return null;

  try {
    return JSON.parse(userData); // debe incluir: { id, name, email }
  } catch {
    return null;
  }
};
