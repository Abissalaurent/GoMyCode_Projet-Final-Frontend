import React, {useState, useContext} from "react";
import {Form, Button, Modal} from "react-bootstrap";
import {TaskContext} from "../../context/TaskContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const TaskForm = ({show, handleClose, taskToEdit}) => {
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [dueDate, setDueDate] = useState(
    taskToEdit?.dueDate?.split("T")[0] || ""
  );
  const [status, setStatus] = useState(taskToEdit?.status || "todo");
  const [priority, setPriority] = useState(taskToEdit?.priority || "medium");
  const {addTask, updateTask} = useContext(TaskContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {title, description, dueDate, status, priority};

    if (taskToEdit) {
      await updateTask(taskToEdit._id, taskData);
    } else {
      await addTask(taskData);
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {taskToEdit ? "Modifier la tâche" : "Nouvelle tâche"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date d'échéance</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Statut</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}>
              <option value="todo">À faire</option>
              <option value="in-progress">En cours</option>
              <option value="completed">Terminé</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priorité</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" className="w-100">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            {taskToEdit ? "Mettre à jour" : "Ajouter"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm;
