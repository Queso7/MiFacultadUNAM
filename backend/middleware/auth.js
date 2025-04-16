import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  

    console.log('Token recibido:', token); // Para depuración
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  console.log('Token recibido:', token); // Para depurar el token

  jwt.verify(token, process.env.JWT_SECRET || 'secret_key_development', (err, user) => {
    if (err) {
      console.log('Error en la validación del token:', err);
      return res.status(403).json({ message: 'Token inválido' });
    }
  
    req.user = user; // ✅ Ahora sí se asigna cuando el token es válido
    next(); // Continúa con la solicitud
  });
};
