import { Router } from "express";
import { getCargoController, addCargoController } from "../controllers/cargoController.js";

const router = Router();

router.get("/", getCargoController);
router.post("/agregar", addCargoController);

export default router;