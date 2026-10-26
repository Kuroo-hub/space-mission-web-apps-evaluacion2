import { useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default function CatalogCard({
  item,
  onAddCargo,
  disabled = false,
  loading = false
}) {
  const [quantity, setQuantity] = useState("1");

  const isAgotado = item.stock <= 0;

  const parsedQuantity = Number(quantity);

  const validQuantity =
    Number.isInteger(parsedQuantity) &&
    parsedQuantity >= 1 &&
    parsedQuantity <= item.stock;

  function handleAdd() {
    if (!validQuantity || disabled || loading) {
      return;
    }

    onAddCargo(item, parsedQuantity);
  }

  return (
    <Card
      className={`supply-card h-100 shadow-sm ${
        isAgotado ? "opacity-75" : ""
      }`}
    >
      <CardBody className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <CardTitle tag="h3" className="h5 fw-bold mb-0">
            {item.name}
          </CardTitle>

          <Badge color={isAgotado ? "secondary" : "success"}>
            {isAgotado ? "Agotado" : `${item.stock} unidades`}
          </Badge>
        </div>

        <CardSubtitle className="text-secondary mb-2">
          {item.category}
        </CardSubtitle>

        <CardText>
          Precio por unidad:{" "}
          <Badge color="success" pill>
            {item.price} Cr
          </Badge>
        </CardText>

        <div className="mt-auto">
          {!isAgotado && (
            <FormGroup className="mb-3">
              <Label for={`quantity-${item.id}`}>
                Cantidad
              </Label>

              <Input
                id={`quantity-${item.id}`}
                type="number"
                min="1"
                max={item.stock}
                step="1"
                value={quantity}
                disabled={disabled || loading}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </FormGroup>
          )}

          <Button
            color={isAgotado ? "secondary" : "success"}
            className="w-100"
            disabled={
              isAgotado ||
              disabled ||
              loading ||
              !validQuantity
            }
            onClick={handleAdd}
          >
            {loading
              ? "Añadiendo..."
              : isAgotado
                ? "Agotado en Base"
                : "Añadir a la Nave"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}