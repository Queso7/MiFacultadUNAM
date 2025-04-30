import React from 'react';
import { Carousel, Container, Stack, Col, Row } from 'react-bootstrap';
import img1 from '../assets/simulacro.jpeg';
import img2 from '../assets/convocatoria.jpeg';
import img3 from '../assets/consejo.jpeg';
import img4 from '../assets/disenho.jpeg';
import img5 from '../assets/encuesta.jpeg';

const Home: React.FC = () => {
  return (
    <main className="home-pagem m-3%">
      <h1 className='text-center my-4'>Bienvenido a Comunidad FES Acatlán</h1>

      <Container fluid>
        <Row>
          <Col xs={12} md={8}>
            <h2 className='text-center my-3'>Noticias</h2>
            <Carousel className="mb-3 mb-md-4">
              <Carousel.Item>
                <img className="d-block w-100" style={{ maxHeight: '700px', objectFit: 'cover' }} src={img1} alt="Primera" />
              </Carousel.Item>

              <Carousel.Item>
                <img className="d-block w-100" style={{ maxHeight: '700px', objectFit: 'cover' }} src={img2} alt="Segunda" />
              </Carousel.Item>

              <Carousel.Item>
                <img className="d-block w-100" style={{ maxHeight: '700px', objectFit: 'cover' }} src={img3} alt="Tercera" />
              </Carousel.Item>

              <Carousel.Item>
                <img className="d-block w-100" style={{ maxHeight: '700px', objectFit: 'cover' }} src={img4} alt="Cuarta" />
              </Carousel.Item>

              <Carousel.Item>
                <img className="d-block w-100" style={{ maxHeight: '700px', objectFit: 'cover' }} src={img5} alt="Quinta" />
              </Carousel.Item>
            </Carousel>
          </Col>

          <Col xs={12} md={4}>
            <div className="bg-light py-4 px-3 rounded">
              <h2 className="text-center">Novedades</h2>
              <Stack gap={3}>
                <div className="p-2 border-bottom">
                  <a
                    className="link-offset-2 link-underline link-underline-opacity-0"
                    href="https://unamglobal.unam.mx/global_tv/mas-de-280-mil-estudiantes-de-la-unam-tienen-beca/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abril 27 de 2025- 
                    MÁS DE 280 MIL ESTUDIANTES DE LA UNAM TIENEN BECA
                  </a>
                </div>
                <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="https://unamglobal.unam.mx/global_tv/facultad-de-medicina-de-la-unam-ejemplo-de-espiritu-de-servicio-y-vocacion-humanista-rector-lomeli/"arget="_blank"
                    rel="noopener noreferrer">Abril 21 de 2025- Facultad de Medicina de la UNAM, ejemplo de espíritu de servicio y vocación humanista</a></div>

                <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="https://unamglobal.unam.mx/global_tv/como-regular-el-uso-de-la-ia-en-mexico/"arget="_blank"
                    rel="noopener noreferrer">Abril 3 de 2025- ¿CÓMO REGULAR EL USO DE LA IA EN MÉXICO?</a></div>

                <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="https://unamglobal.unam.mx/global_tv/supertortilla-contra-la-desnutricion/"arget="_blank"
                    rel="noopener noreferrer">Marzo 31 de 2025- SUPERTORTILLA CONTRA LA DESNUTRICIÓN</a></div>

                <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="https://unamglobal.unam.mx/global_tv/deshielo-glaciar-ultimo-llamado-a-la-accion/"arget="_blank"
                    rel="noopener noreferrer">Marzo 18 de 2025- DESHIELO GLACIAR, ÚLTIMO LLAMADO A LA ACCIÓN</a></div>

                <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="https://unamglobal.unam.mx/global_tv/la-unam-cuida-la-salud-mental-de-las-personas-migrantes/"arget="_blank"
                    rel="noopener noreferrer">Febrero 26 de 2025-LA UNAM CUIDA LA SALUD MENTAL DE LAS PERSONAS  MIGRANTES</a></div>

                <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="https://unamglobal.unam.mx/global_tv/biblioteca-central-la-historia-de-mexico-plasmada-en-muros/"arget="_blank"
                    rel="noopener noreferrer">Diciembre 5, 2022- BIBLIOTECA CENTRAL, LA HISTORIA DE MÉXICO PLASMADA EN MUROS</a></div>

              </Stack>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <div className='px-4 my-5'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum beatae dolor rem at similique? Dolor, alias quidem impedit numquam, vero deleniti minus voluptate non exercitationem, maxime ut delectus perspiciatis iste.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem in sapiente consectetur dolores, sit quae inventore iure ipsam nostrum. Ut a incidunt laborum amet ab accusamus eius cupiditate nihil facere!</p>
        </div>
      </Container>
    </main>
  );
};

export default Home;
