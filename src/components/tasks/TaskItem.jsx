import React, {useState} from "react";
import {Card, Badge, Button, Stack, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faClock,
  faCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import TaskForm from "./TaskForm";
import StatusBadge from "./StatusBadge";
import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

const TaskItem = ({task, onEdit, onDelete, onStatusChange}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const priorityColors = {
    low: "success",
    medium: "warning",
    high: "danger",
  };

  const statusTexts = {
    todo: "À faire",
    "in-progress": "En cours",
    completed: "Terminé",
  };

  const nextStatus = {
    todo: "in-progress",
    "in-progress": "completed",
    completed: "todo",
  };

  const formatDueDate = (date) => {
    if (!date) return "Aucune échéance";
    return moment(date).format("LL");
  };

  const truncateText = (text, maxLength = 100) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "completed";

  const handleStatusChange = async () => {
    setIsUpdatingStatus(true);
    await onStatusChange(task._id, nextStatus[task.status]);
    setIsUpdatingStatus(false);
  };

  return (
    <>
      <Card className={`mb-3 shadow-sm ${isOverdue ? "border-danger" : ""}`}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Stack direction="horizontal" gap={2}>
            <Badge
              bg={priorityColors[task.priority]}
              className="text-capitalize">
              {task.priority}
            </Badge>
            <StatusBadge status={task.status} />
            {isOverdue && <Badge bg="danger">En retard</Badge>}
          </Stack>
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              title="Voir les détails"
              aria-label="Voir les détails"
              onClick={() => setShowDetailsModal(true)}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              title="Modifier la tâche"
              aria-label="Modifier la tâche"
              onClick={() => setShowEditModal(true)}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              title="Supprimer la tâche"
              aria-label="Supprimer la tâche"
              onClick={() => onDelete(task._id)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button
              variant="outline-success"
              size="sm"
              disabled={isUpdatingStatus}
              title={`Marquer comme ${statusTexts[nextStatus[task.status]]}`}
              aria-label={`Changer statut vers ${
                statusTexts[nextStatus[task.status]]
              }`}
              onClick={handleStatusChange}>
              <FontAwesomeIcon
                icon={
                  nextStatus[task.status] === "completed" ? faCheck : faClock
                }
                className="me-1"
              />
              {isUpdatingStatus
                ? "Mise à jour..."
                : `Marquer comme ${statusTexts[nextStatus[task.status]]}`}
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          {task.description && (
            <Card.Text className="text-muted">
              {truncateText(task.description)}
            </Card.Text>
          )}
          {task.dueDate && (
            <div className="mt-2">
              <small className="text-muted">
                <strong>Échéance :</strong> {formatDueDate(task.dueDate)}
              </small>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modal d'édition */}
      <TaskForm
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        taskToEdit={task}
        onSave={onEdit}
      />

      {/* Modal de détails */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de la tâche</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{task.title}</h5>
          <p className="mb-3">{task.description || "Aucune description"}</p>

          <div className="mb-2">
            <strong>Statut :</strong> <StatusBadge status={task.status} />
          </div>

          <div className="mb-2">
            <strong>Priorité :</strong>{" "}
            <Badge bg={priorityColors[task.priority]}>{task.priority}</Badge>
          </div>

          <div className="mb-2">
            <strong>Échéance :</strong> {formatDueDate(task.dueDate)}
          </div>

          {isOverdue && (
            <div className="text-danger mt-3">
              <FontAwesomeIcon icon={faClock} className="me-2" />
              Cette tâche est en retard !
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskItem;
