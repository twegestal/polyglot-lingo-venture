import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

type ErrorResponse = {
  message: string;
  status?: number;
  stack?: string;
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(`[${err.status || 500}] ${err.message}`);

  const response: ErrorResponse = {
    message: err.message || 'Internal server Error',
  };

  res.status(err.status || 500);

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.json(response);
};
