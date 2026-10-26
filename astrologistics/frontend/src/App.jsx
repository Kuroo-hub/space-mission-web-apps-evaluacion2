import { useCallback, useEffect, useState } from "react";

import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Navbar,
  NavbarBrand,
  Row
} from "reactstrap";

import AlertManager from "./components/AlertManager.jsx";
import EmptyCargoState from "./components/EmptyCargoState.jsx";
import CatalogCard from "./components/CatalogCard.jsx";

import {
  getInventory,
  getCargo,
  addCargo,
  updateCargoUnits,
  removeCargo
} from "./services/logisticsService.js";

import "./App.css";

export default function App() {
  const [catalog, setCatalog] = useState([]);

  const [cargo, setCargo] = useState({
    credits: 0,
    itemsCargados: [],
    total: 0
  });

  const [loading, setLoading] = useState(true);
  const [pendingAction, setPendingAction] = useState(null);
  const [alert, setAlert] = useState(null);

  const refreshData = useCallback(async () => {
    const [inventoryData, cargoData] = await Promise.all([
      getInventory(),
      getCargo()
    ]);

    setCatalog(inventoryData);
    setCargo(cargoData);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        await refreshData();
      } catch (error) {
        setAlert({
          type: "danger",
          message: `No se pudieron cargar los datos: ${error.message}`
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [refreshData]);

  async function handleAddCargo(item, quantity) {
    setPendingAction(`add-${item.id}`);
    setAlert(null);

    try {
      const result = await addCargo(item.id, quantity);

      await refreshData();

      setAlert({
        type: "success",
        message: result.message || "Suministro agregado correctamente."
      });
    } catch (error) {
      setAlert({
        type: "warning",
        message: error.message
      });
    } finally {
      setPendingAction(null);
    }
  }

  async function handleUpdateQuantity(itemId, quantity) {
    if (quantity < 1) {
      return;
    }

    setPendingAction(`update-${itemId}`);
    setAlert(null);

    try {
      const result = await updateCargoUnits(itemId, quantity);

      await refreshData();

      setAlert({
        type: "success",
        message: result.message || "Unidades actualizadas correctamente."
      });
    } catch (error) {
      setAlert({
        type: "warning",
        message: error.message
      });
    } finally {
      setPendingAction(null);
    }
  }

  async function handleRemoveCargo(itemId) {
    setPendingAction(`remove-${itemId}`);
    setAlert(null);

    try {
      const result = await removeCargo(itemId);

      await refreshData();

      setAlert({
        type: "success",
        message: result.message || "Suministro eliminado de la carga."
      });
    } catch (error) {
      setAlert({
        type: "warning",
        message: error.message
      });
    } finally {
      setPendingAction(null);
    }
  }

  const isBusy = pendingAction !== null;

  return (
    <main className="app-background">
      <Navbar color="dark" dark>
        <Container>
          <NavbarBrand>
            🛸 AstroLogistics Ltd.
          </NavbarBrand>
        </Container>
      </Navbar>

      <Container className="py-4">
        <header className="mb-4">
          <Badge color="success" pill>
            Ejercicio 2
          </Badge>

          <h1 className="fw-bold mt-2 mb-2">
            Centro de Abastecimiento
          </h1>

          <p className="text-secondary">
            Prepara el equipamiento para tu próxima misión espacial.
          </p>
        </header>

        <AlertManager
          alert={alert}
          onDismiss={() => setAlert(null)}
        />

        <Alert color="secondary" className="mission-summary shadow-sm">
          <Row className="align-items-center g-3">
            <Col xs="12" sm="6">
              <span className="summary-label">
                Créditos disponibles
              </span>

              <div className="summary-value">
                <Badge color="dark" pill>
                  {loading ? "..." : `${cargo.credits} Cr`}
                </Badge>
              </div>
            </Col>

            <Col xs="12" sm="6">
              <span className="summary-label">
                Costo total de carga
              </span>

              <div className="summary-value">
                <Badge color="dark" pill>
                  {loading ? "..." : `${cargo.total} Cr`}
                </Badge>
              </div>
            </Col>
          </Row>
        </Alert>

        <Row className="g-4">
          <Col xs="12" lg="8">
            <section>
              <div className="d-flex justify-content-between align-items-center gap-2 mb-3">
                <div>
                  <h2 className="h4 fw-bold mb-1">
                    Catálogo de la Base
                  </h2>

                  <p className="text-secondary mb-0">
                    Selecciona los suministros para tu nave.
                  </p>
                </div>

                <Badge color="secondary" pill>
                  {catalog.length} suministros
                </Badge>
              </div>

              {loading ? (
                <p className="text-secondary">
                  Cargando suministros...
                </p>
              ) : catalog.length === 0 ? (
                <p className="text-secondary">
                  No hay suministros disponibles.
                </p>
              ) : (
                <Row className="g-3">
                  {catalog.map((item) => (
                    <Col xs="12" md="6" xl="4" key={item.id}>
                      <CatalogCard
                        item={item}
                        onAddCargo={handleAddCargo}
                        disabled={isBusy}
                        loading={pendingAction === `add-${item.id}`}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </section>
          </Col>

          <Col xs="12" lg="4">
            <Card className="cargo-panel shadow-sm border-0">
              <CardBody className="p-4">
                <h2 className="h4 fw-bold mb-2">
                  Tu Bodega de Carga
                </h2>

                <p className="text-secondary small mb-3">
                  Suministros seleccionados para la misión.
                </p>

                {loading ? (
                  <p className="text-secondary">
                    Cargando bodega...
                  </p>
                ) : cargo.itemsCargados.length === 0 ? (
                  <EmptyCargoState />
                ) : (
                  <ListGroup flush>
                    {cargo.itemsCargados.map((item) => {
                      const product = catalog.find(
                        (product) => product.id === item.id
                      );

                      const name =
                        product?.name || `Suministro ${item.id}`;

                      const price = product?.price ?? 0;

                      return (
                        <ListGroupItem
                          key={item.id}
                          className="cargo-list-item"
                        >
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <div>
                              <h3 className="h6 fw-bold mb-1">
                                {name}
                              </h3>

                              <span className="text-secondary small">
                                {price} Cr por unidad
                              </span>
                            </div>

                            <Badge color="success" pill>
                              {item.quantity} u.
                            </Badge>
                          </div>

                          <div className="d-flex justify-content-between align-items-center gap-2 mt-3">
                            <ButtonGroup size="sm">
                              <Button
                                color="secondary"
                                outline
                                disabled={isBusy || item.quantity <= 1}
                                aria-label={`Restar una unidad de ${name}`}
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                              >
                                −
                              </Button>

                              <Button color="light" disabled>
                                {item.quantity}
                              </Button>

                              <Button
                                color="secondary"
                                outline
                                disabled={
                                  isBusy ||
                                  !product ||
                                  product.stock <= 0
                                }
                                aria-label={`Añadir una unidad de ${name}`}
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                              >
                                +
                              </Button>
                            </ButtonGroup>

                            <Button
                              color="danger"
                              outline
                              size="sm"
                              disabled={isBusy}
                              onClick={() => handleRemoveCargo(item.id)}
                            >
                              Desembarcar
                            </Button>
                          </div>
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                )}

                <div className="cargo-total mt-3 pt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-secondary">
                      Costo total
                    </span>

                    <Badge color="dark" pill>
                      {cargo.total} Cr
                    </Badge>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <footer className="text-center text-secondary small mt-5">
          AstroLogistics Ltd. · Sistema de gestión de suministros
        </footer>
      </Container>
    </main>
  );
}