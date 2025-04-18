import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Ayuda: React.FC = () => {
  const recursos = [
    { 
      id: 1, 
      nombre: "Tutorías", 
      icon: "📚", 
      desc: "Sesiones personalizadas con tutores certificados",
      link: "/ayuda/tutorias" 
    },
    { 
      id: 2, 
      nombre: "Asesorías", 
      icon: "✏️", 
      desc: "Ayuda directa de profesores y alumnos avanzados",
      link: "/ayuda/asesorias" 
    },
    { 
      id: 3, 
      nombre: "Material", 
      icon: "📁", 
      desc: "Biblioteca digital con recursos de estudio",
      link: "/ayuda/material"
    }
  ];

  return (
    <main className="ayuda-page">
      <h2 className="text-center mb-4">Ayuda Académica</h2>
      <div className="recursos-grid">
        {recursos.map((recurso) => (
          <Link 
            to={recurso.link} 
            key={recurso.id} 
            className="recurso-card link-offset-2 link-underline link-underline-opacity-0"
          >
            <span className="icon">{recurso.icon}</span>
            <h3>{recurso.nombre}</h3>
            <p className="text-muted">{recurso.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Ayuda;