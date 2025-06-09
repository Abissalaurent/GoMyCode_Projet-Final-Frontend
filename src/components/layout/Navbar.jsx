import React, {useContext} from "react";
import {Navbar, Nav, Container, Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"; // ✅ ajouté
import {faUser} from "@fortawesome/free-solid-svg-icons"; // ✅ ajouté
import {faTasks} from "@fortawesome/free-solid-svg-icons"; // ✅ ajouté

const AppNavbar = () => {
  const {isAuthenticated, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="secondary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/assets/logold.jpg"
            alt="logold"
            width="50"
            height="50"
            className="d-inline-block align-top me-2"
          />
          Task Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/tasks">
                <FontAwesomeIcon icon={faTasks} className="me-2" />
                Tasks
              </Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/profile">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Mon Profil
              </Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-center">
            {isAuthenticated ? (
              <Button variant="outline-light" onClick={handleLogout}>
                Déconnexion
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Connexion
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Inscription
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
