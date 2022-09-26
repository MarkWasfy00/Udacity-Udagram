import express from "express";
import { authRouter } from "./api/auth";
import { orderRouter } from "./api/order";
import { productRouter } from "./api/product";
import { userRouter } from "./api/user";

export const apiRouter = express.Router();

// this is the mini application that holds all api routes 🔹
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/orders", orderRouter);
