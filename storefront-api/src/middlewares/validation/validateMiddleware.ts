import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// validate the query 📝
export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    // gets the first error in the array and displayed in json form 🔀
    const errorMessage = { msg: `${errors.array()[0].param} ${errors.array()[0].msg}`, status: 400 };
    res.status(400).json(errorMessage);
  }
};
