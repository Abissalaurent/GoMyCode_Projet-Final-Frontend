// import React, {useState, useEffect, useCallback} from "react";
// import {Alert as BootstrapAlert, Button} from "react-bootstrap";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {
//   faTimes,
//   faCheckCircle,
//   faExclamationTriangle,
//   faInfoCircle,
//   faExclamationCircle,
// } from "@fortawesome/free-solid-svg-icons";

// const Alert = ({
//   message,
//   variant = "info",
//   dismissible = true,
//   autoDismiss = false,
//   dismissTime = 5000,
//   onDismiss,
//   show = true,
//   className = "",
// }) => {
//   const [showAlert, setShowAlert] = useState(show);

//   useEffect(() => {
//     setShowAlert(show);
//   }, [show]);

//   const handleDismiss = useCallback(() => {
//     setShowAlert(false);
//     if (onDismiss) {
//       onDismiss();
//     }
//   }, [onDismiss]);

//   useEffect(() => {
//     if (autoDismiss && showAlert) {
//       const timer = setTimeout(() => {
//         handleDismiss();
//       }, dismissTime);

//       return () => clearTimeout(timer);
//     }
//   }, [showAlert, autoDismiss, dismissTime, handleDismiss]);

//   const getVariantIcon = () => {
//     switch (variant) {
//       case "success":
//         return faCheckCircle;
//       case "warning":
//         return faExclamationTriangle;
//       case "danger":
//         return faExclamationCircle;
//       default:
//         return faInfoCircle;
//     }
//   };

//   if (!showAlert) return null;

//   return (
//     <BootstrapAlert
//       variant={variant}
//       onClose={dismissible ? handleDismiss : null}
//       dismissible={dismissible}
//       className={`d-flex align-items-center ${className}`}>
//       <div className="d-flex align-items-center w-100">
//         <FontAwesomeIcon icon={getVariantIcon()} className="me-3" size="lg" />
//         <div className="flex-grow-1">{message}</div>
//         {dismissible && (
//           <Button
//             variant={`outline-${variant}`}
//             onClick={handleDismiss}
//             className="ms-2 p-0 border-0"
//             aria-label="Fermer">
//             <FontAwesomeIcon icon={faTimes} />
//           </Button>
//         )}
//       </div>
//     </BootstrapAlert>
//   );
// };

// export default Alert;
