import { StatusCodes } from 'http-status-codes';
import { deleteGig } from '@gig/services/gig.service';
import { Request, Response } from 'express';

const gigDelete = async (req: Request, res: Response): Promise<void> => {
  await deleteGig(req.params.gigId, req.params.sellerId);
  res.status(StatusCodes.OK).json({ message: 'Gig deleted successfully' });
};

export { gigDelete };
