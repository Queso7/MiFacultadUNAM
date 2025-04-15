import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import multer from 'multer';
import path from 'path';
import fs from 'fs';

const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

let db;

// Inicializa la base de datos
const initDb = async () => {
  db = await open({
    filename: './Matdata.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Materiales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Area TEXT,
      Materia TEXT,
      Profesor TEXT,
      Tipo TEXT,
      Archivo TEXT,
      Fecha TEXT
    );
  `);
  

  console.log('📦 Base de datos SQLite lista en archivosMat.js');
};

initDb(); // <-- Muy importante: llama a la función para iniciar la DB

router.post('/', upload.single('archivo'), async (req, res) => {
    console.log("Solicitud recibida:", req.body); 
    console.log("Archivo recibido:", req.file);
  
    const { Area, Materia, Profesor, tipoArchivo } = req.body;
    const archivoPath = req.file ? req.file.path : null;
    const fecha = new Date().toISOString();
  
    try {
      await db.run(
        `INSERT INTO Materiales (Area, Materia, Profesor, Tipo, Archivo, Fecha)
         VALUES (?, ?, ?, ?, ?, ?)`, 
        [Area, Materia, Profesor, tipoArchivo, archivoPath, fecha]
      );
        
      res.json({ message: 'Archivo subido correctamente' });
    } catch (error) {
      console.error('Error al insertar en la base de datos:', error);
      res.status(500).json({ message: 'Error al subir archivo' });
    }
  });
  
  // ✅ GET para obtener todos los archivos
  router.get('/', async (req, res) => {
    try {
      const materiales = await db.all("SELECT * FROM Materiales");
      res.json(materiales);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener archivos" });
    }
  });

export default router;