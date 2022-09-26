import { Request, Response, NextFunction } from "express";
import securityConfig from "../../config/env/security.config";
import jwt from "jsonwebtoken";

export const authorization = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const jwtToken = authHeader.split(" ")[1];
      const validToken = jwt.verify(jwtToken, securityConfig.JWT_TOKEN as unknown as string);
      if (validToken) {
        next();
      } else {
        res.status(401).json({ msg: "Expired session please Login" });
      }
    }
  } catch (err) {
    res.status(401).json({ msg: (err as Error).message, status: 401 });
  }
};
