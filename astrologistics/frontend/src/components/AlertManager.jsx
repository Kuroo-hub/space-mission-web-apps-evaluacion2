import { Alert } from "reactstrap";

export default function AlertManager({ alert, onDismiss }) {
  if (!alert?.message) {
    return null;
  }

  return (
    <Alert
      color={alert.type || "info"}
      toggle={onDismiss}
      className="my-3"
    >
      {alert.message}
    </Alert>
  );
}