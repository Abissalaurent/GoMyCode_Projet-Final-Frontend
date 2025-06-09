// src/pages/Tasks.jsx
import React, {useContext} from "react";
import {Container, Spinner, Alert} from "react-bootstrap";

import TaskList from "../components/tasks/TaskList";
import {TaskContext} from "../context/TaskContext";
import {AuthContext} from "../context/AuthContext";

const Tasks = () => {
  const {tasks, loading, error} = useContext(TaskContext);
  const {isAuthenticated} = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <Container className="text-center my-5">
        <Alert variant="info">
          Veuillez vous connecter pour accéder à vos tâches.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          Une erreur est survenue : {error}
        </Alert>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </Container>
  );
};

export default Tasks;
