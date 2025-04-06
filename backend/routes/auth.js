import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Usuario mock (datos de prueba en memoria)
const mockUser = {
  id: '1',
  email: 'quierounanovia@gmail.com',
  password: bcrypt.hashSync('password123', 10), // Contraseña: "password123"
  name: 'Usuario de Prueba'
};

// Ruta POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Validar usuario mock
    if (email !== mockUser.email) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    // 2. Validar contraseña mock
    const isMatch = await bcrypt.compare(password, mockUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    // 3. Generar token JWT
    const token = jwt.sign(
      { id: mockUser.id, email: mockUser.email },
      process.env.JWT_SECRET || 'secret_key_development', // Usa una clave por defecto en desarrollo
      { expiresIn: '1h' }
    );

    // 4. Responder con token
    res.json({ 
      success: true,
      token,
      user: {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name
      }
    });

  } catch (error) {
    console.error('Error en auth/login:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

export default router;