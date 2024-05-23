/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

export const handleError = (res: Response, err: any) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  if (err?.code === 11000) {
    message = `Product with name "${err.keyValue.name}" already exists`;
  }

  if (err.name === 'ZodError') {
    message = err.issues[0].message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleError(res, err);
};
