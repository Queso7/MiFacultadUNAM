import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js'; // Asegúrate que api.js exista
import sosRoutes from './routes/sos.js'; // Usa import y pon extensión .js

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', apiRouter);
app.use('/api/sos', sosRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Servidor backend funcionando correctamente 🚀');
});

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

