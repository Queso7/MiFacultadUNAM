import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Ayuda from './pages/Ayuda';
import SOS from './pages/SOS';
import AyudaMaterial from './pages/AyudaMaterial';
import LoginForm from './components/auth/LoginForm';
import PrivateRoute from './components/auth/PrivateRoute';
import Register from './pages/RegistroU';
import AyudaTutorias from './pages/AyudaTutorias';
import AyudaAsesorias from './pages/AyudaAsesorias';
import AgregarRegistroMaterial from './pages/AgregarRegistroMaterial';
import EditarMaterial from './components/tabs/EditarMaterial'
import NotFound from './pages/NotFound';
import './App.css';

const App: React.FC = () => {
  return (
    
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/sos" element={<SOS />} /> 

            <Route element={<PrivateRoute />}>
              <Route path="/ayuda" element={<Ayuda />} />
              <Route path="/ayuda/material" element={<AyudaMaterial />} />
              <Route path="/ayuda/asesorias" element={<AyudaAsesorias />} />
              <Route path="/ayuda/tutorias" element={<AyudaTutorias />} />
              <Route path="/ayuda/material/agregar-material" element={<AgregarRegistroMaterial />} />
              <Route path='/perfil' element={<Perfil/>}/>
              <Route path="/ayuda/material/editar/:id" element={<EditarMaterial />} />

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