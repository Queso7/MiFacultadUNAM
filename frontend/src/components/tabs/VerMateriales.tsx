import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';

interface Material {
  id: number;
  carrera: string;
  materia: string;
  profesor: string;
  tipo: string;
  archivo: string;
  fecha: string;
}

const VerMateriales: React.FC = () => {
  const [materiales, setMateriales] = useState<Material[]>([]);

  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ArchivosMat');
        const data = await response.json();
        setMateriales(data);
      } catch (error) {
        console.error('Error al obtener materiales:', error);
      }
    };

    fetchMateriales();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">📄 Materiales Subidos</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Carrera</th>
            <th>Materia</th>
            <th>Profesor</th>
            <th>Tipo</th>
            <th>Archivo</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {materiales.map((mat) => (
            <tr key={mat.id}>
              <td>{mat.id}</td>
              <td>{mat.carrera}</td>
              <td>{mat.materia}</td>
              <td>{mat.profesor}</td>
              <td>{mat.tipo}</td>
              <td>
                <a href={`http://localhost:5000/${mat.archivo}`} target="_blank" rel="noopener noreferrer">
                  Ver archivo
                </a>
              </td>
              <td>{new Date(mat.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default VerMateriales;
