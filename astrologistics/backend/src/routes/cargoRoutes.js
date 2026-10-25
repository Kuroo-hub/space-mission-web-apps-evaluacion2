import { Router } from "express";
import { getCargoController } from "../controllers/cargoController.js";

const router = Router();

router.get("/", getCargoController);

export default router;