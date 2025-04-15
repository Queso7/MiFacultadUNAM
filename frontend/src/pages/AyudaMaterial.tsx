import React from 'react';
import { Link } from 'react-router-dom'; // 👈 IMPORTANTE
import VerMateriales from '../components/tabs/VerMateriales';

const AyudaMaterial: React.FC = () => {
  return (
    <main className="ayuda-material-page container my-4">
      <h1 className="text-center mb-4">📚 Materiales</h1>

      {/* Botón para agregar material */}
      <div className="text-center mb-4">
        <Link to="/ayuda/material/agregar-material">
          <button
            type="button"
            className="btn btn-success btn-lg rounded-circle"
            style={{
              width: '70px',
              height: '70px',
              padding: 0,
              fontSize: '28px'
            }}
          >
            <i className="fa fa-plus"></i>
          </button>
        </Link>
      </div>

      {/* Tabla de materiales subidos */}
      <VerMateriales />
    </main>
  );
};

export default AyudaMaterial;