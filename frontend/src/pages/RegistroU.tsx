import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f7fafc",
  },
  form: {
    maxWidth: "400px",
    width: "100%",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    textAlign: "center",
  },
  title: {
    color: "#2d3748",
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: "1.5rem",
  },
  group: {
    marginBottom: "1.25rem",
    textAlign: "left",
  },
  label: {
    display: "block",
    color: "#4a5568",
    fontSize: "0.875rem",
    fontWeight: 500,
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "1rem",
    color: "#1a202c",
    transition: "border-color 0.2s",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#4299e1",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    marginTop: "1rem",
    transition: "background-color 0.2s",
  },
  buttonHover: {
    backgroundColor: "#3182ce",
  },
  loginLink: {
    display: "block",
    textAlign: "center",
    marginTop: "1.5rem",
    color: "#718096",
    fontSize: "0.875rem",
  },
  loginAnchor: {
    color: "#4299e1",
    textDecoration: "none",
    fontWeight: 500,
  },
};

const RegistroU = () => {
  const [form, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@pcpuma.acatlan.unam.mx$/;
    if (!emailRegex.test(form.email)) {
      alert("El correo electrónico debe ser del dominio @pcpuma.acatlan.unam.mx");
      return;
    }

    const usernameFromEmail = form.email.split("@")[0].slice(0, 9);

    const formToSend = {
      ...form,
      username: usernameFromEmail,
    };

    try {
      await axios.post("http://localhost:5000/api/auth/register", formToSend);
      alert("Usuario registrado con éxito");
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Error en el registro");
      } else {
        alert("Error inesperado");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Registro de Usuario</h2>

        <div style={styles.group}>
          <label style={styles.label} htmlFor="email">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label} htmlFor="password">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(hover ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Registrar
        </button>

        <div style={styles.loginLink}>
          ¿Ya tienes cuenta?{" "}
          <a href="/login" style={styles.loginAnchor}>
            Inicia sesión
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegistroU;
