import { Request, Response, NextFunction } from 'express';
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode).json(err);
};
export default errorHandler;
