import { Router } from "express";
import { getCargoController, 
    addCargoController, 
    updateCargoUnitsController, 
    removeCargoController } from "../controllers/cargoController.js";

const router = Router();

router.get("/", getCargoController);
router.post("/agregar", addCargoController);

router.put("/actualizar-unidades/:id", updateCargoUnitsController);
router.delete("/eliminar/:id", removeCargoController);

export default router;