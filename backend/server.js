import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js'; // Asegúrate de usar .js al importar

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', apiRouter); // Correcto ahora

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
