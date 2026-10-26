import React from 'react';
import { Card, CardBody, CardText } from 'reactstrap';

export default function EmptyCargoState() {
  return (
    <Card className="text-center my-4 border-dashed p-4 bg-light">
      <CardBody>
        <span style={{ fontSize: '3rem' }}>📦</span>
        <CardText className="text-muted mt-2">
          La bodega de carga está vacía. Selecciona un suministro del catálogo para cargarlo a la nave.
        </CardText>
      </CardBody>
    </Card>
  );
}