import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const router = express.Router();

let db;

// Inicializa la base de datos
const initDb = async () => {
  db = await open({
    filename: './sosdata.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS sos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numeroCuenta TEXT,
      ubicacion TEXT,
      telefono TEXT,
      emergencia TEXT,
      fecha TEXT
    );
  `);
  console.log('📦 Base de datos SQLite lista en sos.js');
};

initDb(); // Ejecuta al cargar el archivo

// Ruta POST para guardar solicitud SOS
router.post('/', async (req, res) => {
  const { numeroCuenta, ubicacion, telefono, emergencia } = req.body;
  const fecha = new Date().toISOString();

  try {
    await db.run(
      `INSERT INTO sos (numeroCuenta, ubicacion, telefono, emergencia, fecha)
       VALUES (?, ?, ?, ?, ?)`,
      [numeroCuenta, ubicacion, telefono, emergencia, fecha]
    );
    res.status(200).json({ message: '🚨 Solicitud de ayuda guardada con éxito' });
  } catch (err) {
    console.error('❌ Error al guardar la solicitud:', err);
    res.status(500).json({ message: 'Error al guardar la solicitud' });
  }
});

router.get('/', async (req, res) => {
    try {
      const rows = await db.all('SELECT * FROM sos');
      res.json(rows);
    } catch (err) {
      console.error('❌ Error al obtener solicitudes:', err);
      res.status(500).json({ message: 'Error al obtener datos' });
    }
  });
  

export default router;
