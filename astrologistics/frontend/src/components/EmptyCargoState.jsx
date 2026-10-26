import { Card, CardBody, CardText } from "reactstrap";

export default function EmptyCargoState() {
  return (
    <Card className="text-center border-0 bg-light my-3">
      <CardBody className="py-4">
        <div className="fs-1 mb-2">📦</div>

        <h3 className="h6 fw-bold">
          Bodega vacía
        </h3>

        <CardText className="text-secondary mb-0">
          Selecciona un suministro del catálogo para
          añadirlo a la nave.
        </CardText>
      </CardBody>
    </Card>
  );
}