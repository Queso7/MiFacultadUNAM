import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Estilos con styled-components
const RegistroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const RegistroForm = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  color: #555;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const RegistroU = () => {
  const [form, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@pcpuma.acatlan.unam.mx$/;
    if (!emailRegex.test(form.email)) {
      alert("El correo electrónico debe ser del dominio @pcpuma.acatlan.unam.mx");
      return;
    }

    const usernameFromEmail = form.email.split('@')[0].slice(0, 9);

    // Creamos una nueva variable para enviar al backend con el username
    const formToSend = {
      ...form,
      username: usernameFromEmail
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <RegistroContainer>
      <RegistroForm onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>
        <FormGroup>
          <Label htmlFor="email">Correo Electrónico:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Contraseña:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Registrar</SubmitButton>
      </RegistroForm>
    </RegistroContainer>
  );
};

export default RegistroU;
