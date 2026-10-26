const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Generamos el numero random que seria el estabilizador de la temperatura
function generateRandomNumber()
{
    return Math.floor(Math.random() * 100) + 1;
}

// Lo guardamos en una variable
let stabilizationTemperature = generateRandomNumber();

// Generamos la primera ruta 
app.post("/adjust", (req, res) =>{
    const {number} = req.body;
    
    // Validaciones... typeof es un operador que permite conocer el tipo de dato de la variable o dato entregado.
    if(typeof number !== "number"|| !Number.isInteger(number) || number < 1 || number > 100)
        {
            return res.status(400).json({error: "Porfavor ingresar un numero entre 1 y 100."})
        }
    
    // Variables para guardar el mensaje y facilitar el uso del frontend
    let result = ""; 
    let stabilized = false;
    if(number < stabilizationTemperature)
        {
            result = "El reactor esta frio. Sube la temperatura.";
        }else if(number > stabilizationTemperature)
            {
                result = "El reactor esta caliente. Baja la temperatura";
            }else 
                {
                    result = "El reactor esta estable. No es necesario ajustarla.";
                    stabilized = true;
                }
    
    res.status(200).json({result, stabilized});
});

// Ruta para reiniciar el numero
app.post("/reboot", (req, res) => {
    stabilizationTemperature = generateRandomNumber();
    res.status(200).json({message: "Reactor reiniciado. Nueva estabilizacion de temperatura generada."});
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});