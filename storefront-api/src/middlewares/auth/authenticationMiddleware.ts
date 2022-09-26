import { Request, Response, NextFunction } from "express";

export const authentication = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const isBearer = authHeader.split(" ")[0];
      const jwtToken = authHeader.split(" ")[1];
      if (isBearer === "Bearer" && jwtToken) {
        next();
      } else {
        res.status(401).json({ msg: "Please Login first", status: 401 });
      }
    } else {
      res.status(401).json({ msg: "Please Login first", status: 401 });
    }
  } catch (err) {
    res.status(401).json({ msg: (err as Error).message, status: 401 });
  }
};
