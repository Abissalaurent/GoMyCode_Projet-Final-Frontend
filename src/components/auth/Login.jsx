import React, {useState} from "react";
import {Form, Button, Card, Alert, Container} from "react-bootstrap";
import {useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.message || "Erreur lors de la connexion");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{minHeight: "80vh"}}>
      <Card style={{width: "400px"}} className="shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4">Connexion</h2>

          {/* ✅ Message de succès après inscription */}
          {location.state?.registrationSuccess && (
            <Alert variant="success">
              Compte créé avec succès. Connectez-vous maintenant.
            </Alert>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Entrez votre email"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Entrez votre mot de passe"
              />
            </Form.Group>

            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              variant="primary">
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
