import {useState} from "react";

import { Badge, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Alert } from 'reactstrap';

import { adjustTemperature, rebootReactor } from './services/reactorService';

import './App.css';

export default function App() {
  const [temperature, setTemperature] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [stabilized, setStabilized] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event)
  {
    event.preventDefault();

    const number = Number(temperature);

    if(temperature.trim() === "" || !Number.isInteger(number) || number < 1 || number > 100){
      setMessage("Porfavor ingresar un numero entre 1 y 100.");
      return;
    }

    try
    {
      setLoading(true);

      const data = await adjustTemperature(number);

      setMessage(data.result);
      setStabilized(data.stabilized);

      if(!data.stabilized)
        {
          setHistory(previousHistory =>[
            ...previousHistory,
            number
          ]);
        }

      setTemperature("");
    }
    catch(error)
    {
      setMessage(error.message);
    }
    finally
    {
      setLoading(false);
    }
  }

  async function handleReboot()
  {
    try
    {
      setLoading(true);

      await rebootReactor();
      
      setTemperature("");
      setMessage("Reactor reiniciado. Nueva estabilizacion de temperatura generada.");
      setHistory([]);
      setStabilized(false);
    }
    catch(error)
    {
      setMessage(error.message);
    }
    finally
    {
      setLoading(false);
    }
  }

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

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="temperatura" className="fw-semibold">
                  Temperatura (1 a 100)
                </Label>
                <Input
                  id="temperatura"
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                  placeholder="Ej: 25"
                  bsSize="lg"
                  value={temperature}
                  onChange={(event) => setTemperature(event.target.value)}
                  disabled={stabilized || loading}
                />
              </FormGroup>
              <Button  color="success" size="lg" className="w-100" type="submit" disabled={loading || stabilized}>
                {loading ? "Procesando..." : "Enviar ajuste"}
              </Button>
            </Form>
            {
              message && (
                <Alert color={stabilized ? "success" : "info"} className="mt-3">
                  {message}
                </Alert>
              )
            }
            <hr className="my-4" />
            <h3 className="h6 text-dark">Registro de temperaturas</h3>
            {
              history.length === 0 ?
              (
                <p className="text-muted mb-0">
                  No hay intentos
                </p>
              ) : (
                <ul>
                  {
                    history.map((number, index) => (
                      <li key={index}>
                        Intentos {index + 1} : {number}
                      </li>
                    ))
                  }
                </ul>
              )
            }
            <Button color="danger" outline className="w-100 mt-3" onClick={handleReboot} disabled={loading}>
              Reiniciar Reactor
            </Button>
          </CardBody>
        </Card>
      </Container>
    </main>
  );
}