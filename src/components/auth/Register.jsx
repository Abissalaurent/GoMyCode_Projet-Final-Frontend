import React, {useState} from "react";
import {Form, Button, Card, Alert, Container, Row, Col} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    // 🔐 Validation côté client
    if (formData.password !== formData.confirmPassword) {
      return setError("Les mots de passe ne correspondent pas.");
    }
    if (formData.password.length < 6) {
      return setError("Le mot de passe doit contenir au moins 6 caractères.");
    }

    setLoading(true);

    const result = await AuthService.register(
      formData.username,
      formData.email,
      formData.password
    );

    setLoading(false);

    if (result.success) {
      // ✅ Rediriger vers la page de login après inscription
      navigate("/login", {state: {registrationSuccess: true}});
    } else {
      // ⚠️ Afficher l’erreur retournée par le backend
      setError(result.message || "Erreur lors de l'inscription.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{minHeight: "80vh"}}>
      <Row className="w-100" style={{maxWidth: "800px"}}>
        <Col md={6} className="d-none d-md-flex align-items-center">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Inscription"
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Créer un compte
              </h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nom d'utilisateur</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Entrez votre nom d'utilisateur"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Entrez votre email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Mot de passe (6 caractères min)"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirmer le mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirmez le mot de passe"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  variant="primary"
                  disabled={loading}>
                  {loading ? "Inscription en cours..." : "S'inscrire"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p>
                  Vous avez déjà un compte ?{" "}
                  <Link to="/login" className="text-decoration-none">
                    <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
                    Se connecter
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
