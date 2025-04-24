
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useauth';
import { Link } from 'react-router-dom';

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
  tema?: string;
}

const VerMateriales: React.FC = () => {
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [area, setArea] = useState('');
  const [materia, setMateria] = useState('');
  const [profesor, setProfesor] = useState('');
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(true);
  const user = useAuth();

  const porPagina = 15;

  const fetchMateriales = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/api/materiales', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          area: area || undefined,
          materia: materia || undefined,
          profesor: profesor || undefined,
          pagina,
          porPagina,
        },
      });

      setMateriales(response.data.materiales);
      setTotalPaginas(Math.ceil(response.data.total / porPagina));
    } catch (error) {
      console.error('Error al obtener materiales:', error);
      setMateriales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMateriales();
  }, [pagina]);

  const handleBuscar = () => {
    setPagina(1); // Reiniciar a la primera página al buscar
    fetchMateriales();
  };

  const handleReset = () => {
    setArea('');
    setMateria('');
    setProfesor('');
    setPagina(1);
    fetchMateriales();
  };

  return (
    <div className="container">
      <div className="my-3">
        <select value={area} onChange={e => setArea(e.target.value)} className="form-select mb-2">
          <option value="">Todas las áreas</option>
          <option value="Matematicas">Matematicas</option>
          <option value="Ingenieria">Ingenieria</option>
          <option value="Ciencias Computacionales">Ciencias Computacionales</option>
          <option value="Ciencias Sociales">Ciencias Sociales</option>
          <option value="Humanidades">Humanidades</option>
        </select>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Buscar por materia"
          value={materia}
          onChange={e => setMateria(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Buscar por profesor"
          value={profesor}
          onChange={e => setProfesor(e.target.value)}
        />
        <div className="d-flex gap-2">
          <button onClick={handleBuscar} className="btn btn-primary">Buscar</button>
          <button onClick={handleReset} className="btn btn-secondary">Reiniciar</button>
        </div>
      </div>

      {loading ? (
        <p>Cargando materiales...</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
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
              {materiales.map(m => (
                <tr key={m.id}>
                  <td>{m.autor}</td>
                  <td>{m.area || '-'}</td>
                  <td>{m.materia || '-'}</td>
                  <td>{m.profesor || '-'}</td>
                  <td>{m.tema || '-'}</td>
                  <td>{m.tipo || '-'}</td>
                  <td><a href={`http://localhost:5000/uploads/${m.archivo}`} target="_blank">Ver archivo</a></td>
                  <td>{m.fecha ? new Date(m.fecha).toLocaleDateString() : '-'}</td>
                  <td>
                    {user.getUser()?.email === m.autor && (
                      <>
                        <Link to={`/ayuda/material/editar/${m.id}`} className="btn btn-warning btn-sm">Modificar</Link>
                        <button className="btn btn-danger btn-sm ms-1">Borrar</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <button disabled={pagina === 1} onClick={() => setPagina(p => p - 1)} className="btn btn-outline-primary">←</button>
            <span>Página {pagina} de {totalPaginas}</span>
            <button disabled={pagina === totalPaginas} onClick={() => setPagina(p => p + 1)} className="btn btn-outline-primary">→</button>
          </div>
        </>
      )}
    </div>
  );
};

export default VerMateriales;