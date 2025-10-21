// import React, { useState } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const result = await login(email, password);
//     setLoading(false);

//     if (!result.success) {
//       setError(result.message);
//     } else {
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{ minHeight: "80vh" }}>
//       <Card style={{ width: "400px" }}>
//         <Card.Body>
//           <h2 className="text-center mb-4">Connexion</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Mot de passe</Form.Label>
//               <Form.Control
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </Form.Group>
//             <Button disabled={loading} className="w-100" type="submit">
//               {loading ? "Connexion en cours..." : "Se connecter"}
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default Login;

import React, {useState} from "react";
// Import des composants Bootstrap pour le style du formulaire
import {Form, Button, Card, Alert} from "react-bootstrap";
// Hook pour naviguer entre les pages
import {useNavigate} from "react-router-dom";
// Hook personnalisé pour la gestion de l'authentification
import {useAuth} from "../../context/AuthContext";

// Composant Login pour la connexion utilisateur
const Login = () => {
  // États pour stocker l'email, le mot de passe, les erreurs et l'état de chargement
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Hook pour la navigation
  const navigate = useNavigate();
  // Récupère la fonction login du contexte d'authentification
  const {login} = useAuth();

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setLoading(true); // Active l'indicateur de chargement
    setError(""); // Réinitialise l'erreur

    // Appelle la fonction login avec l'email et le mot de passe
    const result = await login(email, password);
    setLoading(false); // Désactive l'indicateur de chargement

    // Si la connexion échoue, affiche le message d'erreur
    if (!result.success) {
      setError(result.message);
    } else {
      // Si la connexion réussit, redirige vers le dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{minHeight: "80vh"}}>
      <Card style={{width: "400px"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Connexion</h2>
          {/* Affiche une alerte en cas d'erreur */}
          {error && <Alert variant="danger">{error}</Alert>}
          {/* Formulaire de connexion */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {/* Bouton de soumission, désactivé pendant le chargement */}
            <Button disabled={loading} className="w-100" type="submit">
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;