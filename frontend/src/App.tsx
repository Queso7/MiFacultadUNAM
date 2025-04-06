import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Ayuda from './pages/Ayuda';
import SOS from './pages/SOS';
import Dashboard from './pages/DashBoard';
import LoginForm from './components/auth/LoginForm';
import PrivateRoute from './components/auth/PrivateRoute';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/sos" element={<SOS />} />
            <Route path="/login" element={<LoginForm />} />
            
            
            <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            
            
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;