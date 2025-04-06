import React from 'react';
import '../App.css'; // Asegúrate de importar los estilos

const Ayuda: React.FC = () => {
  const recursos = [
    { id: 1, nombre: "Tutorías", icon: "📚", desc: "Sesiones personalizadas con tutores certificados" },
    { id: 2, nombre: "Asesorías", icon: "✏️", desc: "Ayuda directa de profesores y alumnos avanzados" },
    { id: 3, nombre: "Material", icon: "📁", desc: "Biblioteca digital con recursos de estudio" }
  ];

  return (
    <main className="ayuda-page">
      <h2 className="text-center mb-4">Ayuda Académica</h2>
      <div className="recursos-grid">
        {recursos.map((recurso) => (
          <div key={recurso.id} className="recurso-card">
            <span className="icon">{recurso.icon}</span>
            <h3>{recurso.nombre}</h3>
            <p className="text-muted">{recurso.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Ayuda;