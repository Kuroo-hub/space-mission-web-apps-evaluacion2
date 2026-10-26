import { Router } from "express"; 
import { getInventoryController } from "../controllers/inventoryController.js";

const router = Router();

router.get("/", getInventoryController);

export default router;