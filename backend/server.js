import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js'; // Asegúrate que api.js exista
import sosRoutes from './routes/sos.js'; // Usa import y pon extensión .js
import ArchivosMatRoutes from './routes/ArchivosMat.js';//queso porfavor dime que tu psuste eso, si eso es un si, una disculpa

import authRoutes from './routes/auth.js';

import { authenticateToken } from './middleware/auth.js';

import materialesRouter from './routes/ArchivosMat.js';





//ver tablitas materiales
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Necesario para usar __dirname con ESModules (porque estás usando "import" en lugar de "require")
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



//terminar de ver tablitas materiales
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Ya está importado arriba, úsalo directo



// Middlewares
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Para parsear FormData
// Rutas
app.use('/api', apiRouter);
app.use('/api/sos', sosRoutes);
//app.use('/api/archivosMat', ArchivosMatRoutes);
app.use('/api/materiales', ArchivosMatRoutes);



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes);


app.get('/api/materiales/:id', (req, res) => {
  const { id } = req.params;
  const material = materiales.find(m => m.id == id);
  if (material) {
    res.json(material);
  } else {
    res.status(404).json({ message: 'Material no encontrado' });
  }
});


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

