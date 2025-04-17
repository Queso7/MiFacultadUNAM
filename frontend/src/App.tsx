import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Ayuda from './pages/Ayuda';
import SOS from './pages/SOS';
import AyudaMaterial from './pages/AyudaMaterial';
import Dashboard from './pages/DashBoard';
import LoginForm from './components/auth/LoginForm';
import PrivateRoute from './components/auth/PrivateRoute';

import Register from './pages/RegistroU'; // <-- aquí asegúrate del nombre del archivo
import AyudaTutorias from './pages/AyudaTutorias';
import AyudaAsesorias from './pages/AyudaAsesorias';
import AgregarRegistroMaterial from './pages/AgregarRegistroMaterial';

import NotFound from './pages/NotFound';
import './App.css';

import Panel from './pages/Panel';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/sos" element={<SOS />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registro" element={<Register />} />

            {/* Ayuda y subrutas */}
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/ayuda/material" element={<AyudaMaterial />} />
            <Route path="/ayuda/asesorias" element={<AyudaAsesorias />} />
           <Route path="/ayuda/tutorias" element={<AyudaTutorias />} />
            

            <Route element={<PrivateRoute />}> {/* Rutas privadas */}
              <Route path="/dashboard" element={<Dashboard />} />
             
            </Route>

            <Route element={<PrivateRoute />}>
             <Route path="/ayuda/material/agregar-material" element={<AgregarRegistroMaterial />} />
              </Route>

              <Route element={<PrivateRoute />}>
             <Route path="/Panel" element={<Panel />} />
              </Route>

            {/* Ruta 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
