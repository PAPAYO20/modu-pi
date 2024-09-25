import { Router } from "express";

import * as productController from "../controllers/productController.js";

const router = Router();

router.get("/product", productController.getProducts);
router.post("/product", productController.createProduct);

export default router;
