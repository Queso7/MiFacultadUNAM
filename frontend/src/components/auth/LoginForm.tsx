import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../auth/AuthStyles.css';

// Tipos para TypeScript
interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginForm = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validación del email
    if (!/^\S+@\S+\.\S+$/.test(credentials.email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    // Validación de contraseña
    if (credentials.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      
      // Conexión con el endpoint de autenticación
      const { data } = await axios.post<AuthResponse>(
        'http://localhost:5000/api/auth/login', 
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Guardar token y datos de usuario
      localStorage.setItem('authToken', data.token);
      if (data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user));
      }
      
      // Redirección post-login
      navigate(from);
      
    } catch (err: unknown) {
      // Manejo seguro de errores
      let errorMessage = 'Error al iniciar sesión. Intenta nuevamente.';
      
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Inicio de Sesión</h2>
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({
              ...credentials, 
              email: e.target.value.trim() // Limpieza del input
            })}
            placeholder="usuario@ejemplo.com"
            required
            disabled={loading}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({
              ...credentials, 
              password: e.target.value
            })}
            placeholder="••••••••"
            required
            disabled={loading}
            minLength={6}
            autoComplete="current-password"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`auth-button ${loading ? 'loading' : ''}`}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              <span>Ingresando...</span>
            </>
          ) : 'Ingresar'}
        </button>
      </form>

      <div className="auth-links">
        <a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>
        <a href="/registro">Crear una cuenta nueva</a>
      </div>
    </div>
  );
};

export default LoginForm;