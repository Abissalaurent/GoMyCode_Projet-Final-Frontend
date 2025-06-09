import React from "react";
import {Badge} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faCheck} from "@fortawesome/free-solid-svg-icons";

const statusIcons = {
  todo: faClock,
  "in-progress": faClock,
  completed: faCheck,
};

const statusColors = {
  todo: "secondary",
  "in-progress": "primary",
  completed: "success",
};

const statusTexts = {
  todo: "À faire",
  "in-progress": "En cours",
  completed: "Terminé",
};

const StatusBadge = ({status}) => (
  <Badge bg={statusColors[status]}>
    <FontAwesomeIcon icon={statusIcons[status]} className="me-1" />
    {statusTexts[status]}
  </Badge>
);

export default StatusBadge;
