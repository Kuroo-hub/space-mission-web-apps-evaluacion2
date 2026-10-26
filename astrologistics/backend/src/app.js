import express from "express";
import cors from "cors";

import inventoryRoutes from "./routes/inventoryRoutes.js";
import cargoRoutes from "./routes/cargoRoutes.js";

// Configuramos la aplicacion
const app = express();

app.use(cors());
app.use(express.json());

// Esta ruta es solo de prueba
app.get("/", (req, res) =>{
    res.status(200).json({
        message: "Astrologistics API funciona correctamente"
    });
});

app.use("/api/inventario", inventoryRoutes);
app.use("/api/carga", cargoRoutes);

export default app;