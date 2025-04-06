import React from 'react';
import './App.css';
import { Carousel } from 'react-bootstrap';
import img1 from './assets/yo y los papus.jpeg';

function App() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Comunidad Fes Acatlán</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> {/* Alinea a la derecha */}
            <li className="nav-item">
              <a className="nav-link active" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Ayuda academica</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">SOS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">iniciar sesion</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <Carousel>
<Carousel.Item>
    <img className="d-block w-100" src={img1} alt="Primera" />
  <Carousel.Caption>
    <h3>Primera Imagen</h3>
    <p>Descripción opcional.</p>
  </Carousel.Caption>
</Carousel.Item>

<Carousel.Item>
  <img
    className="d-block w-100"
    src="https://via.placeholder.com/800x400?text=Segunda+Imagen"
    alt="Segunda"
  />
  <Carousel.Caption>
    <h3>Segunda Imagen</h3>
  </Carousel.Caption>
</Carousel.Item>
</Carousel>
    </div>
    
  );
}

export default App;
