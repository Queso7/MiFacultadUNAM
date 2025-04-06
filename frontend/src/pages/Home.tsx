import React from 'react';
import { Carousel } from 'react-bootstrap';
import img1 from '../assets/yo y los papus.jpeg';

const Home: React.FC = () => {
  return (
    <main className="home-page">
      <h1>Bienvenido a Comunidad FES Acatlán</h1>
      saluos a osito peru

    <div>
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

    </main>
  );
};

export default Home;