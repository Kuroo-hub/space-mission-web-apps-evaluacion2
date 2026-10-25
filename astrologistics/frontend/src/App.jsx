import {
  Alert,
  Badge,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem,
  ButtonGroup
} from "reactstrap";

import "./App.css";

const inventory = [
  {
    id: 1,
    name: "Tanque de Oxígeno XL",
    category: "Soporte Vital",
    price: 50,
    stock: 3
  },
  {
    id: 2,
    name: "Kit de Alimentos",
    category: "Alimentacion",
    price: 30,
    stock: 10
  },
  {
    id: 3,
    name: "Botiquin Medico",
    category: "Salud",
    price: 75,
    stock: 4
  }
];

function App() {
  return (
    <main className="app-background">
      <Container className="py-4">

        <header className="mb-4">
          <Badge color="success" pill>
            Ejercicio 2
          </Badge>

          <h1 className="fw-bold mt-2">
            AstroLogistics Ltd.
          </h1>

          <p className="text-secondary">
            Centro de Abastecimiento Espacial
          </p>
        </header>

        <Alert color="light">
          <Row>
            <Col xs="6">
              <p>Créditos disponibles</p>
              <h3>
                <Badge color="dark" pill>
                  400 Cr
                </Badge>
              </h3>
            </Col>

            <Col xs="6">
              <p>Costo total de carga</p>
              <h3>
                <Badge color="dark" pill>
                  100 Cr
                </Badge>
              </h3>
            </Col>
          </Row>
        </Alert>
        <Row className="mt-4 g-4">
          <Col xs="12" lg="8">
            <section>
              <h2 className="h4 fw-bold mb-3">
                Catálogo de la Base
              </h2>

              <Row>
                {inventory.map((item) => (
                  <Col xs="12" md="4" key={item.id}>
                    <Card className="mb-3 shadow-sm">
                      <CardBody>
                        <h3 className="h5 fw-bold">
                          {item.name}
                        </h3>

                        <p className="text-secondary">
                          Categoría: {item.category}
                        </p>

                        <Badge color="success" pill>
                          {item.price} Cr
                        </Badge>

                        <p className="mt-3 mb-3">
                          Stock disponible: {item.stock} unidades
                        </p>

                        <Button
                          color={item.stock === 0 ? "secondary" : "success"}
                          className="w-100"
                          disabled={item.stock === 0}
                        >
                          {item.stock === 0
                            ? "Agotado en Base"
                            : "Añadir a la Nave"}
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          </Col>

          <Col xs="12" lg="4">
            <Card className="shadow-sm">
              <CardBody>
                <h2 className="h4 fw-bold">
                  Tu Bodega de Carga
                </h2>

                <p className="text-secondary">
                  Suministros seleccionados para la misión.
                </p>

                <ListGroup>
                  <ListGroupItem>
                    <h3 className="h6 fw-bold">
                      Tanque de Oxígeno XL
                    </h3>

                    <p className="text-secondary mb-3">
                      50 Cr por unidad
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <ButtonGroup size="sm">
                        <Button color="secondary" outline>
                          −
                        </Button>

                        <Button color="secondary" outline>
                          2
                        </Button>

                        <Button color="secondary" outline>
                          +
                        </Button>
                      </ButtonGroup>

                      <Button
                        color="danger"
                        outline
                        size="sm"
                      >
                        Desembarcar
                      </Button>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between">
                      <span>Subtotal</span>
                      <strong>100 Cr</strong>
                    </div>
                  </ListGroupItem>
                </ListGroup>

                <hr />

                <div className="d-flex justify-content-between align-items-center">
                  <strong>Costo total</strong>

                  <Badge color="dark" pill>
                    100 Cr
                  </Badge>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;