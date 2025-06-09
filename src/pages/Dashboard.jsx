// src/pages/Dashboard.jsx
import React, {useContext} from "react";
import {Container, Row, Col, Card, Spinner, Alert} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";
import {TaskContext} from "../context/TaskContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faCheckCircle,
  faSpinner,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const {user} = useContext(AuthContext);
  const {tasks, loading} = useContext(TaskContext);

  const getTaskStats = () => ({
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    todo: tasks.filter((t) => t.status === "todo").length,
  });

  const stats = getTaskStats();

  if (!user) {
    return (
      <Container className="text-center my-5">
        <Alert variant="info">
          Veuillez vous connecter pour accéder au tableau de bord
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Tableau de Bord</h2>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <h5 className="card-title">Statistiques</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <FontAwesomeIcon
                      icon={faTasks}
                      className="me-2 text-primary"
                    />
                    Tâches totales: <strong>{stats.total}</strong>
                  </li>
                  <li className="mb-2">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="me-2 text-success"
                    />
                    Terminées: <strong>{stats.completed}</strong>
                  </li>
                  <li className="mb-2">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="me-2 text-warning"
                      spin
                    />
                    En cours: <strong>{stats.inProgress}</strong>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      icon={faClock}
                      className="me-2 text-secondary"
                    />
                    À faire: <strong>{stats.todo}</strong>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={8}>
            {/* Widget ou aperçu additionnel */}
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <h5 className="card-title">Aperçu à venir</h5>
                <p className="text-muted">
                  D'autres widgets ou graphiques ici…
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
