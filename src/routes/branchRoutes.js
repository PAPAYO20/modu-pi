import { Router } from "express";

import * as branchController from "../controllers/branchController.js";

const router = Router();

router.get("/branch", branchController.getBranches);
router.get("/branch/:id", branchController.getBranch);
router.post("/branch", branchController.createBranch);
router.put("/branch/:id", branchController.updateBranch);
router.delete("/branch/:id", branchController.deleteBranch);

export default router;
