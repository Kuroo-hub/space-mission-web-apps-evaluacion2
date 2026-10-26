import React from 'react';
import { Progress, Card, CardBody, CardTitle } from 'reactstrap';

export default function CapacityBar({ currentCapacity, maxCapacity }) {
  const percentage = Math.min(Math.round((currentCapacity / maxCapacity) * 100), 100);
  
  let progressColor = 'success';
  if (percentage > 70) progressColor = 'warning';
  if (percentage >= 95) progressColor = 'danger';

  return (
    <Card className="mb-4 shadow-sm">
      <CardBody>
        <CardTitle tag="h6" className="d-flex justify-content-between">
          <span>Capacidad de Carga de la Nave</span>
          <span>{currentCapacity} / {maxCapacity} kg ({percentage}%)</span>
        </CardTitle>
        <Progress value={percentage} color={progressColor} style={{ height: '15px' }} />
      </CardBody>
    </Card>
  );
}