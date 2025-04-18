import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useAuth } from '../../hooks/useauth';

const CustomNavbar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const { isAuthenticated, getUser, logout } = useAuth();
  const user = getUser();

  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className="navbar-custom"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Mi Facultad UNAM</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/" eventKey="/">Inicio</Nav.Link>
            {isAuthenticated() && (
              <Nav.Link as={Link} to="/ayuda" eventKey="/ayuda">Ayuda académica</Nav.Link>
            )}
            <Nav.Link as={Link} to="/sos" eventKey="/sos">SOS</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {isAuthenticated() && user ? (
              <Dropdown align="end" as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} className="d-flex align-items-center">
                  <span className="me-2">{user.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-dark">
                  <Dropdown.Item as={Link} to="/perfil">Mi perfil</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>
                    <div className="d-flex align-items-center text-danger">
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Cerrar sesión
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/login" eventKey="/login">
                {user?.email?.match(/\d+/)?.[0] || "Iniciar sesión"}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;