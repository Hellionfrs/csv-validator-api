import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";

export function ValidateRequestMiddleware(schema: Schema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}