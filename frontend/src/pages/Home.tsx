import React from 'react';
import { Carousel, Container, Stack, Col, Row } from 'react-bootstrap';
import img1 from '../assets/yo y los papus.jpeg';

const Home: React.FC = () => {
  return (
    <main className="home-page px-3 px-md-4 px-lg-5 py-4">
      <h1 className='text-center'>Bienvenido a Comunidad FES Acatlán</h1>

      <Container fluid>
        <Row><Col xs={12} md={8}>
          <h2 className='text-center my-3'>Noticias</h2>
          <Carousel className="mb-3 mb-md-4">
            <Carousel.Item>
              <img className="d-block w-100" src={img1} alt="Primera" />
              <Carousel.Caption>
                <h3>Primer Noticia</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos consectetur odio aliquid autem sed quae atque voluptas quis corporis itaque, modi debitis dolor fugiat dolores ea et, commodi, earum amet!</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img1}
                alt="Segunda"
              />
              <Carousel.Caption>
                <h3>Segundda noticia</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti enim minima rerum nobis quo ex autem, quis quibusdam reprehenderit architecto porro repellat dicta facere et illum ab odio explicabo aut!</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img1}
                alt="Segunda"
              />
              <Carousel.Caption>
                <h3>Tercera Noticia</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptatibus minima laborum aspernatur tempore animi harum sunt ducimus repellat, culpa molestiae fugit nam, quo illum officiis placeat ea nobis sint.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img1}
                alt="Segunda"
              />
              <Carousel.Caption>
                <h3>Cuarta Noticia</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus fugit dolore eaque et molestiae alias doloremque ullam, dolores dolorum nam veniam dolorem in suscipit ipsa velit commodi voluptatum incidunt consequuntur?</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img1}
                alt="Segunda"
              />
              <Carousel.Caption>
                <h3>Quinta Noticia</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit aperiam unde fuga dignissimos dolor quae hic voluptatum ipsa cum, tempora eveniet possimus sequi perspiciatis eligendi assumenda nemo, quisquam odit deleniti?</p>
              </Carousel.Caption>
            </Carousel.Item>

          </Carousel>
        </Col>


          <Col xs={12} md={4}>
            <div className="bg-light py-4 px-3 rounded ">
              <h2 className="text-center">Novedades</h2>
              <Stack gap={3}>
              <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="#">Noticia 1</a></div>
              <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="#">Noticia 2</a></div>
              <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="#">Noticia 3</a></div>
              <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="#">Noticia 4</a></div>
              <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="#">Noticia 5</a></div>
              <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="#">Noticia 6</a></div>
              <div className="p-2 border-bottom"><a className="link-offset-2 link-underline link-underline-opacity-0" href="#">Noticia 7</a></div>
              </Stack>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <div className='p-5'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum beatae dolor rem at similique? Dolor, alias quidem impedit numquam, vero deleniti minus voluptate non exercitationem, maxime ut delectus perspiciatis iste.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem in sapiente consectetur dolores, sit quae inventore iure ipsam nostrum. Ut a incidunt laborum amet ab accusamus eius cupiditate nihil facere!</p>
        </div>
      </Container>
    </main>
  );
};

export default Home;