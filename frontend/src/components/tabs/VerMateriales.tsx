import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useauth';
import { Link } from 'react-router-dom';


let debounceTimeout: NodeJS.Timeout;

interface Material {
  id: number;
  autor: string;
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
  
  const[globalFiltrer,setGlobalFiltrer]=useState('')
  console.log(globalFiltrer);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const fetchMateriales = async () => {
        try {
          setLoading(true);
          setError(null);
          const token = localStorage.getItem('authToken');
          const response = await axios.get('http://localhost:5000/api/materiales', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: globalFiltrer ? { q: globalFiltrer } : {}, // si hay filtro, lo manda; si no, trae todos
          });
          if (response.data.length === 0 && globalFiltrer !== '') {
            setMateriales([]); // Si no se encuentran resultados, se limpian los materiales
          } else {
            setMateriales(response.data);
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.error('Error al obtener materiales:', err.response?.data || err.message);
          } else {
            console.error('Error desconocido:', err);
          }
          setError('No se pudieron cargar los materiales.');
          setMateriales([]);
        } finally {
          setLoading(false);
        }
      };

      fetchMateriales();
    }, 2000);

    return () => clearTimeout(debounceTimeout);
  }, [globalFiltrer]);



  const handleResetFilter = () => {
    setGlobalFiltrer(''); // Restablecer filtro
  };

  if (loading) {
    return <p className="text-center">Cargando materiales...</p>;
  }
  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (

    


    <div className="table-responsive">

    <div className= 'my-2 text-right'>
      <input
      type="text"
      onChange={e=>setGlobalFiltrer(e.target.value)}
      className='text-gray-600 border border-gray-300 rounded outline-indigo-700'
      placeholder= 'buscar...'/>
     </div>

      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Autor</th>
            <th>Área</th>
            <th>Materia</th>
            <th>Profesor</th>

            <th>Tema</th>

            <th>Tipo</th>
            <th>Archivo</th>
            <th>Fecha</th>
           
          </tr>
        </thead>
        <tbody>
          {materiales.map((material) => (
            <tr key={material.id}>
            <td>{material.autor}</td>
            <td>{material.area || '-'}</td>
            <td>{material.materia || '-'}</td>
            <td>{material.profesor || '-'}</td>
            <td>{material.tema || '-'}</td>
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
              {user.getUser() && user.getUser()?.email === material.autor && (

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
