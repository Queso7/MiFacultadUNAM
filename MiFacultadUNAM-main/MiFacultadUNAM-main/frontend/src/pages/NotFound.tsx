import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>404</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        Página no encontrada
      </p>
      <Link 
        to="/" 
        style={{
          padding: '10px 20px',
          background: '#000',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;