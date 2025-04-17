import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { authenticateToken } from '../middleware/auth.js';




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

  // Asegúrate de que la columna 'Area' exista en la tabla Materiales
  await db.exec(`
  CREATE TABLE IF NOT EXISTS Materiales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  area TEXT,
  materia TEXT,
  profesor TEXT,
  tipo TEXT,
  archivo TEXT,
  fecha TEXT,
  autor TEXT
    );
  `);

  // Si la columna 'Area' no existe, la agregamos
  try {
    await db.exec('ALTER TABLE Materiales ADD COLUMN Area TEXT');
  } catch (error) {
    // Ignorar error si la columna ya existe (porque ALTER TABLE falla si la columna ya está allí)
    if (!error.message.includes('duplicate column name: Area')) {
      console.error('Error al agregar la columna Area:', error);
    }
  }

  console.log('📦 Base de datos SQLite lista en archivosMat.js');
};

initDb(); // Inicializar la base de datos


// ✅ POST para subir archivo
router.post('/', authenticateToken, upload.single('archivo'), async (req, res) => {
  const { nombre, Area, Materia, Profesor, tipoArchivo } = req.body;
  const archivoPath = req.file ? req.file.filename : null;
  const fecha = new Date().toISOString();
  const autor = req.user.email?.slice(0, 9); // ✨ Aquí extraemos los primeros 9 caracteres del email
  

  try {
    await db.run(
      `INSERT INTO Materiales (nombre, Area, Materia, Profesor, Tipo, Archivo, Fecha, autor)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [Area, Materia, Profesor, tipoArchivo, archivoPath, fecha, autor]
    );

    res.json({ message: 'Archivo subido correctamente' });
  } catch (error) {
    console.error('Error al insertar en la base de datos:', error);
    res.status(500).json({ message: 'Error al subir archivo' });
  }
});


// ✅ GET para obtener todos los archivos (o solo los del usuario)
router.get('/', authenticateToken, async (req, res) => {
  const { misArchivos } = req.query;

  try {
    let materiales;
    if (misArchivos === 'true') {
      materiales = await db.all("SELECT * FROM Materiales WHERE autor = ?", [req.user.email]);
    } else {
      materiales = await db.all("SELECT * FROM Materiales");
    }

    res.json(materiales);
  } catch (error) {
    console.error('Error al obtener archivos:', error);
    res.status(500).json({ message: "Error al obtener archivos" });
  }
});

// ✅ DELETE para eliminar un archivo
router.delete('/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  const usuario = req.user.email;

  try {
    const material = await db.get("SELECT * FROM Materiales WHERE id = ?", [id]);
    if (!material || material.autor !== usuario) {
      return res.status(403).json({ message: "No autorizado para eliminar este archivo" });
    }

    // Opcional: eliminar el archivo del sistema si existe
    if (material.Archivo && fs.existsSync(`./uploads/${material.Archivo}`)) {
      fs.unlinkSync(`./uploads/${material.Archivo}`);
    }

    await db.run("DELETE FROM Materiales WHERE id = ?", [id]);
    res.json({ message: "Archivo eliminado" });
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    res.status(500).json({ message: "Error al eliminar archivo" });
  }
});

export default router;
