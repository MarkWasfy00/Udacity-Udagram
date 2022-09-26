import { Request, Response } from "express";
import { FullMessage, ReturnMessage } from "../functions/types/ResponseHandler";
import Order from "../models/orderModel";

const ORDER = new Order();

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await ORDER.create(req.body.user_id, req.body.is_complete);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const getOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await ORDER.index();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const showOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await ORDER.show(req.params.id as unknown as number);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await ORDER.update(req.params.id as unknown as number, req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await ORDER.destroy(req.params.id as unknown as number);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await ORDER.addProduct(
      req.params.id as unknown as number,
      req.body.productId,
      req.body.quantity
    );
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const orderDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await ORDER.orderDetails(req.params.id as unknown as number);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};
