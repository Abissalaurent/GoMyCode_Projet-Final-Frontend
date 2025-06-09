import React from "react";
import {Container, Button, Card, Row, Col, Form, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faArrowLeft, faBug} from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{minHeight: "100vh"}}>
      <Card className="shadow-lg" style={{width: "100%", maxWidth: "600px"}}>
        <Card.Body className="text-center p-5">
          <div className="mb-4">
            <FontAwesomeIcon icon={faBug} size="4x" className="text-danger" />
          </div>

          <h1 className="display-4 fw-bold text-danger mb-3">404</h1>

          <h2 className="mb-3">Page Non Trouvée</h2>

          <p className="lead mb-4">
            Oups ! La page que vous recherchez semble introuvable.
            <br />
            Elle a peut-être été déplacée ou supprimée.
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button
              as={Link}
              to="/"
              variant="primary"
              size="lg"
              className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faHome} />
              Page d'Accueil
            </Button>

            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => window.history.back()}
              className="d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faArrowLeft} />
              Retour
            </Button>
          </div>

          <Form className="mt-4">
            <InputGroup>
              <Form.Control 
                type="text" 
                placeholder="Que cherchez-vous ?" 
              />
              <Button variant="primary">
                Rechercher
              </Button>
            </InputGroup>
          </Form>

          {/* Section pour les développeurs (optionnelle) */}
          <div className="mt-5 text-start">
            <h5 className="text-muted mb-3">
              <small>Informations techniques</small>
            </h5>
            <Card className="bg-light">
              <Card.Body>
                <Row>
                  <Col xs={4} className="fw-bold">
                    URL :
                  </Col>
                  <Col xs={8} className="text-monospace">
                    {window.location.pathname}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col xs={4} className="fw-bold">
                    Statut :
                  </Col>
                  <Col xs={8}>404 - Not Found</Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotFound;
