import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';


//esto lo hice a chat y rapido

interface Material {
  id: number;
  nombreArchivo: string;
  rutaArchivo: string;
}

const PanelMateriales: React.FC = () => {
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMisMateriales = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      const response = await fetch("http://localhost:5000/api/materiales?misArchivos=true", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setMateriales(data);
    } catch (error) {
      console.error("Error al obtener materiales:", error);
      alert("No se pudieron cargar los materiales.");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id: number) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este archivo?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`http://localhost:5000/api/materiales/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      alert("Archivo eliminado correctamente.");
      fetchMisMateriales(); // Recargar la lista
    } catch (error) {
      console.error("Error al eliminar archivo:", error);
      alert("Error al eliminar el archivo.");
    }
  };

  useEffect(() => {
    fetchMisMateriales();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">📁 Mis Archivos Subidos</h2>

      {loading ? (
        <p>Cargando archivos...</p>
      ) : materiales.length === 0 ? (
        <p>No has subido ningún archivo aún.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ruta</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {materiales.map((mat) => (
              <tr key={mat.id}>
                <td>{mat.nombreArchivo}</td>
                <td>
                  <a href={`http://localhost:5000/${mat.rutaArchivo}`} target="_blank" rel="noopener noreferrer">
                    Ver archivo
                  </a>
                </td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleEliminar(mat.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default PanelMateriales;
