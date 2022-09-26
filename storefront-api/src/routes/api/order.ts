import express from "express";
import {
  addProduct,
  createOrder,
  deleteOrder,
  getOrders,
  orderDetails,
  showOrder,
  updateOrder,
} from "../../controllers/orderController";
import { auth } from "../../middlewares/auth";
import { idRules, orderProductRules, orderRules } from "../../middlewares/validation/routesRulesMiddleware";
import { validate } from "../../middlewares/validation/validateMiddleware";

export const orderRouter = express.Router();

orderRouter.get("/", auth, getOrders);
orderRouter.get("/:id", idRules, validate, auth, showOrder);
orderRouter.get("/:id/products", idRules, validate, auth, orderDetails);

orderRouter.post("/", orderRules, validate, auth, createOrder);
orderRouter.post("/:id/products", idRules, orderProductRules, validate, auth, addProduct);
orderRouter.put("/:id", idRules, validate, auth, updateOrder);
orderRouter.delete("/:id", idRules, validate, auth, deleteOrder);
