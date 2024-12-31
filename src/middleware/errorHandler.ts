import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ErrorClass } from "../utils/error";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (error instanceof ErrorClass) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    error: "Something went wrong!",
  });
};
