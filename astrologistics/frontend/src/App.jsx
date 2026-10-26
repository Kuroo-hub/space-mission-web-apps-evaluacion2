import React, { useState } from 'react';
import { Container, Row, Col, Navbar, NavbarBrand, Card, CardBody, CardTitle, Table, Button, Badge } from 'reactstrap';
import AlertManager from './components/AlertManager';
import EmptyCargoState from './components/EmptyCargoState';
import CatalogCard from './components/CatalogCard';
import CapacityBar from './components/CapacityBar';
export default function App() {
  // Datos simulados (Mock state)
  const [credits, setCredits] = useState(1500);
  const [maxCapacity] = useState(500); // en kg
  const [currentCapacity, setCurrentCapacity] = useState(120);

  const [catalog, setCatalog] = useState([
    { id: 1, name: 'Tanque de Oxígeno', cost: 150, weight: 30, stock: 5, description: 'Suministro de aire comprimido.' },
    { id: 2, name: 'Batería de Litio', cost: 300, weight: 50, stock: 2, description: 'Energía auxiliar de alto rendimiento.' },
    { id: 3, name: 'Raciones de Comida', cost: 50, weight: 10, stock: 0, description: 'Paquete de alimento deshidratado.' }
  ]);

  const [cargo, setCargo] = useState([
    { id: 1, name: 'Tanque de Oxígeno', quantity: 4, weightTotal: 120, costTotal: 600 }
  ]);

  const [alert, setAlert] = useState(null);

  // Simulación de interacción visual
  const handleAddCargo = (item, quantity) => {
    const totalCost = item.cost * quantity;
    const totalWeight = item.weight * quantity;

    if (credits < totalCost) {
      setAlert({ type: 'danger', message: '¡Créditos insuficientes para realizar esta carga!' });
      return;
    }

    if (currentCapacity + totalWeight > maxCapacity) {
      setAlert({ type: 'danger', message: '¡Capacidad máxima de la nave excedida!' });
      return;
    }

    // Actualizar créditos y capacidad
    setCredits(prev => prev - totalCost);
    setCurrentCapacity(prev => prev + totalWeight);

    // Actualizar stock local
    setCatalog(prev => prev.map(c => c.id === item.id ? { ...c, stock: c.stock - quantity } : c));

    // Agregar a la bodega
    setCargo(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + quantity, weightTotal: c.weightTotal + totalWeight } : c);
      }
      return [...prev, { id: item.id, name: item.name, quantity, weightTotal: totalWeight, costTotal: totalCost }];
    });

    setAlert({ type: 'success', message: `Se agregaron ${quantity} unidad(es) de ${item.name} a la bodega.` });
  };

  const handleRemoveCargo = (item) => {
    setCredits(prev => prev + item.costTotal);
    setCurrentCapacity(prev => prev - item.weightTotal);
    setCargo(prev => prev.filter(c => c.id !== item.id));
    setCatalog(prev => prev.map(c => c.id === item.id ? { ...c, stock: c.stock + item.quantity } : c));
    setAlert({ type: 'info', message: `Se retiró ${item.name} de la bodega.` });
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Encabezado */}
      <Navbar color="dark" dark expand="md" className="mb-4">
        <Container>
          <NavbarBrand href="/">🛸 AstroLogistics System</NavbarBrand>
        </Container>
      </Navbar>

      <Container>
        {/* Administrador de Alertas */}
        <AlertManager alert={alert} onDismiss={() => setAlert(null)} />

        {/* Panel de Créditos y Estado General */}
        <Row className="mb-4">
          <Col md={12}>
            <Card className="shadow-sm border-0 bg-dark text-white">
              <CardBody className="d-flex justify-content-between align-items-center">
                <div>
                  <CardTitle tag="h5" className="mb-0">Créditos Disponibles</CardTitle>
                  <small className="text-muted">Fondos para la adquisición de suministros</small>
                </div>
                <h2><Badge color="warning" pill>${credits}</Badge></h2>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Barra de Capacidad Extra */}
        <CapacityBar currentCapacity={currentCapacity} maxCapacity={maxCapacity} />

        {/* Catálogo de Suministros */}
        <h4 className="mb-3">Catálogo de Equipamiento</h4>
        <Row className="mb-5">
          {catalog.map((item) => (
            <Col md={4} key={item.id} className="mb-3">
              <CatalogCard item={item} onAddCargo={handleAddCargo} />
            </Col>
          ))}
        </Row>

        {/* Bodega de Carga */}
        <h4 className="mb-3">Bodega de Carga Actual</h4>
        {cargo.length === 0 ? (
          <EmptyCargoState />
        ) : (
          <Card className="shadow-sm">
            <CardBody>
              <Table responsive hover align="middle">
                <thead>
                  <tr>
                    <th>Ítem</th>
                    <th>Cantidad</th>
                    <th>Peso Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cargo.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-bold">{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.weightTotal} kg</td>
                      <td>
                        <Button color="outline-danger" size="sm" onClick={() => handleRemoveCargo(item)}>
                          Retirar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        )}
      </Container>
    </div>
  );
}