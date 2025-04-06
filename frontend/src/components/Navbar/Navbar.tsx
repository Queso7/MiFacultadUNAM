import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const CustomNavbar = () => {
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Mi Facultad UNAM</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="justify-content-end">
          <Nav activeKey={location.pathname}>
            <Nav.Link as={Link} to="/" eventKey="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/ayuda" eventKey="/ayuda">Ayuda académica</Nav.Link>
            <Nav.Link as={Link} to="/sos" eventKey="/sos">SOS</Nav.Link>
            <Nav.Link disabled>Iniciar sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;