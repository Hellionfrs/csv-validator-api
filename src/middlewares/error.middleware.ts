import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import ExpressReviewsError from "../utils/newError.utils";
import { formatErrors } from "../utils/formatErrors.utils";


export default function errorHandler(
  error: Error | ZodError | ExpressReviewsError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    res.status(400).json({
      ok: false,
      message: "Error en validación",
      details: formatErrors(error),
    });
  } else if (error instanceof ExpressReviewsError) {
    res.status(error.statusCode).json({
      ok: false,
      message: error.message,
      details: {
        type: error.type,
        details: error.details,
        timestamp: error.timesTamp,
        techInfo: error.techInfo,
      },
    });
  } else {
    res.status(400).json({
      ok: false,
      error: {
        message: "Error interno del servidor",
      },
    });
  }
}