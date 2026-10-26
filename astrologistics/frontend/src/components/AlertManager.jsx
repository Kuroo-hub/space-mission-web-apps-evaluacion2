import React from 'react';
import { Alert, Container } from 'reactstrap';

export default function AlertManager({ alert, onDismiss }) {
  if (!alert || !alert.message) return null;

  return (
    <Container className="my-3">
      <Alert color={alert.type || 'info'} isOpen={true} toggle={onDismiss}>
        {alert.message}
      </Alert>
    </Container>
  );
}