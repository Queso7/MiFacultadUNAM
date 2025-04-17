import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useauth';
import { Link } from 'react-router-dom';

interface Material {
  id: number;
  nombre: string;
  archivo: string;
  usuario: string;
  area?: string;
  materia?: string;
  profesor?: string;
  tipo?: string;
  fecha?: string;
}

const VerMateriales: React.FC = () => {
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [error, setError] = useState<string | null>(null);
  const user = useAuth();

  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/materiales', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMateriales(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error('Error al obtener materiales:', err.response?.data || err.message);
        } else {
          console.error('Error desconocido:', err);
        }
        setError('No se pudieron cargar los materiales.');
      }
    };

    fetchMateriales();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de borrar este archivo?')) return;

    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/api/materiales/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMateriales(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      alert('No se pudo eliminar el archivo');
      console.error(err);
    }
  };

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!materiales.length) {
    return <p className="text-center">Cargando materiales...</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Área</th>
            <th>Materia</th>
            <th>Profesor</th>
            <th>Tipo</th>
            <th>Archivo</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materiales.map((material) => (
            <tr key={material.id}>
              <td>{material.nombre}</td>
              <td>{material.area || '-'}</td>
              <td>{material.materia || '-'}</td>
              <td>{material.profesor || '-'}</td>
              <td>{material.tipo || '-'}</td>
              <td>
                <a
                  href={`http://localhost:5000/uploads/${material.archivo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver archivo
                </a>
              </td>
              <td>{material.fecha ? new Date(material.fecha).toLocaleDateString() : '-'}</td>
              <td>
                {user && user.email === material.usuario && (
                  <>
                    <Link
                      to={`/ayuda/material/editar/${material.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Modificar
                    </Link>
                    <button
                      onClick={() => handleDelete(material.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Borrar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerMateriales;
