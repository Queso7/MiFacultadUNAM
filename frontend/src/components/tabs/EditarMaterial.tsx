import { Col, Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../App.css';

const EditarMaterial: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [Area, setArea] = useState('');
  const [Materia, setMateria] = useState('');
  const [Profesor, setProfesor] = useState('');
  const [tipoArchivo, setTipoArchivo] = useState('');
  const [tema, setTema] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarMaterial = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("No estás autenticado. Por favor inicia sesión.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/materiales/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok || data.length === 0) {
          throw new Error("Material no encontrado");
        }

        const m = data[0];
        setArea(m.area);
        setMateria(m.materia);
        setProfesor(m.profesor);
        setTipoArchivo(m.tipo);
        setTema(m.tema);
      } catch (error) {
        alert("Error al cargar el material");
        console.error(error);
      }
    };

    cargarMaterial();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("No estás autenticado. Por favor inicia sesión.");
      return;
    }

    const formData = {
      area: Area,
      materia: Materia,
      profesor: Profesor,
      tipo: tipoArchivo,
      tema: tema,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/materiales/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al actualizar");
      }

      setMensaje("✅ ¡Material actualizado correctamente!");
      setTimeout(() => navigate("/perfil"), 1500);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al actualizar el material");
    }
  };

  return (
    <main className="Agregar-registros">
      <h2 className="text-center my-4">✏️ Editar Material</h2>

      <Container fluid="md">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <form
              onSubmit={handleSubmit}
              className="shadow-lg p-4 rounded-4 border bg-light"
            >
              <div className="mb-3">
                <label className="form-label fw-bold">Área</label>
                <select
                  value={Area}
                  onChange={(e) => setArea(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Seleccione el área de conocimientos
                  </option>
                  <option value="Matematicas">Matemática</option>
                  <option value="Ingenieria">Ingeniería</option>
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
                <select
                  value={tipoArchivo}
                  onChange={(e) => setTipoArchivo(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="">¿Tu archivo es...?</option>
                  <option value="Examen">Examen</option>
                  <option value="Guia Oficial">Guía oficial</option>
                  <option value="Guia No Oficial">Guía no oficial</option>
                  <option value="Formulario">Formulario</option>
                  <option value="Libro">Libro</option>
                  <option value="Video">Video</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Tema</label>
                <input
                  type="text"
                  className="form-control"
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  placeholder="Tema o nombre del archivo"
                  required
                />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-success py-3 fw-bold fs-5"
                >
                  💾 Guardar cambios
                </button>
              </div>

              {mensaje && (
                <p className="text-center mt-3 fw-bold text-primary">
                  {mensaje}
                </p>
              )}
            </form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default EditarMaterial;
