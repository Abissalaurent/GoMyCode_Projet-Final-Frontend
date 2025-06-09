import React, {useState, useEffect, useContext} from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Image,
  Tab,
  Tabs,
  ListGroup,
  Badge,
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faCalendarAlt,
  faEdit,
  faSave,
  faLock,
  faTasks,
  faCheckCircle,
  faSpinner,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../context/AuthContext";
import {TaskContext} from "../context/TaskContext";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

const Profile = () => {
  const {user, updateProfile, logout} = useContext(AuthContext);
  const {tasks} = useContext(TaskContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.username || !formData.email) {
      return setError("Tous les champs sont obligatoires");
    }

    if (!updateProfile) {
      return setError("Fonction de mise à jour non disponible");
    }

    const result = await updateProfile(formData);

    if (result.success) {
      setSuccess("Profil mis à jour avec succès");
      setEditMode(false);
    } else {
      setError(result.message || "Erreur lors de la mise à jour");
    }
  };
  
   // Fonction pour obtenir les statistiques des tâches  
  const getTaskStats = () => {
    const stats = {
      total: tasks.length,
      completed: tasks.filter((t) => t.status === "completed").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      todo: tasks.filter((t) => t.status === "todo").length,
      overdue: tasks.filter(
        (t) =>
          t.dueDate &&
          new Date(t.dueDate) < new Date() &&
          t.status !== "completed"
      ).length,
    };

    return stats;
  };

  const stats = getTaskStats();

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (!user) {
    return (
      <Container className="text-center my-5">
        <Alert variant="info">
          Veuillez vous connecter pour accéder à votre profil
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body className="text-center">
              <Image
                src={`https://ui-avatars.com/api/?name=${user.username}&background=random&size=200`}
                roundedCircle
                className="mb-3"
                width={150}
                height={150}
              />
              <h3>{user.username}</h3>
              <p className="text-muted">{user.email}</p>
              <p>
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                Membre depuis {moment(user.createdAt).format("LL")}
              </p>
              <Button
                variant="outline-danger"
                onClick={logout}
                className="mt-2">
                Déconnexion
              </Button>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <FontAwesomeIcon icon={faTasks} className="me-2" />
              Statistiques
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <FontAwesomeIcon icon={faTasks} className="me-2 text-primary" />
                Tâches totales: <strong>{stats.total}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="me-2 text-success"
                />
                Terminées: <strong>{stats.completed}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="me-2 text-warning"
                  spin
                />
                En cours: <strong>{stats.inProgress}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <FontAwesomeIcon
                  icon={faClock}
                  className="me-2 text-secondary"
                />
                À faire: <strong>{stats.todo}</strong>
              </ListGroup.Item>
              {stats.overdue > 0 && (
                <ListGroup.Item className="text-danger">
                  <FontAwesomeIcon icon={faClock} className="me-2" />
                  En retard: <strong>{stats.overdue}</strong>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>

        <Col md={8}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3">
            <Tab eventKey="profile" title="Profil">
              <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Informations du profil
                  </h5>
                  {!editMode && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setEditMode(true)}>
                      <FontAwesomeIcon icon={faEdit} className="me-2" />
                      Modifier
                    </Button>
                  )}
                </Card.Header>
                <Card.Body>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}

                  {editMode ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FontAwesomeIcon icon={faUser} className="me-2" />
                          Nom d'utilisateur
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                          Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-end gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setEditMode(false);
                            setError("");
                            setSuccess("");
                          }}>
                          Annuler
                        </Button>
                        <Button type="submit" variant="primary">
                          <FontAwesomeIcon icon={faSave} className="me-2" />
                          Enregistrer
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <div>
                      <p>
                        <strong>
                          <FontAwesomeIcon icon={faUser} className="me-2" />
                          Nom d'utilisateur:
                        </strong>{" "}
                        {user.username}
                      </p>
                      <p>
                        <strong>
                          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                          Email:
                        </strong>{" "}
                        {user.email}
                      </p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="password" title="Mot de passe">
              <Card className="shadow-sm">
                <Card.Header>
                  <h5 className="mb-0">
                    <FontAwesomeIcon icon={faLock} className="me-2" />
                    Changer le mot de passe
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Mot de passe actuel</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Entrez votre mot de passe actuel"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Nouveau mot de passe</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Entrez votre nouveau mot de passe"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirmer le nouveau mot de passe</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirmez votre nouveau mot de passe"
                        required
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                      <Button variant="primary" type="submit">
                        <FontAwesomeIcon icon={faSave} className="me-2" />
                        Mettre à jour
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="activity" title="Activité récente">
              <Card className="shadow-sm">
                <Card.Header>
                  <h5 className="mb-0">
                    <FontAwesomeIcon icon={faTasks} className="me-2" />
                    Tâches récentes
                  </h5>
                </Card.Header>
                <Card.Body>
                  {recentTasks.length === 0 ? (
                    <Alert variant="info">
                      Aucune tâche récente à afficher
                    </Alert>
                  ) : (
                    <ListGroup variant="flush">
                      {recentTasks.map((task) => (
                        <ListGroup.Item key={task._id}>
                          <div className="d-flex justify-content-between">
                            <div>
                              <strong>{task.title}</strong>
                              {task.description && (
                                <p className="text-muted mb-0">
                                  {task.description.substring(0, 50)}...
                                </p>
                              )}
                            </div>
                            <div>
                              <Badge
                                bg={
                                  task.status === "completed"
                                    ? "success"
                                    : task.status === "in-progress"
                                    ? "primary"
                                    : "secondary"
                                }>
                                {task.status === "completed"
                                  ? "Terminé"
                                  : task.status === "in-progress"
                                  ? "En cours"
                                  : "À faire"}
                              </Badge>
                            </div>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
