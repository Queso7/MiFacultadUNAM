import React, { useEffect, useState } from 'react';
import '../App.css';
//import VerMateriales from '../components/tabs/VerMateriales';
import TabUsuario from '../components/tabs/tabUsuario';

const Perfil: React.FC = () => {
    const [materiales, setMateriales] = useState<Material[]>([]);
    const [nombreUsuario, setNombreUsuario] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!token) return;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const email = payload.email;
        const nombre = email?.split('@')[0] || 'Usuario';
        setNombreUsuario(nombre);
    }, []);

    return (
        <main className="Perfil-page">
            <h1>Hola, {nombreUsuario}</h1>
            <h2>Tus archivos:</h2>

            {/* Tabla de materiales subidos   <tabUsuario/> */}
           
            <TabUsuario/>
            
        </main>
    );
};

export default Perfil;
