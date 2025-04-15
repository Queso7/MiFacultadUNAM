// models/user.js
import bcrypt from 'bcryptjs';
import db from './db.js';

// Función para registrar un nuevo usuario
export const registerUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      const stmt = db.prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
      stmt.run(username, email, hashedPassword, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, username, email });
        }
      });
      stmt.finalize();
    });
  } catch (err) {
    throw err;
  }
};

// Función para encontrar un usuario por su correo
export const findUserByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};
