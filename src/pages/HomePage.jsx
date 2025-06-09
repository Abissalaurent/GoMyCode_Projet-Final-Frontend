import React from "react";
import {Container, Row, Col, Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faCalendarAlt,
  faUserShield,
  faCheckCircle,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <Container className="my-5">
      {/* Hero Section */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h1 className="display-4 fw-bold mb-4">
            Gérez vos tâches efficacement
          </h1>
          <p className="lead mb-4">
            L'application de gestion des tâches qui simplifie votre quotidien.
            Organisez, priorisez et suivez l'avancement de vos projets en un
            seul endroit.
          </p>
          <div className="d-flex gap-3">
            <Button as={Link} to="/register" variant="primary" size="lg">
              <FontAwesomeIcon icon={faUserPlus} className="me-2" />
              Commencer gratuitement
            </Button>
            <Button as={Link} to="/login" variant="outline-primary" size="lg">
              <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
              Connexion
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Task management"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>

      {/* Features Section */}
      <section className="my-5 py-4">
        <h2 className="text-center mb-5">
          Pourquoi choisir notre application ?
        </h2>
        <Row>
          <Col md={3} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <FontAwesomeIcon
                  icon={faTasks}
                  size="3x"
                  className="text-primary-emphasis mb-3"
                />
                <Card.Title>Gestion simplifiée</Card.Title>
                <Card.Text>
                  Créez, organisez et suivez toutes vos tâches en un seul
                  endroit.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  size="3x"
                  className="text-primary-emphasis mb-3"
                />
                <Card.Title>Échéances claires</Card.Title>
                <Card.Text>
                  Définissez des dates limites et recevez des rappels pour vos
                  tâches importantes.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <FontAwesomeIcon
                  icon={faUserShield}
                  size="3x"
                  className="text-primary-emphasis mb-3"
                />
                <Card.Title>Sécurité des données</Card.Title>
                <Card.Text>
                  Vos informations sont protégées avec un système
                  d'authentification sécurisé.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="3x"
                  className="text-primary-emphasis mb-3"
                />
                <Card.Title>Suivi de progression</Card.Title>
                <Card.Text>
                  Visualisez l'avancement de vos projets avec des statuts
                  clairs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Call to Action */}
      <section className="bg-light rounded p-5 my-5 text-center">
        <h2 className="mb-4">Prêt à booster votre productivité ?</h2>
        <p className="lead mb-4">
          Rejoignez des milliers d'utilisateurs qui organisent déjà leurs tâches
          avec notre application.
        </p>
        <Button as={Link} to="/register" variant="primary" size="lg">
          Créer un compte gratuit
        </Button>
      </section>
    </Container>
  );
};

export default HomePage;
