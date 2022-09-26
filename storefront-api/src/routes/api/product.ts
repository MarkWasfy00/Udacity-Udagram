import express from "express";
import { idRules, productRules } from "../../middlewares/validation/routesRulesMiddleware";
import {
  createProduct,
  deleteProduct,
  getProducts,
  showProduct,
  updateProduct,
} from "../../controllers/productController";
import { validate } from "../../middlewares/validation/validateMiddleware";

export const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", idRules, validate, showProduct);

productRouter.post("/", productRules, validate, createProduct);
productRouter.put("/:id", idRules, validate, updateProduct);
productRouter.delete("/:id", idRules, validate, deleteProduct);
