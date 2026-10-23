import { Badge, Button, Card, CardBody, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import './App.css';

export default function App() {
  return (
    <main className="app-background">
      <Container className="py-5">
        <header className="text-center mb-4">
          <Badge color="success" pill className="mb-2">Ejercicio 1</Badge>
          <h1 className="fw-bold">Estabiliza el Reactor</h1>
          <p className="text-dark mx-auto intro-text">
            El servidor eligió una temperatura de estabilización entre 1 y 100.
            Ingresa una temperatura y descubre si el reactor está frío, caliente o estable.
          </p>
        </header>

        <Card className="game-card shadow-sm">
          <CardBody className="p-4">
            <h2 className="h5 mb-3">Ajuste de temperatura</h2>

            <Form>
              <FormGroup>
                <Label for="temperatura" className="fw-semibold">
                  Temperatura (1 a 100)
                </Label>
                <Input
                  id="temperatura"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Ej: 25"
                  bsSize="lg"
                />
              </FormGroup>
              <Button  color="success" size="lg" className="w-100" type="submit">
                Enviar ajuste
              </Button>
            </Form>

            <hr className="my-4" />
            <h3 className="h6 text-dark">Registro de temperaturas</h3>
            <p className="text-muted mb-0">Aún no hay intentos.</p>
          </CardBody>
        </Card>
      </Container>
    </main>
  );
}