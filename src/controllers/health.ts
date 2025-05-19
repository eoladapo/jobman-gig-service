import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

const health = async (_req: Request, res: Response): Promise<void> => {
  res.status(StatusCodes.OK).json({ message: 'Gig service is healthy and OK' });
};

export { health };
