import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useauth'; // asegúrate de crearlo
import { Link } from 'react-router-dom';

interface Material {
  _id: string;
  nombre: string;
  archivo: string;
  autor: string; // Este debe ser el ID del usuario
}

const VerMateriales = () => {
  const [materiales, setMateriales] = useState<Material[]>([]);
  const user = useAuth(); // El usuario logueado (o null)

  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/materiales');
        setMateriales(response.data);
      } catch (err) {
        console.error('Error al obtener materiales', err);
      }
    };

    fetchMateriales();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de borrar este archivo?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/materiales/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setMateriales(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      alert('No se pudo eliminar el archivo');
      console.error(err);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Archivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materiales.map((material) => (
            <tr key={material._id}>
              <td>{material.nombre}</td>
              <td>
                <a href={`http://localhost:5000/uploads/${material.archivo}`} target="_blank" rel="noopener noreferrer">
                  Ver archivo
                </a>
              </td>
              <td>
                {user && user.id === material.autor && (
                  <>
                    <Link to={`/ayuda/material/editar/${material._id}`} className="btn btn-warning btn-sm me-2">
                      Modificar
                    </Link>
                    <button
                      onClick={() => handleDelete(material._id)}
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
