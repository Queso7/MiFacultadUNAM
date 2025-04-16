import { Col, Container, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import '../App.css';

const AgregarRegistroMaterial: React.FC = () => {
  const [Area, setArea] = useState('');
  const [Materia, setMateria] = useState('');
  const [Profesor, setProfesor] = useState('');
  const [tipoArchivo, setTipoArchivo] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!archivo) {
      alert("Por favor selecciona un archivo para subir.");
      return;
    }
  
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("No estás autenticado. Por favor inicia sesión.");
      return;
    }
  
    const formData = new FormData();
    formData.append("Area", Area);
    formData.append("Materia", Materia);
    formData.append("Profesor", Profesor);
    formData.append("tipoArchivo", tipoArchivo);
    formData.append("archivo", archivo);
  
    try {
      const response = await fetch("http://localhost:5000/api/archivosMat", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al subir el archivo');
      }
  
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      alert("Error al enviar la solicitud");
      console.error(error);
    }
  };
  

  return (
    <main className="Agregar-registros">
      <h2 className="text-center my-4">📚 Cooperación Estudiantil</h2>

      <Container fluid="md">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded-4 border bg-light">

              <div className="mb-3">
                <label className="form-label fw-bold">Area</label>
                    <select
                        value={Area}
                        onChange={(e) => setArea(e.target.value)}
                        className="form-control carrera-scroll"
                        required
                        >
                        <option value="Area">Area</option>
                        <option value="Matematicas">Matematica</option>
                        <option value="Ingenieria">Ingenieria</option>
                        <option value="Ciencias Computacionales">Ciencias Computacionales</option>
                        <option value="Ciencias Sociales">Ciencias Sociales</option>
                        <option value="Humanidades">Humanidades</option>
                    </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Materia</label>
                <input
                  type="text"
                  className="form-control"
                  value={Materia}
                  onChange={(e) => setMateria(e.target.value)}
                  placeholder="Nombre de la materia"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Profesor</label>
                <input
                  type="text"
                  className="form-control"
                  value={Profesor}
                  onChange={(e) => setProfesor(e.target.value)}
                  placeholder="Nombre del profesor"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Tipo de archivo</label>
                <select value={tipoArchivo} onChange={(e) => setTipoArchivo(e.target.value)} className="form-control" required>
                  <option value="">¿Tu archivo es...?</option>
                  <option value="Examen">Examen</option>
                  <option value="Guia Oficial">Guía oficial brindada por el profesor</option>
                  <option value="Guia No Oficial">Guía no oficial (alumno)</option>
                  <option value="Formulario">Formulario</option>
                  <option value="Libro">Libro</option>
                  <option value="Video">Video</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Seleccionar archivo</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setArchivo(e.target.files?.[0] || null)}
                  required
                />
                {archivo && (
                  <p className="mt-2 text-muted">Archivo seleccionado: {archivo.name}</p>
                )}
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary py-3 fw-bold fs-5"
                >
                  🚀 Subir material
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AgregarRegistroMaterial;
