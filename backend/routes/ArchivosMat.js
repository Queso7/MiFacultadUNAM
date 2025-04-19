import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticateToken } from '../middleware/auth.js';

const __dirname = path.resolve(); // Solo si usas ES modules
const dbPath = path.resolve(__dirname, './database/app.db'); // Usamos una sola base de datos

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

// Inicializa la base de datos
let db;
const initDb = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // Asegúrate de que la tabla Materiales existe
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
      autor TEXT,
      tema TEXT
    );
  `);

  console.log('📦 Base de datos SQLite lista');
};

initDb(); // Inicializar la base de datos

// ✅ POST para subir archivo
router.post('/', authenticateToken, upload.single('archivo'), async (req, res) => {
  const { Area, Materia, Profesor, tipoArchivo, tema } = req.body;

  const archivoPath = req.file ? req.file.filename : null;
  const fecha = new Date().toISOString();
  const autor = req.user.email.split('@')[0];

  try {
    const nombreGenerado = `${Materia} - ${autor}`;
    
    await db.run(
      `INSERT INTO Materiales (Area, Materia, Profesor, tipo, archivo, fecha, autor, tema)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [Area, Materia, Profesor, tipoArchivo, archivoPath, fecha, autor, tema]
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
      const username = req.user.email.split('@')[0];
    
      materiales = await db.all(`
        SELECT m.id, u.username AS Usuario, u.email, m.area, m.materia, m.profesor, m.tipo, m.archivo, m.fecha, m.autor, m.tema
        FROM Materiales m
        LEFT JOIN users u ON m.autor = u.username
        WHERE m.autor = ?
      `, [username]);
    } else {
      materiales = await db.all(`
        SELECT m.*, u.email
        FROM Materiales m
        JOIN users u ON m.autor = u.username
      `);
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
  const autor = req.user.email.substring(0, 9); // Ajuste aquí

  try {
    const material = await db.get("SELECT * FROM Materiales WHERE id = ?", [id]);

    if (!material || material.autor !== autor) {
      return res.status(403).json({ message: "No autorizado para eliminar este archivo" });
    }

    if (material.archivo && fs.existsSync(`./uploads/${material.archivo}`)) {
      fs.unlinkSync(`./uploads/${material.archivo}`);
    }

    await db.run("DELETE FROM Materiales WHERE id = ?", [id]);
    res.json({ message: "Archivo eliminado" });
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    res.status(500).json({ message: "Error al eliminar archivo" });
  }
});


// ✅ Obtener un archivo por id
router.get('/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  console.log("Email del usuario:", req.user.email);  // Verifica si se está obteniendo correctamente

  try {
    const materiales = await db.all(
      `SELECT m.*, u.email
       FROM Materiales m
       JOIN users u ON u.username = m.autor
       WHERE m.id = ? AND u.email = ?`,
      [id, req.user.email]
    );

    res.json(materiales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el material' });
  }
});


// ✅ PUT para modificar un archivo
router.put('/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  const usuario = req.user.email.split('@')[0];

  const { area, materia, profesor, tipo } = req.body;

  try {
    const material = await db.get("SELECT * FROM Materiales WHERE id = ?", [id]);
    if (!material) {
      return res.status(404).json({ message: "Material no encontrado" });
    }

    await db.run(
      `UPDATE Materiales
       SET Area = ?, Materia = ?, Profesor = ?, Tipo = ?
       WHERE id = ?`,
      [area, materia, profesor, tipo, id]
    );

    res.json({ message: "Archivo actualizado correctamente" });
  } catch (error) {
    console.error('Error al actualizar material:', error);
    res.status(500).json({ message: "Error al actualizar el material" });
  }
});

export default router;
