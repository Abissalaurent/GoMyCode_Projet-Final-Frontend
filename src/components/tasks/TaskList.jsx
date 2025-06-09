import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Dropdown,
  DropdownButton,
  Stack,
  Badge,
  Alert,
  Spinner,
  Modal,
  ButtonGroup,
  Pagination,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faSearch,
  faSort,
  faSyncAlt,
  faQuestionCircle,
  faList,
  faThLarge,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { TaskContext } from "../../context/TaskContext";

const TaskList = () => {
  const { tasks, loading, error, updateTask, deleteTask, fetchTasks } =
    useContext(TaskContext);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    sortBy: "dueDate",
    sortOrder: "asc",
  });

  // Pagination & view state
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [viewMode, setViewMode] = useState("list");
  const [showHelp, setShowHelp] = useState(false);

  // Gestion des tâches
  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowTaskForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      await deleteTask(id);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const task = tasks.find((t) => t._id === id);
    if (task) {
      await updateTask(id, { ...task, status: newStatus });
    }
  };

  // Filtrage et tri des tâches
  const filteredTasks = tasks ? tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filters.status === "all" || task.status === filters.status;
    const matchesPriority =
      filters.priority === "all" || task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  }) : [];

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (filters.sortBy === "dueDate") {
      const dateA = a.dueDate ? new Date(a.dueDate) : new Date(0);
      const dateB = b.dueDate ? new Date(b.dueDate) : new Date(0);
      return filters.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (filters.sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return filters.sortOrder === "asc"
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    } else {
      return filters.sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
  });

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Statistiques
  const taskStats = {
    total: tasks ? tasks.length : 0,
    completed: tasks ? tasks.filter((t) => t.status === "completed").length : 0,
    inProgress: tasks ? tasks.filter((t) => t.status === "in-progress").length : 0,
    todo: tasks ? tasks.filter((t) => t.status === "todo").length : 0,
    overdue: tasks ? tasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) < new Date() &&
        t.status !== "completed"
    ).length : 0,
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error}
      </Alert>
    );
  }

  return (
    <Container className="mt-4">
      {/* En-tête avec boutons et statistiques */}
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <h2>
            Mes Tâches
            <Button
              variant="outline-secondary"
              size="sm"
              className="ms-3"
              onClick={fetchTasks}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faSyncAlt} spin={loading} />
            </Button>
          </h2>
        </Col>
        <Col md={6} className="text-end">
          <ButtonGroup className="me-2">
            <Button
              variant={viewMode === "list" ? "primary" : "outline-secondary"}
              onClick={() => setViewMode("list")}
              title="Mode Liste"
            >
              <FontAwesomeIcon icon={faList} />
            </Button>
            <Button
              variant={viewMode === "grid" ? "primary" : "outline-secondary"}
              onClick={() => setViewMode("grid")}
              title="Mode Grille"
            >
              <FontAwesomeIcon icon={faThLarge} />
            </Button>
          </ButtonGroup>
          <Button
            variant="success"
            onClick={() => {
              setCurrentTask(null);
              setShowTaskForm(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Nouvelle Tâche
          </Button>
        </Col>
      </Row>

      {/* Statistiques */}
      <Row className="mb-4">
        <Col>
          <Stack direction="horizontal" gap={3} className="flex-wrap">
            <Badge bg="primary" pill>
              Total: {taskStats.total}
            </Badge>
            <Badge bg="success" pill>
              Terminées: {taskStats.completed}
            </Badge>
            <Badge bg="warning" pill>
              En cours: {taskStats.inProgress}
            </Badge>
            <Badge bg="secondary" pill>
              À faire: {taskStats.todo}
            </Badge>
            {taskStats.overdue > 0 && (
              <Badge bg="danger" pill>
                En retard: {taskStats.overdue}
              </Badge>
            )}
          </Stack>
        </Col>
      </Row>

      {/* Barre de filtres et recherche */}
      <Row className="mb-4 g-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Rechercher des tâches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={2}>
          <DropdownButton
            variant="outline-secondary"
            title={
              <>
                <FontAwesomeIcon icon={faFilter} className="me-2" />
                {filters.status === "all"
                  ? "Statut"
                  : filters.status === "completed"
                  ? "Terminé"
                  : filters.status === "in-progress"
                  ? "En cours"
                  : "À faire"}
              </>
            }
          >
            <Dropdown.Item
              onClick={() => setFilters({ ...filters, status: "all" })}
            >
              Tous
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setFilters({ ...filters, status: "todo" })}
            >
              À faire
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setFilters({ ...filters, status: "in-progress" })}
            >
              En cours
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setFilters({ ...filters, status: "completed" })}
            >
              Terminé
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col md={2}>
          <DropdownButton
            variant="outline-secondary"
            title={
              <>
                <FontAwesomeIcon icon={faFilter} className="me-2" />
                {filters.priority === "all"
                  ? "Priorité"
                  : filters.priority.charAt(0).toUpperCase() +
                    filters.priority.slice(1)}
              </>
            }
          >
            <Dropdown.Item
              onClick={() => setFilters({ ...filters, priority: "all" })}
            >
              Toutes
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setFilters({ ...filters, priority: "high" })}
            >
              Haute
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setFilters({ ...filters, priority: "medium" })}
            >
              Moyenne
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setFilters({ ...filters, priority: "low" })}
            >
              Basse
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col md={2}>
          <DropdownButton
            variant="outline-secondary"
            title={
              <>
                <FontAwesomeIcon icon={faSort} className="me-2" />
                Trier par
              </>
            }
          >
            <Dropdown.Item
              onClick={() =>
                setFilters({
                  ...filters,
                  sortBy: "dueDate",
                  sortOrder:
                    filters.sortBy === "dueDate"
                      ? filters.sortOrder === "asc"
                        ? "desc"
                        : "asc"
                      : "asc",
                })
              }
            >
              Date d'échéance{" "}
              {filters.sortBy === "dueDate" &&
                (filters.sortOrder === "asc" ? "↑" : "↓")}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                setFilters({
                  ...filters,
                  sortBy: "priority",
                  sortOrder:
                    filters.sortBy === "priority"
                      ? filters.sortOrder === "asc"
                        ? "desc"
                        : "asc"
                      : "asc",
                })
              }
            >
              Priorité{" "}
              {filters.sortBy === "priority" &&
                (filters.sortOrder === "asc" ? "↑" : "↓")}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() =>
                setFilters({
                  ...filters,
                  sortBy: "title",
                  sortOrder:
                    filters.sortBy === "title"
                      ? filters.sortOrder === "asc"
                        ? "desc"
                        : "asc"
                      : "asc",
                })
              }
            >
              Titre{" "}
              {filters.sortBy === "title" &&
                (filters.sortOrder === "asc" ? "↑" : "↓")}
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

      {/* Liste des tâches */}
      {sortedTasks.length === 0 ? (
        <Alert variant="info">Aucune tâche trouvée.</Alert>
      ) : (
        <Row>
          {currentTasks.map((task) => (
            <Col key={task._id} xs={12} className="mb-3">
              <TaskItem
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      {sortedTasks.length > tasksPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else if (currentPage <= 3) {
                pageNumber = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + index;
              } else {
                pageNumber = currentPage - 2 + index;
              }
              return (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}

      {/* Modal pour créer/modifier une tâche */}
      <TaskForm
        show={showTaskForm}
        handleClose={() => setShowTaskForm(false)}
        taskToEdit={currentTask}
      />

      {/* Modal d'aide */}
      <Modal show={showHelp} onHide={() => setShowHelp(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faQuestionCircle} className="me-2" />
            Aide - Gestion des Tâches
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Comment utiliser l'application</h5>
          <ul>
            <li>
              <strong>Créer une tâche:</strong> Cliquez sur "Nouvelle Tâche" et
              remplissez le formulaire
            </li>
            <li>
              <strong>Modifier une tâche:</strong> Cliquez sur l'icône{" "}
              <FontAwesomeIcon icon={faEdit} /> sur une tâche
            </li>
            <li>
              <strong>Supprimer une tâche:</strong> Cliquez sur l'icône{" "}
              <FontAwesomeIcon icon={faTrash} /> sur une tâche
            </li>
            <li>
              <strong>Filtrer les tâches:</strong> Utilisez les menus déroulants
              en haut de la page
            </li>
            <li>
              <strong>Rechercher:</strong> Utilisez la barre de recherche pour
              trouver des tâches spécifiques
            </li>
            <li>
              <strong>Changer de vue:</strong> Utilisez les boutons{" "}
              <FontAwesomeIcon icon={faList} /> et{" "}
              <FontAwesomeIcon icon={faThLarge} /> pour changer entre vue liste et
              grille
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TaskList;

