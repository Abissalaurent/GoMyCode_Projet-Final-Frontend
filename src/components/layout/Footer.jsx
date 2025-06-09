import React from "react";
import {Container, Row, Col, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white mt-5 pt-4 pb-2">
      <Container>
        <Row>
          {/* Section À propos */}
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase mb-3">Task Manager</h5>
            <p>
              Une application simple et efficace pour gérer vos tâches
              quotidiennes. Augmentez votre productivité et organisez votre
              travail.
            </p>
            <div className="social-icons mt-3">
              <a
                href="https://github.com/dashboard"
                className="text-white me-3"
                aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a
                href="https://www.linkedin.com/in/laurent-abissa-807b0435b"
                className="text-white me-3"
                aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
            </div>
          </Col>

          {/* Section Liens rapides */}
          <Col md={2} className="mb-4">
            <h5 className="text-uppercase mb-3">Liens rapides</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-white p-0 mb-2">
                Accueil
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/dashboard"
                className="text-white p-0 mb-2">
                Tableau de bord
              </Nav.Link>
              {/* <Nav.Link
                as={Link}
                to="/features"
                className="text-white p-0 mb-2">
                Fonctionnalités
              </Nav.Link>
              <Nav.Link as={Link} to="/pricing" className="text-white p-0 mb-2">
                Tarifs
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-white p-0">
                Contact
              </Nav.Link> */}
            </Nav>
          </Col>

          {/* Section Contact */}
          <Col md={3} className="mb-4">
            <h5 className="text-uppercase mb-3">Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                Abidjan - Côte d'Ivoire
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                +225 07 07 07 07
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                <a
                  href="mailto:laurentabissa@gmail.com"
                  className="text-white text-decoration-none">
                  laurentabissa@gmail.com
                </a>
              </li>
            </ul>
          </Col>

          {/* Section Newsletter */}
          <Col md={3}>
            <h5 className="text-uppercase mb-3">Newsletter</h5>
            <p>
              Abonnez-vous pour recevoir les dernières mises à jour et astuces.
            </p>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Votre email"
                aria-label="Votre email"
              />
              <button className="btn btn-primary" type="button">
                S'abonner
              </button>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-3">
          <Col className="text-center py-3 border-top border-secondary">
            <small>
              &copy; {currentYear} Task Manager - Tous droits réservés |{" "}
              {/* <Link
                to="/privacy"
                className="text-white ms-2 text-decoration-none">
                Politique de confidentialité
              </Link>{" "}
              |{" "}
              <Link
                to="/terms"
                className="text-white ms-2 text-decoration-none">
                Conditions d'utilisation
              </Link> */}
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
