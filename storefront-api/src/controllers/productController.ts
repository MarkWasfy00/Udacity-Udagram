import { Request, Response } from "express";
import { FullMessage, ReturnMessage } from "../functions/types/ResponseHandler";
import Product from "../models/productModel";

const PRODUCT = new Product();

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await PRODUCT.create(req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await PRODUCT.index();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const showProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await PRODUCT.show(req.params.id as unknown as number);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await PRODUCT.update(req.params.id as unknown as number, req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await PRODUCT.destroy(req.params.id as unknown as number);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};
