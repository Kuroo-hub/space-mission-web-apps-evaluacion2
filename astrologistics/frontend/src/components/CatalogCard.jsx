import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Badge, Input, FormGroup, Label } from 'reactstrap';

export default function CatalogCard({ item, onAddCargo }) {
  const [quantity, setQuantity] = useState(1);
  const isAgotado = item.stock <= 0;

  const handleAdd = () => {
    if (quantity > 0 && quantity <= item.stock) {
      onAddCargo(item, Number(quantity));
    }
  };

  return (
    <Card className={`h-100 shadow-sm ${isAgotado ? 'opacity-75 bg-light' : ''}`}>
      <CardBody className="d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <CardTitle tag="h5" className="mb-0">{item.name}</CardTitle>
            <Badge color={isAgotado ? 'danger' : 'secondary'}>
              {isAgotado ? 'Agotado' : `Stock: ${item.stock}`}
            </Badge>
          </div>
          <CardSubtitle tag="h6" className="text-muted mb-2">
            Costo: ${item.cost} | Peso: {item.weight} kg
          </CardSubtitle>
          <CardText>{item.description || 'Suministro esencial para la expedición.'}</CardText>
        </div>

        <div className="mt-3">
          {!isAgotado && (
            <FormGroup tag="fieldset" className="mb-2">
              <Label for={`quantity-${item.id}`} hidden>Cantidad</Label>
              <Input
                type="number"
                id={`quantity-${item.id}`}
                min="1"
                max={item.stock}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Cantidad"
              />
            </FormGroup>
          )}

          <Button
            color={isAgotado ? 'secondary' : 'primary'}
            block
            disabled={isAgotado}
            onClick={handleAdd}
          >
            {isAgotado ? 'Suministro Agotado' : 'Cargar a Nave'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}