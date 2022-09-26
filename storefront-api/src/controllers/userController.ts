import { Request, Response } from "express";
import { FullMessage, ReturnMessage } from "../functions/types/ResponseHandler";
import securityConfig from "../config/env/security.config";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const USER = new User();

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await USER.create(req.body);
    if ("data" in result) {
      const userToken = jwt.sign(result.data, securityConfig.JWT_TOKEN as unknown as string, {
        expiresIn: "3h", // it will be expired after 3 hours
      });
      res.status(result.status).json({ user: result, userToken });
    } else {
      res.status(result.status).json(result);
    }
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await USER.index();
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const showUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await USER.show(req.params.id as unknown as number);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await USER.update(req.params.id as unknown as number, req.body);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await USER.destroy(req.params.id as unknown as number);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};

export const authUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: FullMessage | ReturnMessage = await USER.auth(req.body.email, req.body.password);
    if ("data" in result) {
      const userToken = jwt.sign(result.data, securityConfig.JWT_TOKEN as unknown as string, {
        expiresIn: "3h", // it will be expired after 3 hours
      });
      res.status(result.status).json({ user: result, userToken });
    } else {
      res.status(result.status).json(result);
    }
  } catch (err) {
    res.status(400).json({ msg: (err as Error).message, status: 400 });
  }
};
