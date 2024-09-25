import { Router } from "express";

import * as returnController from "../controllers/returnController.js";

const router = Router();

router.get("/returns", returnController.getReturns);
router.get("/returns/:id", returnController.getReturnById);
router.post("/returns", returnController.createReturn);
router.put("/returns/:id", returnController.updateReturn);
router.delete("/returns/:id", returnController.deleteReturn);

export default router;
