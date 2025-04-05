const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRouter = require('./routes/api');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Permite peticiones desde React
app.use(express.json()); // Para parsear JSON

// Rutas
app.use('/api', apiRouter); // Todas las rutas empiezan con /api

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});