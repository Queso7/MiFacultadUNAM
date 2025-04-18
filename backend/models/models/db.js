import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.resolve(__dirname, '../../database/app.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  db.run(`
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
      tema TEXT,
      FOREIGN KEY (autor) REFERENCES users(username)
    );
  `);
});

export default db;
