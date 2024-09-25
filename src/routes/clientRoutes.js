import { Router } from "express";

import * as clientController from "../controllers/clientController.js";

const router = Router();

router.get("/client", clientController.getClients);
router.post("/client", clientController.createClient);

export default router;
