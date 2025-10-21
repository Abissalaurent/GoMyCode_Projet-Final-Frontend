import React, { useState } from "react";
// Import des composants Bootstrap pour le style et la mise en page
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
// Import pour la navigation et les liens internes
import { Link, useNavigate } from "react-router-dom";
// Import des icônes FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
// Import du service d'authentification
import AuthService from "../../services/authService";

// Composant Register pour l'inscription utilisateur
const Register = () => {
  // États pour gérer les champs du formulaire
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // État pour afficher les erreurs
  const [error, setError] = useState("");
  // État pour gérer le chargement lors de la soumission
  const [loading, setLoading] = useState(false);
  // Hook pour la navigation après inscription
  const navigate = useNavigate();

  // Fonction pour mettre à jour les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      return setError("Les mots de passe ne correspondent pas");
    }
    if (formData.password.length < 6) {
      return setError("Le mot de passe doit contenir au moins 6 caractères");
    }

    setLoading(true); // Active l'indicateur de chargement

    // Appel du service d'inscription
    const result = await AuthService.register(
      formData.username,
      formData.email,
      formData.password
    );
    setLoading(false); // Désactive l'indicateur de chargement

    // Si l'inscription réussit, redirige vers la page de connexion
    if (result.success) {
      navigate("/login", { state: { registrationSuccess: true } });
    } else {
      // Affiche le message d'erreur retourné par le backend ou un message générique
      setError(result.message || "Une erreur s'est produite lors de l'inscription");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}>
      <Row className="w-100" style={{ maxWidth: "800px" }}>
        {/* Colonne image, visible uniquement sur écran md et plus */}
        <Col md={6} className="d-none d-md-flex align-items-center">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Inscription"
            className="img-fluid rounded shadow"
          />
        </Col>
        {/* Colonne formulaire */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Créer un compte
              </h2>
              {/* Affiche une alerte en cas d'erreur */}
              {error && <Alert variant="danger">{error}</Alert>}

              {/* Formulaire d'inscription */}
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
                    placeholder="Au moins 6 caractères"
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
                    placeholder="Confirmez votre mot de passe"
                  />
                </Form.Group>

                {/* Bouton de soumission, désactivé pendant le chargement */}
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-100 mb-3"
                  variant="primary">
                  {loading ? "Inscription en cours..." : "S'inscrire"}
                </Button>
              </Form>

              {/* Lien vers la page de connexion */}
              <div className="text-center mt-3">
                <p className="mb-0">
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